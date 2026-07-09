import React, { useState, useEffect } from 'react';
import MapaInteractivo from './MapaInteractivo';
import { FaMapMarkerAlt, FaLocationArrow, FaCarAlt, FaUserFriends, FaChevronRight, FaRegClock, FaMoneyBillWave } from 'react-icons/fa';

// Coordenadas mock de lugares conocidos en Guayaquil
const LUGARES = [
  { nombre: "Malecón 2000", lat: -2.1900, lng: -79.8785 },
  { nombre: "Universidad de Guayaquil", lat: -2.1833, lng: -79.8997 },
  { nombre: "Plaza Lagos", lat: -2.1287, lng: -79.8654 },
  { nombre: "San Marino Shopping", lat: -2.1645, lng: -79.8973 }
];

export default function SolicitudGeolocalizada() {
  const [paso, setPaso] = useState(1); // 1: Seleccionar Destino, 2: Seleccionar Modalidad/Ver Conductores, 3: Confirmación
  const [origen, setOrigen] = useState(LUGARES[1]); // Valor por defecto
  const [destino, setDestino] = useState(null);
  const [tipoServicio, setTipoServicio] = useState('Compartido');
  
  // Solicitar ubicación del usuario al cargar el componente
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setOrigen({
            nombre: "Mi Ubicación Actual",
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error);
          // Si rechaza, se queda con el valor por defecto (LUGARES[1])
        }
      );
    }
  }, []);

  // Estados para simular cálculo de tarifas
  const [distancia, setDistancia] = useState(0);
  const [tarifaEstimada, setTarifaEstimada] = useState(0);

  const seleccionarDestino = (lugar) => {
    setDestino(lugar);
    // Simular un cálculo de distancia y tarifa simple basado en las coordenadas
    const dist = Math.sqrt(Math.pow(lugar.lat - origen.lat, 2) + Math.pow(lugar.lng - origen.lng, 2)) * 100;
    setDistancia(dist.toFixed(1));
    setTarifaEstimada((1.50 + dist * 0.8).toFixed(2));
    setPaso(2);
  };

  const confirmarViaje = async () => {
    setPaso(3);
    
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { id_usuario: 1 };
      
      const payload = {
        id_usuario: currentUser.id_usuario || 1,
        origen: origen.nombre,
        destino: destino.nombre,
        cantidad_asientos: tipoServicio === 'Compartido' ? 1 : 4,
        fecha_viaje: new Date().toISOString()
      };

      const response = await fetch('http://localhost:8000/viajes/solicitar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Viaje solicitado con éxito:", data);
        // Simulamos que encuentra conductor después de 2 segundos para no dejarlo cargando infinito
        setTimeout(() => {
          alert(`¡Conductor asignado! Viaje ID: ${data.id_viaje}, Reserva ID: ${data.id_reserva}`);
          setPaso(1);
          setDestino(null);
        }, 2000);
      } else {
        const err = await response.json();
        alert(`Error al solicitar: ${err.detail}`);
        setPaso(2);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error de red al conectar con el servidor.");
      setPaso(2);
    }
  };

  return (
    <div className="map-view-container">
      {/* El mapa de fondo ocupando toda la vista principal */}
      <div className="map-background">
        <MapaInteractivo 
          origen={origen ? [origen.lat, origen.lng] : null} 
          destino={destino ? [destino.lat, destino.lng] : null} 
        />
      </div>

      {/* Panel flotante (Glassmorphism) en el lado izquierdo */}
      <div className="floating-panel">
        <div className="floating-panel-header">
          <h2>
            {paso === 1 && '¿A dónde vamos?'}
            {paso === 2 && 'Confirmar Detalles'}
            {paso === 3 && 'Buscando Conductor'}
          </h2>
        </div>

        <div className="floating-panel-body">
          {/* PASO 1: Elegir Destino */}
          {paso === 1 && (
            <div className="step-1-content">
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

          {/* PASO 2: Elegir Servicio y Ver Tarifa (Unifica R4 y R5) */}
          {paso === 2 && (
            <div className="step-2-content">
              <div className="trip-summary">
                <div className="trip-summary-row">
                  <span>Distancia estimada</span>
                  <strong>{distancia} km</strong>
                </div>
                <div className="trip-summary-row">
                  <span>Tiempo aproximado</span>
                  <strong>{Math.round(distancia * 4)} min</strong>
                </div>
              </div>

              <h4 style={{ color: 'var(--gray-400)', fontSize: '0.8rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>TIPO DE VIAJE</h4>
              
              <div className="service-options">
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
                <FaMoneyBillWave style={{color: '#10b981'}} /> <span>Efectivo</span>
                <span className="change-btn">Cambiar</span>
              </div>

              <div className="action-buttons">
                <button className="btn btn-secondary" onClick={() => setPaso(1)}>Atrás</button>
                <button className="btn btn-full-yellow" style={{flex: 1}} onClick={confirmarViaje}>
                  Confirmar {tipoServicio}
                </button>
              </div>
            </div>
          )}

          {/* PASO 3: Estado de Búsqueda */}
          {paso === 3 && (
            <div className="step-3-content" style={{textAlign: 'center', padding: '2rem 0'}}>
              <div className="radar-animation">
                <div className="radar-ping"></div>
                <FaCarAlt className="radar-car-icon" />
              </div>
              <h3 style={{color: 'white', marginTop: '1.5rem'}}>Buscando conductores...</h3>
              <p style={{color: 'var(--gray-400)', fontSize: '0.9rem', marginTop: '0.5rem'}}>Contactando a los taxis más cercanos a la Universidad de Guayaquil.</p>
              
              <button className="btn btn-secondary" style={{width: '100%', marginTop: '2rem'}} onClick={() => setPaso(1)}>
                Cancelar Solicitud
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
