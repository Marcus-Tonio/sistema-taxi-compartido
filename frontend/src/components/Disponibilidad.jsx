import React, { useState, useEffect, useRef } from 'react';
import MapaInteractivo from './MapaInteractivo';
import { FaCarSide, FaCircle, FaStar, FaUserShield, FaChevronRight, FaCar, FaTimes, FaSync } from 'react-icons/fa';

const TAXIS_POR_ZONA = {
  'Centro de Guayaquil': [
    { id: 1, estado: 'Disponible', conductor: 'Carlos Mendoza', avatar: 'https://i.pravatar.cc/150?img=11', auto: 'Kia Picanto Gris', placa: 'GSB-4598', rating: 4.9, viajes: 342, eta: '3 min', lat: -2.1900, lng: -79.8885 },
    { id: 2, estado: 'Ocupado',    conductor: 'Ana Torres',     avatar: 'https://i.pravatar.cc/150?img=5',  auto: 'Chevrolet Aveo Blanco', placa: 'GBT-0234', rating: 4.7, viajes: 218, eta: '6 min', lat: -2.1850, lng: -79.8920 },
    { id: 3, estado: 'Disponible', conductor: 'Luis Vera',      avatar: 'https://i.pravatar.cc/150?img=15', auto: 'Toyota Yaris Azul', placa: 'HBA-1127', rating: 4.8, viajes: 156, eta: '8 min', lat: -2.1950, lng: -79.8800 },
    { id: 4, estado: 'Disponible', conductor: 'Jorge Palacios', avatar: 'https://i.pravatar.cc/150?img=52', auto: 'Hyundai Accent Negro', placa: 'GCA-4491', rating: 4.6, viajes: 89, eta: '11 min', lat: -2.1800, lng: -79.8950 },
  ],
  'Urdesa': [
    { id: 5, estado: 'Disponible', conductor: 'Pedro Salinas',  avatar: 'https://i.pravatar.cc/150?img=30', auto: 'Nissan Sentra Blanco', placa: 'GBK-7721', rating: 4.5, viajes: 201, eta: '4 min', lat: -2.1700, lng: -79.9050 },
    { id: 6, estado: 'Ocupado',    conductor: 'Rosa Mejía',     avatar: 'https://i.pravatar.cc/150?img=47', auto: 'Hyundai Accent Rojo', placa: 'GBP-0019', rating: 4.9, viajes: 404, eta: '9 min', lat: -2.1750, lng: -79.9000 },
  ],
  'Vía a la Costa': [
    { id: 7, estado: 'Disponible', conductor: 'Ramón Viteri',   avatar: 'https://i.pravatar.cc/150?img=60', auto: 'Chevrolet Spark Plateado', placa: 'HBC-0045', rating: 4.4, viajes: 67, eta: '7 min', lat: -2.1500, lng: -79.9200 },
  ],
  'Sur de Guayaquil': [
    { id: 8, estado: 'Disponible', conductor: 'Marco Freire',   avatar: 'https://i.pravatar.cc/150?img=18', auto: 'Kia Rio Blanco', placa: 'GCD-1122', rating: 4.7, viajes: 130, eta: '5 min', lat: -2.2200, lng: -79.9100 },
    { id: 9, estado: 'Ocupado',    conductor: 'Claudia León',   avatar: 'https://i.pravatar.cc/150?img=56', auto: 'Renault Logan Gris', placa: 'GCA-8831', rating: 4.8, viajes: 289, eta: '12 min', lat: -2.2300, lng: -79.9000 },
  ],
};

