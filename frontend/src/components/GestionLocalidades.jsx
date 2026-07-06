import React, { useState } from 'react';

const localidadesIniciales = [
  { id: 1, nombre: 'Guayaquil', provincia: 'Guayas', conductores: 48, activa: true },
  { id: 2, nombre: 'Samborondón', provincia: 'Guayas', conductores: 12, activa: true },
  { id: 3, nombre: 'Daule', provincia: 'Guayas', conductores: 6, activa: false },
  { id: 4, nombre: 'Durán', provincia: 'Guayas', conductores: 9, activa: true },
];

export default function GestionLocalidades() {
  const [localidades, setLocalidades] = useState(localidadesIniciales);
  const [modo, setModo] = useState('lista');
  const [form, setForm] = useState({ nombre: '', provincia: '' });

  const agregar = () => {
    if (!form.nombre || !form.provincia) return;
    setLocalidades(prev => [...prev, { id: prev.length + 1, nombre: form.nombre, provincia: form.provincia, conductores: 0, activa: true }]);
    setForm({ nombre: '', provincia: '' });
    setModo('lista');
  };

  const toggleActiva = (id) => setLocalidades(prev => prev.map(l => l.id === id ? { ...l, activa: !l.activa } : l));
  const eliminar = (id) => setLocalidades(prev => prev.filter(l => l.id !== id));

  return (
    <div className="card" style={{ maxWidth: '580px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Localidades (RF-17)</h2>
        <button className="btn btn-primary" style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={() => setModo(modo === 'lista' ? 'nuevo' : 'lista')}>
          {modo === 'lista' ? '+ Nueva' : '← Volver'}
        </button>
      </div>

      {modo === 'nuevo' && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#92400E' }}>Agregar localidad</h3>
          <div className="form-group">
            <label className="form-label">Nombre de la localidad</label>
            <input type="text" className="form-control" placeholder="Ej. Milagro" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Provincia</label>
            <input type="text" className="form-control" placeholder="Ej. Guayas" value={form.provincia} onChange={e => setForm({ ...form, provincia: e.target.value })} />
          </div>
          <button className="btn btn-primary" onClick={agregar}>Guardar</button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {localidades.map(l => (
          <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', border: '1px solid #E5E7EB', borderRadius: '10px', background: l.activa ? '#FAFAFA' : '#F3F4F6' }}>
            <div style={{ fontSize: '1.5rem' }}>📍</div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>{l.nombre}</p>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#9CA3AF' }}>{l.provincia} · {l.conductores} conductores</p>
            </div>
            <span style={{ background: l.activa ? '#D1FAE5' : '#F3F4F6', color: l.activa ? '#065F46' : '#9CA3AF', padding: '2px 8px', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 600 }}>
              {l.activa ? 'Activa' : 'Inactiva'}
            </span>
            <button onClick={() => toggleActiva(l.id)} style={{ border: '1px solid #E5E7EB', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '0.78rem', background: '#fff' }}>
              {l.activa ? '⏸' : '▶'}
            </button>
            <button onClick={() => eliminar(l.id)} style={{ border: '1px solid #FEE2E2', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '0.78rem', background: '#FFF5F5', color: '#DC2626' }}>
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
