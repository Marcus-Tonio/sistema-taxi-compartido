import React, { useState, useEffect } from 'react';
import { FaTrash, FaCar } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const estadoConfig = {
  DISPONIBLE: { bg: 'rgba(16,185,129,0.15)', text: '#10b981', label: 'Disponible' },
  EN_VIAJE: { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6', label: 'En viaje' },
  NO_DISPONIBLE: { bg: 'rgba(156,163,175,0.15)', text: '#9ca3af', label: 'Inactivo' },
};

export default function GestionFlota() {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarVehiculos = async () => {
    try {
      const res = await fetch(`${API_URL}/vehiculos/`);
      if (res.ok) {
        const data = await res.json();
        setVehiculos(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const cambiarEstado = async (id, estado) => {
    try {
      const res = await fetch(`${API_URL}/vehiculos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado_vehiculo: estado })
      });
      if (res.ok) {
        cargarVehiculos();
      }
    } catch (e) { console.error(e); }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este vehículo permanentemente?")) return;
    try {
      const res = await fetch(`${API_URL}/vehiculos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        cargarVehiculos();
      }
    } catch (e) { console.error(e); }
  };

  const crearVehiculoPrueba = async () => {
    const mock = {
      placa: `G${Math.random().toString(36).substring(2, 4).toUpperCase()}-${Math.floor(Math.random() * 9000) + 1000}`,
      marca: 'Chevrolet',
      modelo: 'Aveo',
      color: 'Blanco',
      capacidad_pasajeros: 4,
      id_conductor: 2 // Usaremos el id 2 por defecto para la prueba
    };
    try {
      const res = await fetch(`${API_URL}/vehiculos/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mock)
      });
      if (res.ok) cargarVehiculos();
    } catch (e) { console.error(e); }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
        <h2 style={{ color: 'white', margin: 0 }}>Administración de Flota (CRUD)</h2>
        <button onClick={crearVehiculoPrueba} style={{ background: 'var(--yellow-400)', color: 'black', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          + Vehículo de Prueba
        </button>
      </div>
      <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Actualiza estados o elimina vehículos de la DB en tiempo real.
      </p>

      {cargando ? (
        <p style={{ color: 'white' }}>Cargando flota desde el servidor...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {vehiculos.map(v => (
            <div key={v.id_vehiculo} style={{ padding: '1.25rem', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--gray-900)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                    <FaCar style={{ fontSize: '1.5rem', color: 'var(--yellow-400)' }} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 'bold', color: 'white', fontSize: '1.1rem' }}>{v.placa}</p>
                    <p style={{ margin: '0.2rem 0', fontSize: '0.85rem', color: 'var(--gray-400)' }}>{v.marca} {v.modelo} · {v.color}</p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--yellow-400)' }}>Capacidad: {v.capacidad_pasajeros} pax</p>
                  </div>
                </div>
                
                {v.estado_vehiculo && estadoConfig[v.estado_vehiculo] && (
                  <span style={{ background: estadoConfig[v.estado_vehiculo].bg, color: estadoConfig[v.estado_vehiculo].text, padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {estadoConfig[v.estado_vehiculo].label}
                  </span>
                )}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {Object.keys(estadoConfig).filter(e => e !== v.estado_vehiculo).map(e => (
                    <button key={e} onClick={() => cambiarEstado(v.id_vehiculo, e)} style={{ border: `1px solid var(--border)`, borderRadius: '8px', padding: '0.4rem 0.8rem', cursor: 'pointer', fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', transition: 'all 0.2s' }}>
                      Cambiar a {estadoConfig[e].label}
                    </button>
                  ))}
                </div>
                <button onClick={() => eliminar(v.id_vehiculo)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  <FaTrash /> Eliminar
                </button>
              </div>
            </div>
          ))}
          {vehiculos.length === 0 && (
             <p style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '2rem 0' }}>No hay vehículos registrados.</p>
          )}
        </div>
      )}
    </div>
  );
}