export default function Disponibilidad() {
  const [zona, setZona] = useState('Centro de Guayaquil');
  const [cargando, setCargando] = useState(false);
  const [taxis, setTaxis] = useState(TAXIS_POR_ZONA['Centro de Guayaquil']);
  const [conductorModal, setConductorModal] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const intervalRef = useRef(null);

  const cargarTaxis = (z) => {
    setCargando(true);
    setTimeout(() => {
      setTaxis(TAXIS_POR_ZONA[z] || []);
      setLastUpdate(new Date());
      setCargando(false);
    }, 800);
  };

  // Simular actualización "en tiempo real" cada 15 segundos
  useEffect(() => {
    cargarTaxis(zona);
    intervalRef.current = setInterval(() => {
      setLastUpdate(new Date());
    }, 15000);
    return () => clearInterval(intervalRef.current);
  }, [zona]);

  const disponibles = taxis.filter(t => t.estado === 'Disponible');
  const ocupados = taxis.filter(t => t.estado === 'Ocupado');

  return (
    <div className="map-view-container">
      <div className="map-background">
        <MapaInteractivo origen={[-2.1894, -79.8891]} destino={null} />
      </div>

      {/* Panel flotante principal */}
      <div className="floating-panel" style={{ width: '360px' }}>
        <div className="floating-panel-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Taxis Disponibles</h2>
            <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '0.3rem 0.7rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FaCircle style={{ fontSize: '0.45rem' }} /> EN VIVO
            </span>
          </div>
          <p style={{ color: 'var(--gray-400)', fontSize: '0.78rem', marginTop: '0.3rem', marginBottom: 0 }}>
            Últ. actualización: {lastUpdate.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        </div>

        <div className="floating-panel-body">
          {/* Selector de zona */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: 'var(--gray-400)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Zona de búsqueda</label>
            <select
              value={zona}
              onChange={(e) => setZona(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.7rem', color: 'white', outline: 'none', fontSize: '0.9rem' }}
            >
              {Object.keys(TAXIS_POR_ZONA).map(z => (
                <option key={z} value={z} style={{ background: '#1a1a1a' }}>{z}</option>
              ))}
            </select>
          </div>

          {/* Contadores */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
              <FaCarSide style={{ color: '#10b981', fontSize: '1.2rem', marginBottom: '0.3rem' }} />
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.6rem' }}>{cargando ? '...' : disponibles.length}</div>
              <div style={{ color: '#10b981', fontSize: '0.72rem', fontWeight: 600 }}>Disponibles</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
              <FaCarSide style={{ color: '#3b82f6', fontSize: '1.2rem', marginBottom: '0.3rem' }} />
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.6rem' }}>{cargando ? '...' : ocupados.length}</div>
              <div style={{ color: '#3b82f6', fontSize: '0.72rem', fontWeight: 600 }}>En viaje</div>
            </div>
          </div>

          {/* Lista de taxis CLICKEABLE */}
          <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '0.75rem', marginBottom: '1.25rem' }}>
            <h4 style={{ color: 'var(--gray-400)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
              Taxis cercanos — click para ver perfil
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {taxis.map(taxi => (
                <div
                  key={taxi.id}
                  onClick={() => setConductorModal(taxi)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.75rem', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid transparent', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                >
                  <img src={taxi.avatar} alt={taxi.conductor} style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: 'white', fontSize: '0.88rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{taxi.conductor}</div>
                    <div style={{ color: 'var(--gray-500)', fontSize: '0.72rem' }}>{taxi.eta} · ⭐ {taxi.rating}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <FaCircle style={{ color: taxi.estado === 'Disponible' ? '#10b981' : '#3b82f6', fontSize: '0.55rem' }} />
                    <FaChevronRight style={{ color: 'var(--gray-600)', fontSize: '0.7rem' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => cargarTaxis(zona)}
            disabled={cargando}
            style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', color: '#000', padding: '0.9rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: cargando ? 'not-allowed' : 'pointer', fontSize: '0.9rem' }}
          >
            <FaSync style={{ animation: cargando ? 'spin 1s linear infinite' : 'none' }} />
            {cargando ? 'Actualizando...' : 'Actualizar zona'}
          </button>
        </div>
      </div>

      {/* Modal de perfil del conductor */}
      {conductorModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setConductorModal(null)}>
          <div style={{ background: 'var(--gray-900)', borderRadius: '20px', width: '100%', maxWidth: '360px', border: '1px solid var(--border)', overflow: 'hidden', animation: 'slideUp 0.2s ease' }} onClick={e => e.stopPropagation()}>
            {/* Header del modal */}
            <div style={{ background: 'linear-gradient(135deg, #f59e0b, #b45309)', height: '90px', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '0 1.5rem 0' }}>
              <div style={{ position: 'absolute', bottom: '-30px', left: '1.5rem', width: '64px', height: '64px', borderRadius: '50%', border: '3px solid var(--gray-900)', overflow: 'hidden', background: '#fff' }}>
                <img src={conductorModal.avatar} alt={conductorModal.conductor} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <button onClick={() => setConductorModal(null)} style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(0,0,0,0.3)', border: 'none', color: 'white', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                <FaTimes />
              </button>
            </div>
            {/* Body del modal */}
            <div style={{ padding: '2.5rem 1.5rem 1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ color: 'white', margin: '0 0 0.2rem', fontSize: '1.2rem' }}>{conductorModal.conductor}</h3>
                  <p style={{ color: 'var(--gray-400)', margin: 0, fontSize: '0.82rem' }}>{conductorModal.auto}</p>
                </div>
                <span style={{ background: conductorModal.estado === 'Disponible' ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)', color: conductorModal.estado === 'Disponible' ? '#10b981' : '#3b82f6', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                  {conductorModal.estado}
                </span>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {[
                  { val: `${conductorModal.rating} ⭐`, label: 'Calificación' },
                  { val: conductorModal.viajes, label: 'Viajes' },
                  { val: conductorModal.eta, label: 'ETA' },
                ].map(s => (
                  <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                    <div style={{ color: 'var(--yellow-400)', fontWeight: 'bold', fontSize: '0.95rem' }}>{s.val}</div>
                    <div style={{ color: 'var(--gray-500)', fontSize: '0.7rem', marginTop: '0.15rem' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Placa */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: '12px', marginBottom: '1rem' }}>
                <FaUserShield style={{ color: 'var(--yellow-400)' }} />
                <div>
                  <div style={{ color: 'var(--gray-400)', fontSize: '0.72rem' }}>Placa verificada</div>
                  <div style={{ color: 'white', fontWeight: 'bold', letterSpacing: '1px' }}>{conductorModal.placa}</div>
                </div>
              </div>

              <button onClick={() => setConductorModal(null)} style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', color: '#000', padding: '0.85rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
