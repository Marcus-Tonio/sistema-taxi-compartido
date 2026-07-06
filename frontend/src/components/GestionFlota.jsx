import React, { useState } from 'react';

const flota = [
  { id: 1, conductor: 'Manuel Pauta', placa: 'GBT-0234', modelo: 'Chevrolet Aveo · Blanco', capacidad: 4, estado: 'DISPONIBLE', viajesToday: 6 },
  { id: 2, conductor: 'Roberto Vélez', placa: 'GCA-1127', modelo: 'Toyota Yaris · Gris', capacidad: 4, estado: 'EN_VIAJE', viajesToday: 9 },
  { id: 3, conductor: 'Pedro Salinas', placa: 'HBC-5530', modelo: 'Hyundai Accent · Negro', capacidad: 4, estado: 'DISPONIBLE', viajesToday: 3 },
  { id: 4, conductor: 'Jorge Mina', placa: 'GBP-8821', modelo: 'KIA Picanto · Blanco', capacidad: 3, estado: 'NO_DISPONIBLE', viajesToday: 0 },
];

const estadoConfig = {
  DISPONIBLE: { bg: '#D1FAE5', text: '#065F46', label: 'Disponible' },
  EN_VIAJE: { bg: '#DBEAFE', text: '#1E40AF', label: 'En viaje' },
  NO_DISPONIBLE: { bg: '#F3F4F6', text: '#6C757D', label: 'No disponible' },
};

export default function GestionFlota() {
  const [vehiculos, setVehiculos] = useState(flota);

  const cambiarEstado = (id, estado) => setVehiculos(prev => prev.map(v => v.id === id ? { ...v, estado } : v));

  return (
    <div className="card" style={{ maxWidth: '680px' }}>
      <h2 className="card-title">Administración de Flota (RF-16)</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total', value: vehiculos.length, color: '#1F2937' },
          { label: 'Disponibles', value: vehiculos.filter(v => v.estado === 'DISPONIBLE').length, color: '#059669' },
          { label: 'En viaje', value: vehiculos.filter(v => v.estado === 'EN_VIAJE').length, color: '#2563EB' },
          { label: 'Inactivos', value: vehiculos.filter(v => v.estado === 'NO_DISPONIBLE').length, color: '#9CA3AF' },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, textAlign: 'center', padding: '0.65rem', background: '#F9FAFB', borderRadius: '8px', borderBottom: `3px solid ${s.color}` }}>
            <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: s.color }}>{s.value}</p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#6C757D' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {vehiculos.map(v => (
          <div key={v.id} style={{ padding: '0.9rem 1rem', border: '1px solid #E5E7EB', borderRadius: '10px', background: '#FAFAFA' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 700 }}>🚕 {v.placa}</p>
                <p style={{ margin: '0.1rem 0', fontSize: '0.82rem', color: '#6C757D' }}>{v.modelo} · {v.capacidad} asientos</p>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#9CA3AF' }}>👤 {v.conductor} · {v.viajesToday} viajes hoy</p>
              </div>
              <span style={{ background: estadoConfig[v.estado].bg, color: estadoConfig[v.estado].text, padding: '4px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 600 }}>
                {estadoConfig[v.estado].label}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {Object.keys(estadoConfig).filter(e => e !== v.estado).map(e => (
                <button key={e} onClick={() => cambiarEstado(v.id, e)} style={{ border: `1px solid ${estadoConfig[e].text}`, borderRadius: '6px', padding: '3px 10px', cursor: 'pointer', fontSize: '0.78rem', background: estadoConfig[e].bg, color: estadoConfig[e].text, fontWeight: 500 }}>
                  → {estadoConfig[e].label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
