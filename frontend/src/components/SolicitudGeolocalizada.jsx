import React, { useState, useEffect } from 'react';
import MapaInteractivo from './MapaInteractivo';
import { FaMapMarkerAlt, FaCarAlt, FaUserFriends, FaMoneyBillWave, FaStar, FaLocationArrow, FaCheck } from 'react-icons/fa';

const LUGARES = [
  { nombre: "Malecón 2000", lat: -2.1900, lng: -79.8785 },
  { nombre: "Universidad de Guayaquil", lat: -2.1833, lng: -79.8997 },
  { nombre: "Plaza Lagos", lat: -2.1287, lng: -79.8654 },
  { nombre: "San Marino Shopping", lat: -2.1645, lng: -79.8973 }
];

// Taxis de prueba para mostrar al pasajero antes de confirmar
const TAXIS_DISPONIBLES = [
  { id: 1, conductor: 'Carlos Mendoza', avatar: 'https://i.pravatar.cc/150?img=11', placa: 'GSB-4598', auto: 'Kia Picanto Gris', rating: 4.9, eta: '3 min', lat: -2.1855, lng: -79.8870 },
  { id: 2, conductor: 'Ana Torres', avatar: 'https://i.pravatar.cc/150?img=5', placa: 'GBT-0234', auto: 'Chevrolet Aveo Blanco', rating: 4.7, eta: '6 min', lat: -2.1920, lng: -79.8820 },
  { id: 3, conductor: 'Luis Vera', avatar: 'https://i.pravatar.cc/150?img=15', placa: 'HBA-1127', auto: 'Toyota Yaris Azul', rating: 4.8, eta: '8 min', lat: -2.1800, lng: -79.8950 },
];

