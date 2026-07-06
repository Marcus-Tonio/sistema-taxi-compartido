import React, { useState } from 'react';
import { FaShareAlt, FaWhatsapp, FaCopy, FaCheck, FaRoute, FaShieldAlt } from 'react-icons/fa';

export default function CompartirViaje() {
  const [copiado, setCopiado] = useState(false);
  const linkRastreo = "https://taxiec.com/track/TRK-982347";

  const copiarEnlace = () => {
    navigator.clipboard.writeText(linkRastreo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '2rem' }}>
      <div style={{ background: 'var(--gray-900)', padding: '2.5rem', borderRadius: '24px', maxWidth: '450px', width: '100%', border: '1px solid var(--border)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 1rem', color: '#3b82f6', fontSize: '1.8rem' }}>
            <FaShieldAlt />
          </div>
          <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>Viaja Seguro</h2>
          <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem' }}>Comparte tu ubicación en tiempo real y los detalles del conductor con tus seres queridos.</p>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'white', fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaRoute style={{color: 'var(--yellow-400)'}}/> Detalles de tu viaje actual
          </h3>
          <div style={{ color: 'var(--gray-300)', fontSize: '0.85rem', lineHeight: '1.6' }}>
            <strong>Conductor:</strong> Carlos Mendoza <br/>
            <strong>Vehículo:</strong> Kia Picanto (GSB-4598) <br/>
            <strong>Destino:</strong> Malecón 2000 <br/>
            <strong>Llegada estimada:</strong> 14:30 (en 12 min)
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: 'var(--gray-400)', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Enlace de Rastreo</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              value={linkRastreo} 
              readOnly 
              style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.8rem 1rem', color: 'var(--gray-300)', fontSize: '0.9rem', outline: 'none' }} 
            />
            <button 
              onClick={copiarEnlace}
              style={{ background: copiado ? '#10b981' : 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', width: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', transition: 'background 0.2s' }}
              title="Copiar enlace"
            >
              {copiado ? <FaCheck /> : <FaCopy />}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ flex: 1, background: '#25d366', color: 'white', border: 'none', padding: '1rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}>
            <FaWhatsapp style={{fontSize: '1.2rem'}}/> WhatsApp
          </button>
          <button style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '1rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}>
            <FaShareAlt /> Otras apps
          </button>
        </div>

      </div>
    </div>
  );
}
