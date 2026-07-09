from fastapi import APIRouter, HTTPException
from typing import List
import psycopg2
from database import get_connection
from models import (
    UsuarioCreate, UsuarioLogin, UsuarioUpdate, 
    VehiculoCreate, VehiculoUpdate, 
    CuponCreate, CuponUpdate, 
    SolicitarViajeRequest, AceptarViajeRequest
)

router = APIRouter()

# ==========================================
# CRUD: USUARIOS
# ==========================================

@router.get("/usuarios/", tags=["Usuarios"])
def obtener_usuarios():
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id_usuario, nombre, apellido, correo, telefono, estado_usuario, fecha_registro, rol FROM USUARIO")
        rows = cursor.fetchall()
        
        usuarios = []
        for row in rows:
            usuarios.append({
                "id_usuario": row[0],
                "nombres": row[1],
                "apellidos": row[2],
                "correo": row[3],
                "telefono": row[4],
                "estado_cuenta": row[5],
                "fecha_registro": row[6],
                "rol": row[7] if len(row) > 7 else "CLIENTE"
            })
        return usuarios
    except psycopg2.Error as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

@router.post("/usuarios/", tags=["Usuarios"])
def crear_usuario(usuario: UsuarioCreate):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor()
        sql = """
            INSERT INTO USUARIO (nombre, apellido, correo, telefono, contrasena, estado_usuario, rol)
            VALUES (%s, %s, %s, %s, %s, 'ACTIVO', %s) RETURNING id_usuario
        """
        cursor.execute(sql, (usuario.nombres, usuario.apellidos, usuario.correo, usuario.telefono, usuario.contrasena, usuario.rol))
        nuevo_id = cursor.fetchone()[0]
        conn.commit()
        return {"message": "Usuario creado exitosamente", "id_usuario": nuevo_id}
    except psycopg2.Error as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

@router.put("/usuarios/{id_usuario}", tags=["Usuarios"])
def actualizar_usuario(id_usuario: int, usuario: UsuarioUpdate):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    update_data = usuario.dict(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    
    try:
        cursor = conn.cursor()
        
        # Mapeo de campos pydantic a columnas de DB
        col_map = {"nombres": "nombre", "apellidos": "apellido", "correo": "correo", "telefono": "telefono", "estado_usuario": "estado_usuario", "rol": "rol"}
        
        set_clauses = []
        values = []
        for key, value in update_data.items():
            if key in col_map:
                set_clauses.append(f"{col_map[key]} = %s")
                values.append(value)
                
        if not set_clauses:
            raise HTTPException(status_code=400, detail="Campos no válidos")
            
        values.append(id_usuario)
        
        sql = f"UPDATE USUARIO SET {', '.join(set_clauses)} WHERE id_usuario = %s"
        cursor.execute(sql, values)
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
            
        conn.commit()
        return {"message": "Usuario actualizado exitosamente"}
    except psycopg2.Error as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

@router.delete("/usuarios/{id_usuario}", tags=["Usuarios"])
def eliminar_usuario(id_usuario: int):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión")
    
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM USUARIO WHERE id_usuario = %s", (id_usuario,))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        conn.commit()
        return {"message": "Usuario eliminado exitosamente"}
    except psycopg2.Error as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()


@router.post("/login/", tags=["Usuarios"])
def login_usuario(usuario: UsuarioLogin):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión")
    
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id_usuario, nombre, apellido, rol FROM USUARIO WHERE correo = %s AND contrasena = %s AND estado_usuario = 'ACTIVO'",
            (usuario.correo, usuario.contrasena)
        )
        user = cursor.fetchone()
        
        if not user:
            raise HTTPException(status_code=401, detail="Credenciales incorrectas o cuenta inactiva")
            
        return {
            "message": "Login exitoso",
            "usuario": {
                "id_usuario": user[0],
                "nombres": user[1],
                "apellidos": user[2],
                "rol": user[3]
            }
        }
    except psycopg2.Error as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

# ==========================================
# CRUD: VEHICULOS
# ==========================================

