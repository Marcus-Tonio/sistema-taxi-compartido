from pydantic import BaseModel
from typing import Optional
from datetime import date

# ==========================================
# MODELOS PARA USUARIO
# ==========================================
class UsuarioBase(BaseModel):
    nombres: str
    apellidos: str
    correo: str
    telefono: str
    contrasena: str
    idioma: Optional[str] = "ES"
    rol: Optional[str] = "CLIENTE"

class UsuarioCreate(UsuarioBase):
    pass

class UsuarioResponse(UsuarioBase):
    id_usuario: int
    fecha_registro: date
    estado_cuenta: str
    rol: str

class UsuarioLogin(BaseModel):
    correo: str
    contrasena: str

# ==========================================
# MODELOS PARA VEHICULO
# ==========================================
class VehiculoBase(BaseModel):
    placa: str
    marca: str
    modelo: str
    color: str
    anio: int
    capacidad_pasajeros: int
    id_conductor: int

class VehiculoCreate(VehiculoBase):
    pass

class VehiculoResponse(VehiculoBase):
    id_vehiculo: int
    estado_vehiculo: str

# ==========================================
# MODELOS PARA CUPON DESCUENTO
# ==========================================
class CuponBase(BaseModel):
    codigo_cupon: str
    porcentaje_descuento: float
    fecha_inicio: date
    fecha_fin: date

class CuponCreate(CuponBase):
    pass

class CuponResponse(CuponBase):
    id_cupon: int
    estado_cupon: str
