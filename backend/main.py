from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import get_connection

app = FastAPI(title="Taxi Compartido API", version="1.0.0")

# Configuración de CORS para permitir peticiones desde el frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción se debería especificar el dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API de Taxi Compartido funcionando correctamente"}

@app.get("/db-status")
def test_db_connection():
    """Prueba la conexión a la base de datos Oracle"""
    conn = get_connection()
    if conn:
        version = conn.version
        conn.close()
        return {"status": "success", "message": f"Conectado a Oracle Database versión {version}"}
    return {"status": "error", "message": "No se pudo conectar a la base de datos. Verifica las credenciales en .env"}

from routers import cruds, transacciones, consultas

app.include_router(cruds.router)
app.include_router(transacciones.router)
app.include_router(consultas.router)


