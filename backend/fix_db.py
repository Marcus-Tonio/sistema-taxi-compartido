import psycopg2
from database import get_connection

def fix_conductores_and_vehiculos():
    conn = get_connection()
    if not conn:
        print("Error connecting to DB")
        return
    
    try:
        cursor = conn.cursor()
        
        # Mapping of id_usuario -> id_conductor
        cond_map = {}
        
        usuarios_conductores = [4, 5, 7, 8]
        for u_id in usuarios_conductores:
            cursor.execute("SELECT id_conductor FROM conductor WHERE id_usuario = %s", (u_id,))
            res = cursor.fetchone()
            if res:
                cond_map[u_id] = res[0]
            else:
                print(f"Inserting conductor for user {u_id}")
                cursor.execute("""
                    INSERT INTO conductor (id_usuario, licencia, calificacion_promedio) 
                    VALUES (%s, %s, %s) RETURNING id_conductor
                """, (u_id, f"LIC-{u_id}000", 5.0))
                cond_map[u_id] = cursor.fetchone()[0]
        
        print("Driver map:", cond_map)
        
        # Insert vehicles
        # (id_usuario, color, modelo, placa, marca, cap, anio)
        vehiculos = [
            (4, 'Blanco', 'Corolla', 'GTC-1234', 'Toyota', 4, 2022),
            (5, 'Plateado', 'Sentra', 'GBY-5678', 'Nissan', 4, 2021),
            (7, 'Negro', 'Tucson', 'GBB-9012', 'Hyundai', 4, 2023),
            (8, 'Rojo', 'Rio', 'GZZ-3456', 'Kia', 4, 2020)
        ]
        
        for v in vehiculos:
            u_id, color, modelo, placa, marca, cap, anio = v
            c_id = cond_map[u_id]
            
            # Check if vehicle exists for conductor
            cursor.execute("SELECT 1 FROM vehiculo WHERE id_conductor = %s", (c_id,))
            if not cursor.fetchone():
                print(f"Inserting vehicle for conductor {c_id} (user {u_id})")
                cursor.execute("""
                    INSERT INTO vehiculo (placa, marca, modelo, color, capacidad, estado_vehiculo, id_conductor)
                    VALUES (%s, %s, %s, %s, %s, 'DISPONIBLE', %s)
                """, (placa, marca, modelo, color, cap, c_id))
                
        conn.commit()
        print("Successfully added conductors and vehicles")
    except Exception as e:
        conn.rollback()
        print(f"Error: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    fix_conductores_and_vehiculos()
