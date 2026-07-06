import os
import psycopg2
from dotenv import load_dotenv

# Cargar variables del archivo .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def get_connection():
    """
    Establece y devuelve una conexión a la base de datos PostgreSQL en Supabase.
    """
    try:
        connection = psycopg2.connect(DATABASE_URL)
        return connection
    except Exception as e:
        print(f"Error conectando a Supabase (PostgreSQL): {e}")
        return None

