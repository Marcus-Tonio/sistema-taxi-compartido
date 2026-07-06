from fastapi import APIRouter, HTTPException
import psycopg2
from database import get_connection

router = APIRouter()

# ==========================================
# CONSULTA 1: Viajes programados de un conductor
# Muestra todos los viajes PROGRAMADOS de un conductor específico.
# Justificación: Permite al conductor ver su agenda del día.
# ==========================================

@router.get("/consultas/viajes-conductor/{id_conductor}", tags=["Consultas"])
def viajes_por_conductor(id_conductor: int):
    """
    Retorna todos los viajes PROGRAMADOS de un conductor específico,
    ordenados por fecha de viaje (más próximo primero).
    """
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT
                v.id_viaje,
                v.origen,
                v.destino,
                v.fecha_viaje,
                v.estado_viaje,
                COUNT(r.id_reserva) AS pasajeros_confirmados
            FROM VIAJE v
            LEFT JOIN RESERVA r ON r.id_viaje = v.id_viaje AND r.estado_reserva = 'ACTIVA'
            WHERE v.id_conductor = %s
              AND v.estado_viaje = 'PROGRAMADO'
            GROUP BY v.id_viaje, v.origen, v.destino, v.fecha_viaje, v.estado_viaje
            ORDER BY v.fecha_viaje ASC
            """,
            (id_conductor,)
        )
        rows = cursor.fetchall()
        return [
            {
                "id_viaje": r[0],
                "origen": r[1],
                "destino": r[2],
                "fecha_viaje": r[3],
                "estado_viaje": r[4],
                "pasajeros_confirmados": r[5]
            }
            for r in rows
        ]
    except psycopg2.Error as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()


# ==========================================
# CONSULTA 2: Historial de reservas de un usuario
# Muestra todos los viajes que ha tomado un pasajero.
# Justificación: Sección "Mis viajes" en la app del pasajero.
# ==========================================

@router.get("/consultas/historial-usuario/{id_usuario}", tags=["Consultas"])
def historial_reservas_usuario(id_usuario: int):
    """
    Retorna el historial completo de reservas de un pasajero,
    incluyendo los datos del viaje y si usó un cupón de descuento.
    """
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT
                res.id_reserva,
                res.fecha_reserva,
                res.cantidad_asientos,
                res.estado_reserva,
                v.origen,
                v.destino,
                v.fecha_viaje,
                c.codigo_cupon,
                c.porcentaje_descuento
            FROM RESERVA res
            JOIN VIAJE v ON v.id_viaje = res.id_viaje
            LEFT JOIN CUPON_DESCUENTO c ON c.id_cupon = res.id_cupon
            WHERE res.id_usuario = %s
            ORDER BY res.fecha_reserva DESC
            """,
            (id_usuario,)
        )
        rows = cursor.fetchall()
        return [
            {
                "id_reserva": r[0],
                "fecha_reserva": r[1],
                "cantidad_asientos": r[2],
                "estado_reserva": r[3],
                "origen": r[4],
                "destino": r[5],
                "fecha_viaje": r[6],
                "cupon_usado": r[7],
                "descuento_aplicado": f"{r[8]}%" if r[8] else "Sin descuento"
            }
            for r in rows
        ]
    except psycopg2.Error as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()


# ==========================================
# CONSULTA 3: Ranking de conductores mejor calificados
# Justificación: Muestra la calidad del servicio y ayuda a los pasajeros a elegir conductor.
# ==========================================

