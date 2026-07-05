from fastapi import FastAPI

app = FastAPI(title="Sistema de Gestión de Taxi Compartido")

@app.get("/")
def read_root():
    return {"message": "API Backend is running"}
