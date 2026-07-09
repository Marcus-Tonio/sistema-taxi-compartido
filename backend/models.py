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

class UsuarioUpdate(BaseModel):
    nombres: Optional[str] = None
    apellidos: Optional[str] = None
    correo: Optional[str] = None
    telefono: Optional[str] = None
    estado_usuario: Optional[str] = None
    rol: Optional[str] = None

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

class VehiculoUpdate(BaseModel):
    placa: Optional[str] = None
    marca: Optional[str] = None
    modelo: Optional[str] = None
    color: Optional[str] = None
    capacidad_pasajeros: Optional[int] = None
    estado_vehiculo: Optional[str] = None
    id_conductor: Optional[int] = None

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

class CuponUpdate(BaseModel):
    codigo_cupon: Optional[str] = None
    porcentaje_descuento: Optional[float] = None
    fecha_inicio: Optional[date] = None
    fecha_fin: Optional[date] = None
    estado_cupon: Optional[str] = None

# ==========================================
# MODELOS TRANSACCIONALES
# ==========================================
class SolicitarViajeRequest(BaseModel):
    id_usuario: int
    origen: str
    destino: str
    cantidad_asientos: int
    fecha_viaje: str # ISO format

class AceptarViajeRequest(BaseModel):
    id_reserva: int
    id_viaje: int
    id_conductor: int
