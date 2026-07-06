from fastapi import APIRouter, HTTPException
from typing import List
import psycopg2
from database import get_connection
from models import UsuarioCreate, VehiculoCreate, CuponCreate

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
        cursor.execute("SELECT id_usuario, nombre, apellido, correo, telefono, estado_usuario, fecha_registro FROM USUARIO")
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
                "fecha_registro": row[6]
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
            INSERT INTO USUARIO (nombre, apellido, correo, telefono, contrasena, estado_usuario)
            VALUES (%s, %s, %s, %s, %s, 'ACTIVO') RETURNING id_usuario
        """
        cursor.execute(sql, (usuario.nombres, usuario.apellidos, usuario.correo, usuario.telefono, usuario.contrasena))
        nuevo_id = cursor.fetchone()[0]
        conn.commit()
        return {"message": "Usuario creado exitosamente", "id_usuario": nuevo_id}
    except psycopg2.Error as e:
        conn.rollback()
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