@router.get("/vehiculos/", tags=["Vehículos"])
def obtener_vehiculos():
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id_vehiculo, placa, marca, modelo, color, capacidad, estado_vehiculo, id_conductor FROM VEHICULO")
        rows = cursor.fetchall()
        
        vehiculos = []
        for row in rows:
            vehiculos.append({
                "id_vehiculo": row[0],
                "placa": row[1],
                "marca": row[2],
                "modelo": row[3],
                "color": row[4],
                "capacidad_pasajeros": row[5],
                "estado_vehiculo": row[6],
                "id_conductor": row[7]
            })
        return vehiculos
    except psycopg2.Error as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

@router.post("/vehiculos/", tags=["Vehículos"])
def crear_vehiculo(vehiculo: VehiculoCreate):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor()
        sql = """
            INSERT INTO VEHICULO (placa, marca, modelo, color, capacidad, estado_vehiculo, id_conductor)
            VALUES (%s, %s, %s, %s, %s, 'DISPONIBLE', %s) RETURNING id_vehiculo
        """
        cursor.execute(sql, (vehiculo.placa, vehiculo.marca, vehiculo.modelo, vehiculo.color, vehiculo.capacidad_pasajeros, vehiculo.id_conductor))
        nuevo_id = cursor.fetchone()[0]
        conn.commit()
        return {"message": "Vehículo registrado exitosamente", "id_vehiculo": nuevo_id}
    except psycopg2.Error as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

@router.put("/vehiculos/{id_vehiculo}", tags=["Vehículos"])
def actualizar_vehiculo(id_vehiculo: int, vehiculo: VehiculoUpdate):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    update_data = vehiculo.dict(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    
    try:
        cursor = conn.cursor()
        
        # Mapeo de campos pydantic a columnas de DB (capacidad_pasajeros -> capacidad)
        col_map = {"placa": "placa", "marca": "marca", "modelo": "modelo", "color": "color", "capacidad_pasajeros": "capacidad", "estado_vehiculo": "estado_vehiculo", "id_conductor": "id_conductor"}
        
        set_clauses = []
        values = []
        for key, value in update_data.items():
            if key in col_map:
                set_clauses.append(f"{col_map[key]} = %s")
                values.append(value)
                
        if not set_clauses:
            raise HTTPException(status_code=400, detail="Campos no válidos")
            
        values.append(id_vehiculo)
        
        sql = f"UPDATE VEHICULO SET {', '.join(set_clauses)} WHERE id_vehiculo = %s"
        cursor.execute(sql, values)
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Vehículo no encontrado")
            
        conn.commit()
        return {"message": "Vehículo actualizado exitosamente"}
    except psycopg2.Error as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

@router.delete("/vehiculos/{id_vehiculo}", tags=["Vehículos"])
def eliminar_vehiculo(id_vehiculo: int):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión")
    
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM VEHICULO WHERE id_vehiculo = %s", (id_vehiculo,))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Vehículo no encontrado")
        conn.commit()
        return {"message": "Vehículo eliminado exitosamente"}
    except psycopg2.Error as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()


# ==========================================
# CRUD: CUPONES
# ==========================================

@router.get("/cupones/", tags=["Cupones"])
def obtener_cupones():
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id_cupon, codigo_cupon, porcentaje_descuento, fecha_inicio, fecha_fin, estado_cupon FROM CUPON_DESCUENTO")
        rows = cursor.fetchall()
        
        cupones = []
        for row in rows:
            cupones.append({
                "id_cupon": row[0],
                "codigo_cupon": row[1],
                "porcentaje_descuento": row[2],
                "fecha_inicio": row[3],
                "fecha_fin": row[4],
                "estado_cupon": row[5]
            })
        return cupones
    except psycopg2.Error as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

@router.post("/cupones/", tags=["Cupones"])
def crear_cupon(cupon: CuponCreate):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor()
        sql = """
            INSERT INTO CUPON_DESCUENTO (codigo_cupon, porcentaje_descuento, fecha_inicio, fecha_fin, estado_cupon)
            VALUES (%s, %s, %s, %s, 'ACTIVO') RETURNING id_cupon
        """
        cursor.execute(sql, (cupon.codigo_cupon, cupon.porcentaje_descuento, cupon.fecha_inicio, cupon.fecha_fin))
        nuevo_id = cursor.fetchone()[0]
        conn.commit()
        return {"message": "Cupón creado exitosamente", "id_cupon": nuevo_id}
    except psycopg2.Error as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

