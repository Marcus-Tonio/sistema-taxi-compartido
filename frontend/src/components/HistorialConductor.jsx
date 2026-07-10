import React from 'react';

const historial = [
  { id: 'TXC-001', fecha: '06 Jul 2026 · 20:14', origen: 'Parque Centenario', destino: 'Urdesa Central', pasajeros: 2, ingreso: '$3.80', estado: 'Completado' },
  { id: 'TXC-002', fecha: '06 Jul 2026 · 18:02', origen: 'Av. 9 de Octubre', destino: 'Mall del Sol', pasajeros: 1, ingreso: '$3.05', estado: 'Completado' },
  { id: 'TXC-003', fecha: '05 Jul 2026 · 08:45', origen: 'Malecón y Olmedo', destino: 'Alborada 9na', pasajeros: 3, ingreso: '$6.75', estado: 'Completado' },
  { id: 'TXC-004', fecha: '05 Jul 2026 · 07:30', origen: 'Centro Histórico', destino: 'Puerto Santa Ana', pasajeros: 1, ingreso: '$0.00', estado: 'Cancelado' },
];

const totalIngresos = historial
  .filter(h => h.estado === 'Completado')
  .reduce((acc, h) => acc + parseFloat(h.ingreso.replace('$', '')), 0)
  .toFixed(2);

export default function HistorialConductor() {
  return (
    <div className="card" style={{ maxWidth: '620px' }}>
      <h2 className="card-title">Historial de Viajes</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Viajes totales', value: historial.length, color: '#1F2937' },
          { label: 'Completados', value: historial.filter(h => h.estado === 'Completado').length, color: '#059669' },
          { label: 'Ingresos totales', value: `$${totalIngresos}`, color: '#B45309' },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, textAlign: 'center', padding: '0.75rem', background: '#F9FAFB', borderRadius: '8px', borderBottom: `3px solid ${s.color}` }}>
            <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: s.color }}>{s.value}</p>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#6C757D' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {historial.map(h => (
          <div key={h.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.85rem 1rem', borderRadius: '10px', background: '#FAFAFA', border: '1px solid #E5E7EB' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
              background: h.estado === 'Completado' ? '#D1FAE5' : '#FEE2E2',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
            }}>
              {h.estado === 'Completado' ? '✅' : '❌'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {h.origen} → {h.destino}
              </p>
              <p style={{ margin: '0.15rem 0 0', fontSize: '0.78rem', color: '#9CA3AF' }}>
                {h.fecha} · 🪑 {h.pasajeros} pax · #{h.id}
              </p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <p style={{ margin: 0, fontWeight: 700, color: h.estado === 'Completado' ? '#059669' : '#EF4444' }}>
                {h.ingreso}
              </p>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#9CA3AF' }}>{h.estado}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
