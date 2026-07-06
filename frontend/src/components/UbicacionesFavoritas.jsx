import React, { useState } from 'react';
import { FaMapMarkerAlt, FaHome, FaBriefcase, FaUniversity, FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

const ICONOS = {
  Casa: <FaHome />,
  Trabajo: <FaBriefcase />,
  Universidad: <FaUniversity />,
  Otro: <FaMapMarkerAlt />,
};

const COLORES = {
  Casa: '#10b981',
  Trabajo: '#3b82f6',
  Universidad: '#8b5cf6',
  Otro: '#f59e0b',
};

const iniciales = [
  { id: 1, etiqueta: 'Casa', direccion: 'Cdla. Kennedy Norte, Guayaquil' },
  { id: 2, etiqueta: 'Trabajo', direccion: 'Av. Francisco de Orellana y Luis Orrantia' },
  { id: 3, etiqueta: 'Universidad', direccion: 'Universidad de Guayaquil, Ciudadela Universitaria' },
];

export default function UbicacionesFavoritas() {
  const [favoritas, setFavoritas] = useState(iniciales);
  const [nueva, setNueva] = useState({ etiqueta: 'Otro', direccion: '' });
  const [agregando, setAgregando] = useState(false);
  const [guardado, setGuardado] = useState(null);

  const eliminar = (id) => setFavoritas(prev => prev.filter(f => f.id !== id));

  const agregar = () => {
    if (!nueva.direccion.trim()) return;
    setFavoritas(prev => [...prev, { id: Date.now(), ...nueva }]);
    setNueva({ etiqueta: 'Otro', direccion: '' });
    setAgregando(false);
    setGuardado('¡Ubicación guardada!');
    setTimeout(() => setGuardado(null), 2000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <div style={{ background: 'var(--gray-900)', borderRadius: '24px', padding: '2.5rem', maxWidth: '480px', width: '100%', border: '1px solid var(--border)' }}>
        <h2 style={{ color: 'white', marginBottom: '0.3rem' }}>Ubicaciones Favoritas</h2>
        <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          RF-14 · Guarda hasta 10 ubicaciones frecuentes para solicitar viajes más rápido.
        </p>

        {guardado && (
          <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.5rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <FaCheck /> {guardado}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {favoritas.map(fav => {
            const color = COLORES[fav.etiqueta] || COLORES.Otro;
            const icono = ICONOS[fav.etiqueta] || ICONOS.Otro;
            return (
              <div key={fav.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '12px', border: `1px solid ${color}30` }}>
                <div style={{ background: `${color}20`, color, width: '40px', height: '40px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                  {icono}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem' }}>{fav.etiqueta}</div>
                  <div style={{ color: 'var(--gray-400)', fontSize: '0.82rem', marginTop: '0.15rem' }}>{fav.direccion}</div>
                </div>
                <button onClick={() => eliminar(fav.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.4rem', opacity: 0.7, transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.7}>
                  <FaTrash />
                </button>
              </div>
            );
          })}
        </div>

        {favoritas.length < 10 && !agregando && (
          <button onClick={() => setAgregando(true)} style={{ width: '100%', background: 'transparent', border: '1px dashed var(--border)', color: 'var(--gray-400)', padding: '0.9rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', transition: 'all 0.2s' }}>
            <FaPlus /> Agregar ubicación ({10 - favoritas.length} disponibles)
          </button>
        )}

        {agregando && (
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '14px', padding: '1.25rem', border: '1px solid var(--border)', marginBottom: '0.5rem' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', color: 'var(--gray-300)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Etiqueta</label>
              <select value={nueva.etiqueta} onChange={e => setNueva(p => ({ ...p, etiqueta: e.target.value }))} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.65rem', color: 'white', outline: 'none' }}>
                {Object.keys(ICONOS).map(k => <option key={k} value={k} style={{ background: '#1a1a1a' }}>{k}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', color: 'var(--gray-300)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Dirección</label>
              <input type="text" placeholder="Ej. Cdla. Urdesa Central, Guayaquil" value={nueva.direccion} onChange={e => setNueva(p => ({ ...p, direccion: e.target.value }))} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.65rem', color: 'white', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setAgregando(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--gray-300)', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
              <button onClick={agregar} style={{ flex: 2, background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', color: '#000', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Guardar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