@router.get("/consultas/ranking-conductores", tags=["Consultas"])
def ranking_conductores():
    """
    Retorna el TOP de conductores ordenados por su calificación promedio (mayor a menor).
    Solo incluye conductores con al menos 1 calificación.
    """
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT
                c.id_conductor,
                u.nombre,
                u.apellido,
                u.telefono,
                ROUND(AVG(cal.puntuacion), 2) AS calificacion_promedio,
                COUNT(cal.id_calificacion)     AS total_calificaciones
            FROM CONDUCTOR c
            JOIN USUARIO u ON u.id_usuario = c.id_usuario
            JOIN CALIFICACION cal ON cal.CONDUCTOR_id_conductor = c.id_conductor
            GROUP BY c.id_conductor, u.nombre, u.apellido, u.telefono
            HAVING COUNT(cal.id_calificacion) >= 1
            ORDER BY calificacion_promedio DESC
            """
        )
        rows = cursor.fetchall()
        return [
            {
                "id_conductor": r[0],
                "nombre": r[1],
                "apellido": r[2],
                "telefono": r[3],
                "calificacion_promedio": float(r[4]),
                "total_calificaciones": r[5]
            }
            for r in rows
        ]
    except psycopg2.Error as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()


# ==========================================
# CONSULTA 4: Cupones vigentes en este momento
# Justificación: Permite al usuario ver qué descuentos puede aplicar.
# ==========================================

@router.get("/consultas/cupones-vigentes", tags=["Consultas"])
def cupones_vigentes():
    """
    Retorna todos los cupones de descuento que están activos
    y dentro de su rango de fechas válido.
    """
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT
                id_cupon,
                codigo_cupon,
                porcentaje_descuento,
                fecha_inicio,
                fecha_fin
            FROM CUPON_DESCUENTO
            WHERE estado_cupon = 'ACTIVO'
              AND fecha_inicio <= CURRENT_TIMESTAMP
              AND fecha_fin    >= CURRENT_TIMESTAMP
            ORDER BY porcentaje_descuento DESC
            """
        )
        rows = cursor.fetchall()
        return [
            {
                "id_cupon": r[0],
                "codigo_cupon": r[1],
                "descuento": f"{r[2]}%",
                "valido_desde": r[3],
                "valido_hasta": r[4]
            }
            for r in rows
        ]
    except psycopg2.Error as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()


# ==========================================
# CONSULTA 5: Reporte de ingresos estimados por viaje
# Justificación: Herramienta de administración para analizar la rentabilidad de cada viaje.
# ==========================================

@router.get("/consultas/reporte-ingresos", tags=["Consultas"])
def reporte_ingresos():
    """
    Calcula el ingreso estimado por viaje, basado en la tarifa base,
    la distancia de la ruta y el número de asientos reservados.
    Solo incluye viajes COMPLETADOS.
    """
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT
                v.id_viaje,
                v.origen,
                v.destino,
                v.fecha_viaje,
                u.nombre || ' ' || u.apellido    AS conductor,
                t.costo_base,
                t.costo_km,
                r.distancia,
                SUM(res.cantidad_asientos)        AS total_pasajeros,
                ROUND(
                    (t.costo_base + (t.costo_km * r.distancia)) * SUM(res.cantidad_asientos),
                    2
                )                                 AS ingreso_estimado_usd
            FROM VIAJE v
            JOIN CONDUCTOR co ON co.id_conductor = v.id_conductor
            JOIN USUARIO u    ON u.id_usuario    = co.id_usuario
            JOIN RUTA r       ON r.id_viaje      = v.id_viaje
            JOIN TARIFA t     ON t.id_tarifa     = r.id_tarifa
            LEFT JOIN RESERVA res ON res.id_viaje = v.id_viaje AND res.estado_reserva = 'COMPLETADA'
            WHERE v.estado_viaje = 'COMPLETADO'
            GROUP BY
                v.id_viaje, v.origen, v.destino, v.fecha_viaje,
                u.nombre, u.apellido,
                t.costo_base, t.costo_km, r.distancia
            ORDER BY ingreso_estimado_usd DESC
            """
        )
        rows = cursor.fetchall()
        return [
            {
                "id_viaje": r[0],
                "origen": r[1],
                "destino": r[2],
                "fecha_viaje": r[3],
                "conductor": r[4],
                "costo_base": float(r[5]) if r[5] else 0,
                "costo_por_km": float(r[6]) if r[6] else 0,
                "distancia_km": float(r[7]) if r[7] else 0,
                "total_pasajeros": r[8],
                "ingreso_estimado_usd": float(r[9]) if r[9] else 0
            }
            for r in rows
        ]
    except psycopg2.Error as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()
