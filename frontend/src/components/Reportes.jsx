import React, { useState } from 'react';

export default function Reportes() {
  const [rango, setRango] = useState('hoy');

  const datos = {
    hoy: { viajes: 47, ingresos: '$112.30', pasajeros: 63, cancelados: 3 },
    semana: { viajes: 312, ingresos: '$784.50', pasajeros: 421, cancelados: 18 },
    mes: { viajes: 1340, ingresos: '$3,210.75', pasajeros: 1803, cancelados: 74 },
  };

  const actual = datos[rango];

  const topConductores = [
    { nombre: 'Manuel Pauta', viajes: 18, calificacion: 4.9 },
    { nombre: 'Roberto Vélez', viajes: 14, calificacion: 4.7 },
    { nombre: 'Pedro Salinas', viajes: 9, calificacion: 4.5 },
  ];

  const consultasRapidas = [
    { label: 'Pasajeros registrados este mes', valor: '84', icono: '👤' },
    { label: 'Conductores activos ahora', valor: '12', icono: '🚕' },
    { label: 'Cupones canjeados hoy', valor: '7', icono: '🎁' },
    { label: 'Tiempo promedio de viaje', valor: '18 min', icono: '⏱' },
    { label: 'Ingresos pendientes de cobro', valor: '$23.50', icono: '💳' },
  ];

  return (
    <div className="card" style={{ maxWidth: '660px' }}>
      <h2 className="card-title">Reportes y Consultas (RF-19)</h2>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {[['hoy', 'Hoy'], ['semana', 'Esta semana'], ['mes', 'Este mes']].map(([k, l]) => (
          <button key={k} onClick={() => setRango(k)} style={{
            flex: 1, padding: '0.5rem', borderRadius: '8px', border: '1px solid',
            borderColor: rango === k ? '#FFD500' : '#E5E7EB',
            background: rango === k ? '#FEF3C7' : '#F9FAFB',
            fontWeight: rango === k ? 700 : 400, cursor: 'pointer', fontSize: '0.85rem',
          }}>
            {l}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Viajes completados', value: actual.viajes, color: '#2563EB', icon: '🛣' },
          { label: 'Ingresos totales', value: actual.ingresos, color: '#059669', icon: '💵' },
          { label: 'Pasajeros atendidos', value: actual.pasajeros, color: '#7C3AED', icon: '👥' },
          { label: 'Viajes cancelados', value: actual.cancelados, color: '#DC2626', icon: '❌' },
        ].map(s => (
          <div key={s.label} style={{ padding: '1rem', background: '#F9FAFB', borderRadius: '10px', borderLeft: `4px solid ${s.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#6C757D' }}>{s.label}</span>
              <span style={{ fontSize: '1.1rem' }}>{s.icon}</span>
            </div>
            <p style={{ margin: '0.25rem 0 0', fontSize: '1.5rem', fontWeight: 700, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.9rem', color: '#6C757D', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Top Conductores</h3>
        {topConductores.map((c, i) => (
          <div key={c.nombre} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid #F3F4F6' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: ['#FFD500', '#C0C0C0', '#CD7F32'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.78rem' }}>{i + 1}</span>
            <span style={{ flex: 1, fontWeight: 500 }}>{c.nombre}</span>
            <span style={{ fontSize: '0.82rem', color: '#6C757D' }}>{c.viajes} viajes</span>
            <span style={{ fontWeight: 700, color: '#D97706' }}>★ {c.calificacion}</span>
          </div>
        ))}
      </div>

      <div>
        <h3 style={{ fontSize: '0.9rem', color: '#6C757D', textTransform: 'uppercase', marginBottom: '0.75rem' }}>5 Consultas del sistema</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {consultasRapidas.map(q => (
            <div key={q.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.85rem', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
              <span style={{ fontSize: '0.85rem', color: '#374151' }}>{q.icono} {q.label}</span>
              <span style={{ fontWeight: 700, color: '#1F2937', background: '#FFD500', padding: '2px 10px', borderRadius: '10px', fontSize: '0.85rem' }}>{q.valor}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