export default function SolicitudGeolocalizada() {
  const [paso, setPaso] = useState(1);
  const [origen, setOrigen] = useState(LUGARES[1]);
  const [destino, setDestino] = useState(null);
  const [tipoServicio, setTipoServicio] = useState('Compartido');
  const [taxiSeleccionado, setTaxiSeleccionado] = useState(null);
  const [obteniendoUbicacion, setObteniendoUbicacion] = useState(false);

  // Estado del modo de prueba (animación de llegada)
  const [etapaConductor, setEtapaConductor] = useState(null); // null | 'enCamino' | 'llegando' | 'llegado'

  const [distancia, setDistancia] = useState(0);
  const [tarifaEstimada, setTarifaEstimada] = useState(0);

  const obtenerUbicacionActual = () => {
    setObteniendoUbicacion(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setOrigen({
            nombre: '📍 Mi Ubicación Actual',
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setObteniendoUbicacion(false);
        },
        () => {
          // Si rechaza el permiso, usamos una ubicación simulada en Guayaquil
          setOrigen({ nombre: '📍 Mi Ubicación Actual (Simulada)', lat: -2.1934, lng: -79.8864 });
          setObteniendoUbicacion(false);
        }
      );
    } else {
      setOrigen({ nombre: '📍 Mi Ubicación Actual (Simulada)', lat: -2.1934, lng: -79.8864 });
      setObteniendoUbicacion(false);
    }
  };

  const seleccionarDestino = (lugar) => {
    setDestino(lugar);
    const dist = Math.sqrt(Math.pow(lugar.lat - origen.lat, 2) + Math.pow(lugar.lng - origen.lng, 2)) * 100;
    setDistancia(dist.toFixed(1));
    setTarifaEstimada((1.50 + dist * 0.8).toFixed(2));
    setPaso(2);
  };

  const confirmarViaje = async () => {
    const conductorFinal = taxiSeleccionado || TAXIS_DISPONIBLES[0];
    setPaso(3);
    setEtapaConductor('enCamino');

    // Intentar guardar en backend
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { id_usuario: 1 };
      await fetch('http://localhost:8000/viajes/solicitar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: currentUser.id_usuario || 1,
          origen: origen.nombre,
          destino: destino.nombre,
          cantidad_asientos: tipoServicio === 'Compartido' ? 1 : 4,
          fecha_viaje: new Date().toISOString()
        })
      });
    } catch (e) { console.log('Backend no disponible, modo demo activo'); }

    // Animación de prueba: simular llegada del conductor
    setTimeout(() => setEtapaConductor('llegando'), 4000);
    setTimeout(() => setEtapaConductor('llegado'), 8000);
  };

  const reiniciar = () => {
    setPaso(1);
    setDestino(null);
    setTaxiSeleccionado(null);
    setEtapaConductor(null);
  };

  const mensajeEtapa = {
    enCamino: { titulo: 'Conductor asignado 🚗', sub: `${(taxiSeleccionado || TAXIS_DISPONIBLES[0]).conductor} está en camino hacia ti.`, color: '#f59e0b', icono: '🚗' },
    llegando: { titulo: '¡Casi llega! 📍', sub: 'Tu conductor está a menos de 1 minuto de tu ubicación.', color: '#3b82f6', icono: '📍' },
    llegado: { titulo: '¡Tu taxi ha llegado! ✅', sub: `${(taxiSeleccionado || TAXIS_DISPONIBLES[0]).auto} · Placa: ${(taxiSeleccionado || TAXIS_DISPONIBLES[0]).placa}`, color: '#10b981', icono: '✅' },
  };

  return (
    <div className="map-view-container">
      <div className="map-background">
        <MapaInteractivo
          origen={origen ? [origen.lat, origen.lng] : null}
          destino={destino ? [destino.lat, destino.lng] : null}
        />
      </div>

      <div className="floating-panel">
        <div className="floating-panel-header">
          <h2>
            {paso === 1 && '¿A dónde vamos?'}
            {paso === 2 && 'Elige tu taxi'}
            {paso === 3 && 'Estado del viaje'}
          </h2>
        </div>

        <div className="floating-panel-body">
          {/* PASO 1: Elegir Destino */}
          {paso === 1 && (
            <div>
              <div className="location-inputs">
                <div className="loc-input-group">
                  <div className="loc-icon-dot origin"></div>
                  <input type="text" className="loc-input" value={origen.nombre} readOnly />
                </div>
                <div className="loc-line"></div>
                <div className="loc-input-group">
                  <div className="loc-icon-square dest"></div>
                  <input type="text" className="loc-input" placeholder="Buscar destino..." />
                </div>
              </div>

              {/* Botón de ubicación actual */}
              <button
                onClick={obtenerUbicacionActual}
                disabled={obteniendoUbicacion}
                style={{ width: '100%', marginTop: '0.75rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd', padding: '0.7rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}
              >
                <FaLocationArrow />
                {obteniendoUbicacion ? 'Obteniendo ubicación...' : 'Usar mi ubicación actual'}
              </button>

              <h4 style={{ color: 'var(--gray-400)', fontSize: '0.8rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>SUGERENCIAS CERCANAS</h4>
              <div className="suggestions-list">
                {LUGARES.filter(l => l.nombre !== origen.nombre).map((lugar, idx) => (
                  <button key={idx} className="suggestion-item" onClick={() => seleccionarDestino(lugar)}>
                    <div className="suggestion-icon"><FaMapMarkerAlt /></div>
                    <div className="suggestion-info">
                      <div className="suggestion-name">{lugar.nombre}</div>
                      <div className="suggestion-desc">Guayaquil, Ecuador</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PASO 2: Elegir taxi y servicio */}
          {paso === 2 && (
            <div>
              <div className="trip-summary" style={{ marginBottom: '1.25rem' }}>
                <div className="trip-summary-row">
                  <span>Distancia</span>
                  <strong>{distancia} km</strong>
                </div>
                <div className="trip-summary-row">
                  <span>Tiempo aprox.</span>
                  <strong>{Math.round(distancia * 4)} min</strong>
                </div>
              </div>

              {/* Taxis disponibles */}
              <h4 style={{ color: 'var(--gray-400)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>TAXIS CERCANOS — ELIGE UNO</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {TAXIS_DISPONIBLES.map(taxi => (
                  <div
                    key={taxi.id}
                    onClick={() => setTaxiSeleccionado(taxi)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem', background: taxiSeleccionado?.id === taxi.id ? 'rgba(245,158,11,0.12)' : 'rgba(0,0,0,0.3)', border: `1px solid ${taxiSeleccionado?.id === taxi.id ? 'var(--yellow-400)' : 'var(--border)'}`, borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    <img src={taxi.avatar} alt={taxi.conductor} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>{taxi.conductor}</div>
                      <div style={{ color: 'var(--gray-400)', fontSize: '0.75rem' }}>{taxi.auto} · {taxi.placa}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ color: 'var(--yellow-400)', fontWeight: 'bold', fontSize: '0.85rem' }}>⭐ {taxi.rating}</div>
                      <div style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 600 }}>{taxi.eta}</div>
                    </div>
                    {taxiSeleccionado?.id === taxi.id && (
                      <div style={{ color: 'var(--yellow-400)', fontSize: '1.1rem' }}><FaCheck /></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Tipo de servicio */}
              <h4 style={{ color: 'var(--gray-400)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>TIPO DE SERVICIO</h4>
              <div className="service-options" style={{ marginBottom: '1.25rem' }}>
                <label className={`service-option ${tipoServicio === 'Compartido' ? 'selected' : ''}`}>
                  <input type="radio" name="servicio" checked={tipoServicio === 'Compartido'} onChange={() => setTipoServicio('Compartido')} className="hidden-radio" />
                  <div className="service-icon"><FaUserFriends /></div>
                  <div className="service-info">
                    <div className="service-name">Compartido</div>
                    <div className="service-desc">Únete a un viaje activo</div>
                  </div>
                  <div className="service-price">${(tarifaEstimada * 0.6).toFixed(2)}</div>
                </label>
                <label className={`service-option ${tipoServicio === 'Exclusivo' ? 'selected' : ''}`}>
                  <input type="radio" name="servicio" checked={tipoServicio === 'Exclusivo'} onChange={() => setTipoServicio('Exclusivo')} className="hidden-radio" />
                  <div className="service-icon"><FaCarAlt /></div>
                  <div className="service-info">
                    <div className="service-name">Exclusivo</div>
                    <div className="service-desc">El auto es solo para ti</div>
                  </div>
                  <div className="service-price">${tarifaEstimada}</div>
                </label>
              </div>

              <div className="payment-method-selector">
                <FaMoneyBillWave style={{ color: '#10b981' }} /> <span>Efectivo</span>
                <span className="change-btn">Cambiar</span>
              </div>

              <div className="action-buttons">
                <button className="btn btn-secondary" onClick={() => setPaso(1)}>Atrás</button>
                <button
                  className="btn btn-full-yellow"
                  style={{ flex: 1, opacity: taxiSeleccionado ? 1 : 0.6 }}
                  onClick={confirmarViaje}
                  disabled={!taxiSeleccionado}
                >
                  Confirmar {tipoServicio}
                </button>
              </div>
              {!taxiSeleccionado && (
                <p style={{ textAlign: 'center', color: 'var(--gray-500)', fontSize: '0.78rem', marginTop: '0.5rem' }}>Selecciona un taxi para continuar</p>
              )}
            </div>
          )}

          {/* PASO 3: Animación de llegada del conductor */}
          {paso === 3 && etapaConductor && (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              {/* Tarjeta del conductor asignado */}
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', textAlign: 'left' }}>
                <img src={(taxiSeleccionado || TAXIS_DISPONIBLES[0]).avatar} alt="conductor" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--yellow-400)' }} />
                <div>
                  <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>{(taxiSeleccionado || TAXIS_DISPONIBLES[0]).conductor}</div>
                  <div style={{ color: 'var(--gray-400)', fontSize: '0.82rem' }}>{(taxiSeleccionado || TAXIS_DISPONIBLES[0]).auto}</div>
                  <div style={{ color: 'var(--yellow-400)', fontWeight: 'bold', fontSize: '0.9rem', marginTop: '0.2rem' }}>⭐ {(taxiSeleccionado || TAXIS_DISPONIBLES[0]).rating} · Placa: {(taxiSeleccionado || TAXIS_DISPONIBLES[0]).placa}</div>
                </div>
              </div>

              {/* Estado dinámico */}
              <div style={{ background: `rgba(0,0,0,0.3)`, border: `1px solid ${mensajeEtapa[etapaConductor]?.color}33`, borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{mensajeEtapa[etapaConductor]?.icono}</div>
                <h3 style={{ color: mensajeEtapa[etapaConductor]?.color, margin: '0 0 0.4rem' }}>{mensajeEtapa[etapaConductor]?.titulo}</h3>
                <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', margin: 0 }}>{mensajeEtapa[etapaConductor]?.sub}</p>
              </div>

              {/* Animación radar solo si sigue en camino */}
              {etapaConductor !== 'llegado' && (
                <div className="radar-animation" style={{ margin: '0 auto 1.5rem' }}>
                  <div className="radar-ping"></div>
                  <FaCarAlt className="radar-car-icon" />
                </div>
              )}

              {etapaConductor === 'llegado' ? (
                <button className="btn btn-full-yellow" style={{ width: '100%' }} onClick={reiniciar}>
                  Finalizar viaje
                </button>
              ) : (
                <button className="btn btn-secondary" style={{ width: '100%' }} onClick={reiniciar}>
                  Cancelar solicitud
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
