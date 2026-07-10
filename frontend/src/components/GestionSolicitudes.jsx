import React, { useState } from 'react';
import { FaUserCircle, FaMapMarkerAlt, FaCheck, FaTimes, FaRoute, FaClock, FaUsers } from 'react-icons/fa';

const solicitudesMock = [
  {
    id: 1,
    pasajero: 'María López',
    avatar: 'https://i.pravatar.cc/150?img=5',
    origen: 'Universidad de Guayaquil',
    destino: 'Malecón 2000',
    asientos: 1,
    desvio: '2.3 km',
    tiempoExtra: '5 min',
    precio: '$2.10',
    segundosRestantes: 45,
  },
  {
    id: 2,
    pasajero: 'Carlos Ruiz',
    avatar: 'https://i.pravatar.cc/150?img=12',
    origen: 'Av. 9 de Octubre',
    destino: 'Plaza Lagos',
    asientos: 2,
    desvio: '1.1 km',
    tiempoExtra: '3 min',
    precio: '$3.50',
    segundosRestantes: 28,
  },
];

export default function GestionSolicitudes() {
  const [solicitudes, setSolicitudes] = useState(solicitudesMock);
  const [aceptadas, setAceptadas] = useState([]);

  const aceptar = async (id) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { id_usuario: 2 };
      
      // Simulamos los IDs que vendrían de la DB para la solicitud real
      const payload = {
        id_reserva: 100 + id,
        id_viaje: 500 + id,
        id_conductor: currentUser.id_usuario || 2
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/viajes/aceptar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const sol = solicitudes.find(s => s.id === id);
        setAceptadas(prev => [sol, ...prev]);
        setSolicitudes(prev => prev.filter(s => s.id !== id));
        alert("¡Transacción Exitosa! Viaje aceptado en la base de datos.");
      } else {
        const err = await response.json();
        alert(`Error: ${err.detail}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al aceptar viaje.");
    }
  };

  const rechazar = (id) => {
    setSolicitudes(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ color: 'white', marginBottom: '0.3rem' }}>Gestión de Solicitudes</h2>
      <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        RF-8 · Revisa y responde a las solicitudes entrantes antes de que expiren.
      </p>

      {/* Solicitudes Pendientes */}
      <h3 style={{ color: 'var(--yellow-400)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
        Pendientes ({solicitudes.length})
      </h3>

      {solicitudes.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-500)', background: 'var(--gray-900)', borderRadius: '16px', border: '1px dashed var(--border)', marginBottom: '2rem' }}>
          <FaUsers style={{ fontSize: '2.5rem', marginBottom: '1rem', opacity: 0.4 }} />
          <p>No hay solicitudes pendientes</p>
        </div>
      )}

      {solicitudes.map(sol => (
        <div key={sol.id} style={{ background: 'var(--gray-900)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <img src={sol.avatar} alt={sol.pasajero} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.05rem' }}>{sol.pasajero}</div>
              <div style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>Solicita {sol.asientos} asiento(s)</div>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '0.4rem 0.8rem', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FaClock /> {sol.segundosRestantes}s
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--gray-300)', fontSize: '0.9rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', flexShrink: 0 }}></div>
              {sol.origen}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--gray-300)', fontSize: '0.9rem' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--yellow-400)', flexShrink: 0 }}></div>
              {sol.destino}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: 'var(--gray-400)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Desvío</div>
              <div style={{ color: 'white', fontWeight: 'bold' }}>{sol.desvio}</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: 'var(--gray-400)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Tiempo extra</div>
              <div style={{ color: 'white', fontWeight: 'bold' }}>{sol.tiempoExtra}</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: 'var(--gray-400)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Ganancia</div>
              <div style={{ color: 'var(--yellow-400)', fontWeight: 'bold' }}>{sol.precio}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => rechazar(sol.id)}
              style={{ flex: 1, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '0.85rem', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
            >
              <FaTimes /> Rechazar
            </button>
            <button
              onClick={() => aceptar(sol.id)}
              style={{ flex: 2, background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', color: '#000', padding: '0.85rem', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
            >
              <FaCheck /> Aceptar Solicitud
            </button>
          </div>
        </div>
      ))}

      {/* Solicitudes Aceptadas */}
      {aceptadas.length > 0 && (
        <>
          <h3 style={{ color: '#10b981', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', marginTop: '2rem' }}>
            Aceptadas ({aceptadas.length})
          </h3>
          {aceptadas.map(sol => (
            <div key={sol.id} style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', padding: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src={sol.avatar} alt={sol.pasajero} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              <div style={{ flex: 1 }}>
                <div style={{ color: 'white', fontWeight: 'bold' }}>{sol.pasajero}</div>
                <div style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>{sol.origen} → {sol.destino}</div>
              </div>
              <FaCheck style={{ color: '#10b981' }} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
