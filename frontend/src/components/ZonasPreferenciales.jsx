import React, { useState } from 'react';
import MapaInteractivo from './MapaInteractivo';
import { FaMapMarkerAlt, FaTrash, FaPlus, FaClock, FaCheck } from 'react-icons/fa';

const ZONAS_MOCK = [
  { id: 1, nombre: 'Centro Histórico', lat: -2.1944, lng: -79.8811, dias: ['Lun', 'Mar', 'Mié'], horario: '07:00 - 12:00', color: '#f59e0b' },
  { id: 2, nombre: 'Norte de Guayaquil', lat: -2.1200, lng: -79.8900, dias: ['Jue', 'Vie'], horario: '14:00 - 20:00', color: '#3b82f6' },
];

export default function ZonasPreferenciales() {
  const [zonas, setZonas] = useState(ZONAS_MOCK);
  const [guardado, setGuardado] = useState(false);

  const eliminarZona = (id) => setZonas(prev => prev.filter(z => z.id !== id));

  const guardar = () => {
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  return (
    <div className="map-view-container">
      <div className="map-background">
        <MapaInteractivo
          origen={[-2.1894, -79.8891]}
          destino={null}
        />
      </div>

      <div className="floating-panel" style={{ width: '360px' }}>
        <div className="floating-panel-header">
          <h2>Zonas Preferenciales</h2>
          <p style={{ color: 'var(--gray-400)', fontSize: '0.82rem', marginTop: '0.3rem', marginBottom: 0 }}>
            Define hasta 3 zonas donde quieres operar.
          </p>
        </div>

        <div className="floating-panel-body">
          {zonas.map((zona) => (
            <div key={zona.id} style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '0.75rem',
              border: `1px solid ${zona.color}40`,
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: zona.color, flexShrink: 0 }}></div>
                <span style={{ color: 'white', fontWeight: 'bold', flex: 1 }}>{zona.nombre}</span>
                <button onClick={() => eliminarZona(zona.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}>
                  <FaTrash size={12} />
                </button>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                {zona.dias.map(d => (
                  <span key={d} style={{ background: `${zona.color}20`, color: zona.color, padding: '0.15rem 0.5rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 'bold' }}>{d}</span>
                ))}
              </div>
              <div style={{ color: 'var(--gray-400)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FaClock size={10} /> {zona.horario}
              </div>
            </div>
          ))}

          {zonas.length < 3 && (
            <button
              style={{ width: '100%', background: 'transparent', border: '1px dashed var(--border)', color: 'var(--gray-400)', padding: '0.85rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--yellow-400)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <FaPlus /> Agregar zona ({3 - zonas.length} disponibles)
            </button>
          )}

          <button
            onClick={guardar}
            style={{ width: '100%', background: guardado ? '#10b981' : 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', color: guardado ? 'white' : '#000', padding: '1rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s', fontSize: '1rem' }}
          >
            {guardado ? <><FaCheck /> Guardado</> : 'Guardar Zonas'}
          </button>
        </div>
      </div>
    </div>
  );
}
