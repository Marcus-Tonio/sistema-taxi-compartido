import React, { useState, useEffect } from 'react';
import MapaInteractivo from './MapaInteractivo';
import { FaCarSide, FaMapMarkerAlt, FaCircle } from 'react-icons/fa';

export default function Disponibilidad() {
  const [zona, setZona] = useState('Centro de Guayaquil');
  const [cargando, setCargando] = useState(false);
  const [taxis, setTaxis] = useState([]);

  // Simulando taxis que cambian de posición ligeramente
  useEffect(() => {
    const mockTaxis = [
      { id: 1, lat: -2.1900, lng: -79.8885, estado: 'Disponible', conductor: 'Carlos M.' },
      { id: 2, lat: -2.1850, lng: -79.8920, estado: 'Ocupado', conductor: 'Ana T.' },
      { id: 3, lat: -2.1950, lng: -79.8800, estado: 'Disponible', conductor: 'Luis V.' },
      { id: 4, lat: -2.1800, lng: -79.8950, estado: 'Disponible', conductor: 'Jorge P.' },
    ];
    setTaxis(mockTaxis);
  }, [zona]);

  const actualizarMapa = () => {
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
    }, 1500);
  };

  return (
    <div className="map-view-container">
      <div className="map-background">
        <MapaInteractivo
          origen={[-2.1894, -79.8891]}
          destino={null}
        />
        {/* Aquí irían los marcadores de Leaflet para cada taxi. 
            Por ahora el MapaInteractivo base solo tiene origen y destino.
            Para completarlo habría que pasar los 'taxis' como prop a MapaInteractivo. */}
      </div>

      <div className="floating-panel" style={{ width: '350px' }}>
        <div className="floating-panel-header">
          <h2>Disponibilidad (RF-4)</h2>
          <p style={{ color: 'var(--gray-400)', fontSize: '0.82rem', marginTop: '0.3rem', marginBottom: 0 }}>
            Ver taxis disponibles en tiempo real.
          </p>
        </div>

        <div className="floating-panel-body">
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: 'var(--gray-300)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Zona de búsqueda</label>
            <select 
              value={zona} 
              onChange={(e) => setZona(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.65rem', color: 'white', outline: 'none' }}
            >
              <option value="Centro de Guayaquil" style={{ background: '#1a1a1a' }}>Centro de Guayaquil</option>
              <option value="Urdesa" style={{ background: '#1a1a1a' }}>Urdesa</option>
              <option value="Vía a la Costa" style={{ background: '#1a1a1a' }}>Vía a la Costa</option>
              <option value="Sur de Guayaquil" style={{ background: '#1a1a1a' }}>Sur de Guayaquil</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
              <FaCarSide style={{ color: '#10b981', marginBottom: '0.3rem', fontSize: '1.2rem' }} />
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.4rem' }}>{taxis.filter(t => t.estado === 'Disponible').length}</div>
              <div style={{ color: 'var(--gray-400)', fontSize: '0.75rem' }}>Disponibles</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
              <FaCarSide style={{ color: '#3b82f6', marginBottom: '0.3rem', fontSize: '1.2rem' }} />
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.4rem' }}>{taxis.filter(t => t.estado === 'Ocupado').length}</div>
              <div style={{ color: 'var(--gray-400)', fontSize: '0.75rem' }}>Ocupados</div>
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--gray-300)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.5px' }}>Taxis Cercanos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {taxis.map(taxi => (
                <div key={taxi.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }}>
                  <FaCircle style={{ color: taxi.estado === 'Disponible' ? '#10b981' : '#3b82f6', fontSize: '0.6rem' }} />
                  <span style={{ color: 'white', fontSize: '0.9rem', flex: 1 }}>{taxi.conductor}</span>
                  <span style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>{taxi.estado}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={actualizarMapa}
            disabled={cargando}
            style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', color: '#000', padding: '0.9rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: cargando ? 'not-allowed' : 'pointer', fontSize: '0.95rem' }}
          >
            {cargando ? 'Actualizando...' : 'Actualizar Mapa'}
          </button>
        </div>
      </div>
    </div>
  );
}
