import React from 'react';
import MapaInteractivo from './MapaInteractivo';
import { FaCarSide, FaCopy, FaCheck, FaClock, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

export default function SeguimientoTiempoReal() {
  const [copiado, setCopiado] = useState(false);
  const linkRastreo = "https://taxiec.com/track/TRK-982347";

  const copiar = () => {
    navigator.clipboard.writeText(linkRastreo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="map-view-container">
      <div className="map-background">
        <MapaInteractivo
          origen={[-2.1750, -79.8950]}
          destino={[-2.1900, -79.8785]}
        />
      </div>

      <div className="floating-panel" style={{ width: '340px' }}>
        <div className="floating-panel-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
            Seguimiento en Vivo
          </h2>
          <p style={{ color: 'var(--gray-400)', fontSize: '0.82rem', marginTop: '0.3rem', marginBottom: 0 }}>
            Posición actualizada cada 5 segundos.
          </p>
        </div>

        <div className="floating-panel-body">
          {/* Conductor info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
            <img src="https://i.pravatar.cc/150?img=11" alt="Conductor" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontWeight: 'bold' }}>Carlos Mendoza</div>
              <div style={{ color: 'var(--gray-400)', fontSize: '0.82rem' }}>Kia Picanto · GSB-4598</div>
            </div>
            <FaCarSide style={{ color: 'var(--yellow-400)', fontSize: '1.5rem' }} />
          </div>

          {/* ETA + Distancia */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
              <FaClock style={{ color: 'var(--yellow-400)', marginBottom: '0.3rem' }} />
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.4rem' }}>8 min</div>
              <div style={{ color: 'var(--gray-400)', fontSize: '0.75rem' }}>Llegada estimada</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '1.4rem' }}>2.3</div>
              <div style={{ color: 'var(--gray-400)', fontSize: '0.75rem' }}>km restantes</div>
            </div>
          </div>

          {/* Ruta */}
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--gray-300)', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
              Conductor: Av. Pedro Menéndez Gilbert
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--gray-300)', fontSize: '0.88rem' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--yellow-400)' }}></div>
              Tu destino: Malecón 2000
            </div>
          </div>

          {/* Compartir enlace */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: 'var(--gray-400)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
              Compartir seguimiento
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={linkRastreo}
                readOnly
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.6rem 0.8rem', color: 'var(--gray-300)', fontSize: '0.8rem', outline: 'none' }}
              />
              <button
                onClick={copiar}
                style={{ background: copiado ? '#10b981' : 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', width: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', transition: 'background 0.2s' }}
              >
                {copiado ? <FaCheck /> : <FaCopy />}
              </button>
            </div>
          </div>

          <button style={{ width: '100%', background: '#25d366', color: 'white', border: 'none', padding: '0.9rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.95rem' }}>
            <FaWhatsapp style={{ fontSize: '1.1rem' }} /> Compartir por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
