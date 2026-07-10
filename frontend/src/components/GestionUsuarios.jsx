import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrash, FaPause, FaPlay } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  const cargarUsuarios = async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios/`);
      if (res.ok) {
        const data = await res.json();
        setUsuarios(data);
      }
    } catch (e) {
      console.error("Error cargando usuarios:", e);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const filtrados = usuarios.filter(u =>
    u.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.correo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const toggleEstado = async (u) => {
    const nuevoEstado = u.estado_cuenta === 'ACTIVO' ? 'SUSPENDIDO' : 'ACTIVO';
    try {
      const res = await fetch(`${API_URL}/usuarios/${u.id_usuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado_usuario: nuevoEstado })
      });
      if (res.ok) {
        alert(`Usuario actualizado a ${nuevoEstado}`);
        cargarUsuarios();
      }
    } catch (e) { console.error(e); }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario de la base de datos?")) return;
    try {
      const res = await fetch(`${API_URL}/usuarios/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert("Usuario eliminado correctamente.");
        cargarUsuarios();
      }
    } catch (e) { console.error(e); }
  };

  const estadoColor = { ACTIVO: { bg: 'rgba(16,185,129,0.15)', text: '#10b981' }, SUSPENDIDO: { bg: 'rgba(239,68,68,0.15)', text: '#ef4444' } };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ color: 'white', marginBottom: '0.3rem' }}>Gestión de Usuarios (CRUD)</h2>
      <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Leer, Actualizar y Eliminar usuarios reales de la Base de Datos.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.5rem', background: 'var(--gray-900)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', outline: 'none' }}
          />
        </div>
      </div>

      {cargando ? (
        <p style={{ color: 'white', textAlign: 'center' }}>Cargando usuarios desde el backend...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {filtrados.map(u => (
            <div key={u.id_usuario} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--gray-900)' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem', flexShrink: 0 }}>
                {u.nombres.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: 'white', fontSize: '1rem' }}>{u.nombres} {u.apellidos}</p>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--gray-400)' }}>{u.correo} · Rol: {u.rol}</p>
              </div>
              
              {u.estado_cuenta && (
                <span style={{ background: estadoColor[u.estado_cuenta]?.bg || '#333', color: estadoColor[u.estado_cuenta]?.text || '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  {u.estado_cuenta}
                </span>
              )}
              
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, marginLeft: '1rem' }}>
                <button onClick={() => toggleEstado(u)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white', borderRadius: '8px', padding: '0.5rem 0.75rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {u.estado_cuenta === 'ACTIVO' ? <FaPause title="Suspender" /> : <FaPlay title="Activar" />}
                </button>
                <button onClick={() => eliminar(u.id_usuario)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: '8px', padding: '0.5rem 0.75rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <FaTrash title="Eliminar definitivamente" />
                </button>
              </div>
            </div>
          ))}
          {filtrados.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '2rem 0' }}>No se encontraron usuarios.</p>
          )}
        </div>
      )}
    </div>
  );
}
