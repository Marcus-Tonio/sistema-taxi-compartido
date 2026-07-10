# 🚕 Sistema de Taxi Compartido

Este es el proyecto final para el sistema de Taxi Compartido. El proyecto está dividido en dos partes principales: un **Backend en Python (FastAPI)** que se conecta a una base de datos PostgreSQL en la nube (Supabase), y un **Frontend en React (Vite)**.

## 🛠️ Tecnologías Utilizadas
- **Base de Datos:** PostgreSQL (alojado en Supabase)
- **Backend:** Python 3, FastAPI, Psycopg2, Uvicorn
- **Frontend:** React 19, Vite, Leaflet (Mapas)

---

## 🚀 Cómo ejecutar el proyecto localmente (Guía para el Profesor)

Dado que el proyecto utiliza una base de datos real en la nube, solo necesita clonar el repositorio y levantar los servidores locales. La base de datos ya está en línea y funcional.

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/Marcus-Tonio/sistema-taxi-compartido.git
cd sistema-taxi-compartido
```

### 2️⃣ Iniciar el Backend (Python / FastAPI)
Abra una terminal en la carpeta principal del proyecto y ejecute los siguientes comandos:

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # En Mac/Linux use: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
*El backend estará corriendo en `http://localhost:8000`*

### 3️⃣ Iniciar el Frontend (React)
Abra **otra** terminal nueva, regrese a la carpeta principal del proyecto y ejecute:

```bash
cd frontend
npm install
npm run dev
```
*El frontend estará corriendo en `http://localhost:5173`*

---

## 💻 Uso de la Aplicación
1. Abra su navegador en [http://localhost:5173](http://localhost:5173).
2. Podrá interactuar con los roles de **Pasajero** (solicitar viajes con geolocalización, ver disponibilidad, calificar conductores) y **Administrador** (gestión de flota y usuarios).
3. Todas las acciones de crear, actualizar y eliminar se reflejan en tiempo real en la base de datos PostgreSQL.
