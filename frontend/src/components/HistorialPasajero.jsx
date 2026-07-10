import React from 'react';
import { FaMapMarkerAlt, FaStar, FaDownload } from 'react-icons/fa';

const viajes = [
  { id: 1, fecha: '06/07/2026', origen: 'Universidad de Guayaquil', destino: 'Malecón 2000', costo: '$2.10', calificacion: 5, conductor: 'Carlos Mendoza', estado: 'Completado' },
  { id: 2, fecha: '05/07/2026', origen: 'Plaza Lagos', destino: 'Cdla. Kennedy Norte', costo: '$3.80', calificacion: 4, conductor: 'Ana Torres', estado: 'Completado' },
  { id: 3, fecha: '04/07/2026', origen: 'San Marino Shopping', destino: 'Universidad de Guayaquil', costo: '$4.20', calificacion: 5, conductor: 'Luis Vera', estado: 'Completado' },
  { id: 4, fecha: '03/07/2026', origen: 'Av. 9 de Octubre', destino: 'Puerto Santa Ana', costo: '$1.90', calificacion: 3, conductor: 'Jorge Pinos', estado: 'Cancelado' },
];

export default function HistorialPasajero() {
  const totalGastado = viajes.filter(v => v.estado === 'Completado').reduce((acc, v) => acc + parseFloat(v.costo.replace('$', '')), 0);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <div style={{ maxWidth: '680px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ color: 'white', marginBottom: '0.2rem' }}>Historial de Actividad</h2>
            <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem' }}>Todos tus viajes pasados.</p>
          </div>
          <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', color: 'var(--gray-300)', padding: '0.6rem 1rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <FaDownload /> Exportar CSV
          </button>
        </div>

        {/* Resumen */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ flex: 1, background: 'var(--gray-900)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--yellow-400)', fontSize: '1.6rem', fontWeight: 'bold' }}>{viajes.filter(v => v.estado === 'Completado').length}</div>
            <div style={{ color: 'var(--gray-400)', fontSize: '0.8rem', marginTop: '0.2rem' }}>Viajes completados</div>
          </div>
          <div style={{ flex: 1, background: 'var(--gray-900)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ color: '#10b981', fontSize: '1.6rem', fontWeight: 'bold' }}>${totalGastado.toFixed(2)}</div>
            <div style={{ color: 'var(--gray-400)', fontSize: '0.8rem', marginTop: '0.2rem' }}>Total gastado</div>
          </div>
          <div style={{ flex: 1, background: 'var(--gray-900)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ color: 'white', fontSize: '1.6rem', fontWeight: 'bold' }}>4.3 ★</div>
            <div style={{ color: 'var(--gray-400)', fontSize: '0.8rem', marginTop: '0.2rem' }}>Tu calificación promedio</div>
          </div>
        </div>

        {/* Lista de viajes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {viajes.map(v => (
            <div key={v.id} style={{ background: 'var(--gray-900)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: v.estado === 'Cancelado' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <FaMapMarkerAlt style={{ color: v.estado === 'Cancelado' ? '#ef4444' : 'var(--yellow-400)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                  {v.origen} <span style={{ color: 'var(--gray-500)' }}>→</span> {v.destino}
                </div>
                <div style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>
                  {v.fecha} · {v.conductor}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ color: v.estado === 'Cancelado' ? '#ef4444' : '#10b981', fontWeight: 'bold', fontSize: '1.05rem' }}>
                  {v.estado === 'Cancelado' ? 'Cancelado' : v.costo}
                </div>
                {v.estado === 'Completado' && (
                  <div style={{ color: 'var(--yellow-400)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                    {'★'.repeat(v.calificacion)}{'☆'.repeat(5 - v.calificacion)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
