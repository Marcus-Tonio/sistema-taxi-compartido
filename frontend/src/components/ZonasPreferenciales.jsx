import React, { useState } from 'react';

export default function ZonasPreferenciales() {
  const [zonas, setZonas] = useState([
    { id: 1, nombre: 'Centro Histórico', horario: '06:00 - 10:00', estado: 'VIGENTE' },
    { id: 2, nombre: 'Urdesa Norte', horario: '16:00 - 20:00', estado: 'VIGENTE' },
    { id: 3, nombre: 'Puerto Santa Ana', horario: '07:00 - 09:00', estado: 'INACTIVA' },
  ]);

  const [nueva, setNueva] = useState({ nombre: '', inicio: '', fin: '' });
  const [modo, setModo] = useState('lista'); // 'lista' | 'nueva'

  const agregarZona = () => {
    if (!nueva.nombre || !nueva.inicio || !nueva.fin) return;
    setZonas(prev => [...prev, {
      id: prev.length + 1,
      nombre: nueva.nombre,
      horario: `${nueva.inicio} - ${nueva.fin}`,
      estado: 'VIGENTE',
    }]);
    setNueva({ nombre: '', inicio: '', fin: '' });
    setModo('lista');
  };

  const toggleEstado = (id) => {
    setZonas(prev => prev.map(z => z.id === id ? { ...z, estado: z.estado === 'VIGENTE' ? 'INACTIVA' : 'VIGENTE' } : z));
  };

  return (
    <div className="card" style={{ maxWidth: '560px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Zonas Preferenciales (RF-13)</h2>
        <button
          className="btn btn-primary"
          style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
          onClick={() => setModo(modo === 'lista' ? 'nueva' : 'lista')}
        >
          {modo === 'lista' ? '+ Nueva zona' : '← Volver'}
        </button>
      </div>

      {modo === 'nueva' && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#92400E' }}>Registrar nueva zona</h3>
          <div className="form-group">
            <label className="form-label">Nombre de la zona</label>
            <input type="text" className="form-control" placeholder="Ej. Alborada 4ta Etapa" value={nueva.nombre} onChange={e => setNueva({ ...nueva, nombre: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Horario inicio</label>
              <input type="time" className="form-control" value={nueva.inicio} onChange={e => setNueva({ ...nueva, inicio: e.target.value })} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Horario fin</label>
              <input type="time" className="form-control" value={nueva.fin} onChange={e => setNueva({ ...nueva, fin: e.target.value })} />
            </div>
          </div>
          <button className="btn btn-primary" onClick={agregarZona}>Guardar zona</button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {zonas.map(z => (
          <div key={z.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #E5E7EB', background: z.estado === 'VIGENTE' ? '#F0FDF4' : '#F9FAFB' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 600 }}>📍 {z.nombre}</p>
              <p style={{ margin: '0.15rem 0 0', fontSize: '0.82rem', color: '#6C757D' }}>🕐 {z.horario}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                background: z.estado === 'VIGENTE' ? '#D1FAE5' : '#F3F4F6',
                color: z.estado === 'VIGENTE' ? '#065F46' : '#9CA3AF',
                padding: '3px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 600,
              }}>
                {z.estado}
              </span>
              <button
                onClick={() => toggleEstado(z.id)}
                style={{ background: 'none', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '0.8rem', color: '#6C757D' }}
              >
                {z.estado === 'VIGENTE' ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
