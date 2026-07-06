import React, { useState } from 'react';

const usuariosIniciales = [
  { id: 1, nombre: 'Ana Torres', correo: 'ana@correo.com', tipo: 'Pasajero', estado: 'ACTIVO', viajes: 12 },
  { id: 2, nombre: 'Manuel Pauta', correo: 'manuel@correo.com', tipo: 'Conductor', estado: 'ACTIVO', viajes: 248 },
  { id: 3, nombre: 'Carla Reyes', correo: 'carla@correo.com', tipo: 'Pasajero', estado: 'SUSPENDIDO', viajes: 5 },
  { id: 4, nombre: 'Luis Mendoza', correo: 'luis@correo.com', tipo: 'Pasajero', estado: 'ACTIVO', viajes: 3 },
];

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [editando, setEditando] = useState(null);

  const filtrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.correo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const toggleEstado = (id) => {
    setUsuarios(prev => prev.map(u => u.id === id
      ? { ...u, estado: u.estado === 'ACTIVO' ? 'SUSPENDIDO' : 'ACTIVO' }
      : u));
  };

  const eliminar = (id) => {
    setUsuarios(prev => prev.filter(u => u.id !== id));
  };

  const estadoColor = { ACTIVO: { bg: '#D1FAE5', text: '#065F46' }, SUSPENDIDO: { bg: '#FEE2E2', text: '#991B1B' } };
  const tipoColor = { Pasajero: '#EFF6FF', Conductor: '#FFFBEB' };

  return (
    <div className="card" style={{ maxWidth: '700px' }}>
      <h2 className="card-title">Gestión de Usuarios (RF-15)</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Buscar por nombre o correo..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {filtrados.map(u => (
          <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', border: '1px solid #E5E7EB', borderRadius: '10px', background: '#FAFAFA' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1F2937', color: '#FFD500', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
              {u.nombre.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>{u.nombre}</p>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#9CA3AF' }}>{u.correo} · {u.viajes} viajes</p>
            </div>
            <span style={{ background: tipoColor[u.tipo], padding: '2px 8px', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 500 }}>{u.tipo}</span>
            <span style={{ background: estadoColor[u.estado].bg, color: estadoColor[u.estado].text, padding: '2px 8px', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 600 }}>{u.estado}</span>
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
              <button onClick={() => toggleEstado(u.id)} style={{ border: '1px solid #E5E7EB', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '0.78rem', background: '#fff' }}>
                {u.estado === 'ACTIVO' ? '⏸' : '▶'}
              </button>
              <button onClick={() => eliminar(u.id)} style={{ border: '1px solid #FEE2E2', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '0.78rem', background: '#FFF5F5', color: '#DC2626' }}>
                🗑
              </button>
            </div>
          </div>
        ))}
        {filtrados.length === 0 && (
          <p style={{ textAlign: 'center', color: '#9CA3AF', padding: '2rem 0' }}>Sin resultados para "{busqueda}"</p>
        )}
      </div>
    </div>
  );
}
