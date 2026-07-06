import React, { useState } from 'react';

export default function GestionSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([
    { id: 1, pasajero: 'Ana Torres', origen: 'Av. 9 de Octubre y Pichincha', destino: 'Urdesa Central', distancia: '3.8 km', costo: '$1.90', asientos: 2, estado: 'pendiente' },
    { id: 2, pasajero: 'Luis Mendoza', origen: 'Malecón y Av. Olmedo', destino: 'Centro Comercial Mall del Sol', distancia: '6.1 km', costo: '$3.05', asientos: 1, estado: 'pendiente' },
    { id: 3, pasajero: 'Carla Reyes', origen: 'Parque Centenario', destino: 'Alborada 9na Etapa', distancia: '4.5 km', costo: '$2.25', asientos: 1, estado: 'aceptada' },
  ]);

  const cambiarEstado = (id, nuevoEstado) => {
    setSolicitudes(prev => prev.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s));
  };

  const estadoColor = { pendiente: '#FEF3C7', aceptada: '#D1FAE5', rechazada: '#FEE2E2' };
  const estadoTexto = { pendiente: '#D97706', aceptada: '#065F46', rechazada: '#991B1B' };

  return (
    <div className="card" style={{ maxWidth: '600px' }}>
      <h2 className="card-title">Gestión de Solicitudes (RF-11)</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Pendientes', count: solicitudes.filter(s => s.estado === 'pendiente').length, color: '#D97706' },
          { label: 'Aceptadas', count: solicitudes.filter(s => s.estado === 'aceptada').length, color: '#059669' },
          { label: 'Rechazadas', count: solicitudes.filter(s => s.estado === 'rechazada').length, color: '#EF4444' },
        ].map(stat => (
          <div key={stat.label} style={{ flex: 1, textAlign: 'center', padding: '0.75rem', background: '#F9FAFB', borderRadius: '8px', borderTop: `3px solid ${stat.color}` }}>
            <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: stat.color }}>{stat.count}</p>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#6C757D' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {solicitudes.map(s => (
          <div key={s.id} style={{ border: '1px solid #E5E7EB', borderRadius: '10px', padding: '1rem', background: '#FAFAFA' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 700 }}>👤 {s.pasajero}</p>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#6C757D' }}>📍 {s.origen} → {s.destino}</p>
              </div>
              <span style={{ background: estadoColor[s.estado], color: estadoTexto[s.estado], padding: '3px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 600, textTransform: 'capitalize' }}>
                {s.estado}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#6C757D', marginBottom: '0.75rem' }}>
              <span>🛣 {s.distancia}</span>
              <span>💵 {s.costo}</span>
              <span>🪑 {s.asientos} asiento{s.asientos > 1 ? 's' : ''}</span>
            </div>
            {s.estado === 'pendiente' && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem', color: '#EF4444' }}
                  onClick={() => cambiarEstado(s.id, 'rechazada')}
                >
                  ✕ Rechazar
                </button>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}
                  onClick={() => cambiarEstado(s.id, 'aceptada')}
                >
                  ✓ Aceptar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