@router.put("/cupones/{id_cupon}", tags=["Cupones"])
def actualizar_cupon(id_cupon: int, cupon: CuponUpdate):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    update_data = cupon.dict(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    
    try:
        cursor = conn.cursor()
        set_clauses = []
        values = []
        for key, value in update_data.items():
            set_clauses.append(f"{key} = %s")
            values.append(value)
                
        if not set_clauses:
            raise HTTPException(status_code=400, detail="Campos no válidos")
            
        values.append(id_cupon)
        
        sql = f"UPDATE CUPON_DESCUENTO SET {', '.join(set_clauses)} WHERE id_cupon = %s"
        cursor.execute(sql, values)
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Cupón no encontrado")
            
        conn.commit()
        return {"message": "Cupón actualizado exitosamente"}
    except psycopg2.Error as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

@router.delete("/cupones/{id_cupon}", tags=["Cupones"])
def eliminar_cupon(id_cupon: int):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión")
    
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM CUPON_DESCUENTO WHERE id_cupon = %s", (id_cupon,))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Cupón no encontrado")
        conn.commit()
        return {"message": "Cupón eliminado exitosamente"}
    except psycopg2.Error as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

# ==========================================
# PROCESOS TRANSACCIONALES
# ==========================================

@router.post("/viajes/solicitar", tags=["Transaccionales"])
def solicitar_viaje(req: SolicitarViajeRequest):
    """
    Transacción 1: Insertar un VIAJE y una RESERVA asociada en un solo proceso.
    Refleja el RF-3: Solicitud de Viaje.
    """
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor()
        
        # 1. Insertar el Viaje sin conductor (estado PROGRAMADO)
        # Nota: El esquema exige id_conductor NOT NULL. Para que sea un viaje "pendiente de conductor" 
        # en un escenario real tendríamos un conductor temporal o el campo permitiría NULL.
        # Simularemos esto asignando a un id_conductor 1 por defecto y estado PROGRAMADO.
        sql_viaje = """
            INSERT INTO VIAJE (estado_viaje, fecha_viaje, origen, destino, id_conductor)
            VALUES ('PROGRAMADO', %s, %s, %s, 1) RETURNING id_viaje
        """
        cursor.execute(sql_viaje, (req.fecha_viaje, req.origen, req.destino))
        nuevo_id_viaje = cursor.fetchone()[0]

        # 2. Insertar la Reserva asociada
        sql_reserva = """
            INSERT INTO RESERVA (cantidad_asientos, estado_reserva, id_usuario, id_viaje)
            VALUES (%s, 'ACTIVA', %s, %s) RETURNING id_reserva
        """
        cursor.execute(sql_reserva, (req.cantidad_asientos, req.id_usuario, nuevo_id_viaje))
        nuevo_id_reserva = cursor.fetchone()[0]

        # Confirmar la transacción
        conn.commit()
        return {
            "message": "Viaje y reserva solicitados exitosamente (Transacción 1 completada)",
            "id_viaje": nuevo_id_viaje,
            "id_reserva": nuevo_id_reserva
        }
    except psycopg2.Error as e:
        conn.rollback() # Revertir si algo falla
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

@router.post("/viajes/aceptar", tags=["Transaccionales"])
def aceptar_viaje(req: AceptarViajeRequest):
    """
    Transacción 2: Actualizar el estado del VIAJE y la RESERVA, asignando al conductor real.
    Refleja el RF-8: Gestión de Solicitudes (Aceptar Viaje).
    """
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión")
    
    try:
        cursor = conn.cursor()
        
        # 1. Actualizar el Viaje: ponerlo en curso y asignarle el conductor correcto
        sql_viaje = """
            UPDATE VIAJE 
            SET estado_viaje = 'EN_CURSO', id_conductor = %s 
            WHERE id_viaje = %s
        """
        cursor.execute(sql_viaje, (req.id_conductor, req.id_viaje))
        
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Viaje no encontrado")

        # 2. Actualizar la Reserva: ponerla COMPLETADA (porque ya fue aceptada/tomada)
        sql_reserva = """
            UPDATE RESERVA 
            SET estado_reserva = 'COMPLETADA' 
            WHERE id_reserva = %s
        """
        cursor.execute(sql_reserva, (req.id_reserva,))

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")

        # Confirmar la transacción
        conn.commit()
        return {"message": "Viaje aceptado exitosamente por el conductor (Transacción 2 completada)"}
    except psycopg2.Error as e:
        conn.rollback() # Revertir si falla
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()
