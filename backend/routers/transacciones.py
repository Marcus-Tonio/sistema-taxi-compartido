from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import psycopg2
from database import get_connection

router = APIRouter()

# ==========================================
# MODELOS DE ENTRADA
# ==========================================

class CrearViajeRequest(BaseModel):
    origen: str
    destino: str
    fecha_viaje: datetime
    id_conductor: int
    costo_base: float
    costo_km: float
    costo_minuto: float

class ReservarViajeRequest(BaseModel):
    id_usuario: int
    id_viaje: int
    cantidad_asientos: int
    codigo_cupon: Optional[str] = None

# ==========================================
# TRANSACCIÓN 1: CREAR VIAJE + RUTA
# Crea el viaje y su tarifa/ruta en un solo bloque atómico.
# Si cualquier paso falla, se revierten TODOS los cambios.
# ==========================================

@router.post("/transacciones/crear-viaje", tags=["Transacciones"])
def crear_viaje_con_ruta(request: CrearViajeRequest):
    """
    TRANSACCIÓN 1: Registra un nuevo viaje junto con su tarifa y ruta asociada.
    Operación atómica: si falla cualquier INSERT, se hace rollback completo.
    """
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")

    try:
        cursor = conn.cursor()

        # Paso 1: Crear la TARIFA
        cursor.execute(
            """
            INSERT INTO TARIFA (costo_base, costo_km, costo_minuto, fecha_tarifa)
            VALUES (%s, %s, %s, CURRENT_TIMESTAMP) RETURNING id_tarifa
            """,
            (request.costo_base, request.costo_km, request.costo_minuto)
        )
        id_tarifa = cursor.fetchone()[0]

        # Paso 2: Crear el VIAJE
        cursor.execute(
            """
            INSERT INTO VIAJE (estado_viaje, fecha_viaje, origen, destino, id_conductor)
            VALUES ('PROGRAMADO', %s, %s, %s, %s) RETURNING id_viaje
            """,
            (request.fecha_viaje, request.origen, request.destino, request.id_conductor)
        )
        id_viaje = cursor.fetchone()[0]

        # Paso 3: Crear la RUTA vinculando el viaje y la tarifa
        cursor.execute(
            """
            INSERT INTO RUTA (distancia, duracion_estimada, estado_ruta, id_viaje, id_tarifa)
            VALUES (0, 0, 'ACTIVA', %s, %s) RETURNING id_ruta
            """,
            (id_viaje, id_tarifa)
        )
        id_ruta = cursor.fetchone()[0]

        # Si todo salió bien → confirmar la transacción
        conn.commit()

        return {
            "message": "Viaje creado exitosamente",
            "id_viaje": id_viaje,
            "id_tarifa": id_tarifa,
            "id_ruta": id_ruta
        }

    except psycopg2.Error as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=f"Error en la transacción. Rollback aplicado. Detalle: {str(e)}")
    finally:
        conn.close()


# ==========================================
# TRANSACCIÓN 2: RESERVAR VIAJE (con cupón opcional)
# Valida la disponibilidad, aplica descuento si hay cupón y registra la reserva.
# ==========================================

@router.post("/transacciones/reservar-viaje", tags=["Transacciones"])
def reservar_viaje(request: ReservarViajeRequest):
    """
    TRANSACCIÓN 2: Un pasajero reserva asientos en un viaje.
    - Valida que el viaje esté en estado PROGRAMADO.
    - Valida que haya capacidad disponible.
    - Aplica descuento si se proporciona un código de cupón válido.
    - Registra la reserva de forma atómica.
    """
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")

    try:
        cursor = conn.cursor()

        # Validación 1: ¿El viaje existe y está PROGRAMADO?
        cursor.execute(
            "SELECT id_viaje, estado_viaje, id_conductor FROM VIAJE WHERE id_viaje = %s",
            (request.id_viaje,)
        )
        viaje = cursor.fetchone()
        if not viaje:
            raise HTTPException(status_code=404, detail="El viaje no existe")
        if viaje[1] != "PROGRAMADO":
            raise HTTPException(status_code=400, detail=f"El viaje no está disponible. Estado actual: {viaje[1]}")

        # Validación 2: ¿Hay asientos disponibles? (capacidad del vehículo vs reservas activas)
        cursor.execute(
            """
            SELECT v.capacidad,
                   COALESCE(SUM(r.cantidad_asientos), 0) AS asientos_ocupados
            FROM VEHICULO v
            JOIN CONDUCTOR c ON c.id_conductor = v.id_conductor
            LEFT JOIN RESERVA r ON r.id_viaje = %s AND r.estado_reserva = 'ACTIVA'
            WHERE c.id_conductor = %s
            GROUP BY v.capacidad
            """,
            (request.id_viaje, viaje[2])
        )
        capacidad_row = cursor.fetchone()
        if capacidad_row:
            capacidad_total, asientos_ocupados = capacidad_row
            asientos_libres = capacidad_total - asientos_ocupados
            if request.cantidad_asientos > asientos_libres:
                raise HTTPException(
                    status_code=400,
                    detail=f"No hay suficientes asientos. Libres: {asientos_libres}, Solicitados: {request.cantidad_asientos}"
                )

        # Validación 3: ¿El cupón es válido? (opcional)
        id_cupon = None
        descuento = 0.0
        if request.codigo_cupon:
            cursor.execute(
                """
                SELECT id_cupon, porcentaje_descuento
                FROM CUPON_DESCUENTO
                WHERE codigo_cupon = %s
                  AND estado_cupon = 'ACTIVO'
                  AND fecha_inicio <= CURRENT_TIMESTAMP
                  AND fecha_fin >= CURRENT_TIMESTAMP
                """,
                (request.codigo_cupon,)
            )
            cupon = cursor.fetchone()
            if not cupon:
                raise HTTPException(status_code=400, detail=f"El cupón '{request.codigo_cupon}' no es válido o está vencido")
            id_cupon = cupon[0]
            descuento = cupon[1]

        # Registro: Crear la RESERVA
        cursor.execute(
            """
            INSERT INTO RESERVA (cantidad_asientos, estado_reserva, id_usuario, id_viaje, id_cupon)
            VALUES (%s, 'ACTIVA', %s, %s, %s) RETURNING id_reserva
            """,
            (request.cantidad_asientos, request.id_usuario, request.id_viaje, id_cupon)
        )
        id_reserva = cursor.fetchone()[0]

        conn.commit()

        return {
            "message": "Reserva creada exitosamente",
            "id_reserva": id_reserva,
            "descuento_aplicado": f"{descuento}%",
            "asientos_reservados": request.cantidad_asientos
        }

    except HTTPException:
        raise  # Re-lanzar errores HTTP que ya definimos (no hacer rollback de estos)
    except psycopg2.Error as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=f"Error en la transacción. Rollback aplicado. Detalle: {str(e)}")
    finally:
        conn.close()
