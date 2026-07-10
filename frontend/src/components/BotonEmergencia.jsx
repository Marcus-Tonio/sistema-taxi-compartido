import React, { useState } from 'react';
import { FaShieldAlt, FaPhoneAlt, FaExclamationTriangle, FaCheckCircle, FaTimes } from 'react-icons/fa';

export default function BotonEmergencia() {
  const [confirmando, setConfirmando] = useState(false);
  const [activado, setActivado] = useState(false);

  const activarAlarma = () => {
    setActivado(true);
    setConfirmando(false);
  };

  if (activado) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '2rem' }}>
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid #ef4444', borderRadius: '24px', padding: '3rem', textAlign: 'center', maxWidth: '450px', width: '100%' }}>
          <div style={{ width: '80px', height: '80px', background: '#ef4444', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 1.5rem', animation: 'pulse 1.5s infinite' }}>
            <FaShieldAlt style={{ color: 'white', fontSize: '2.5rem' }} />
          </div>
          <h2 style={{ color: '#ef4444', marginBottom: '0.5rem', fontSize: '1.8rem' }}>EMERGENCIA ACTIVADA</h2>
          <p style={{ color: 'var(--gray-300)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Se ha enviado tu ubicación en tiempo real a las autoridades y a tus contactos de emergencia.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
              <FaPhoneAlt /> Llamar al 911
            </button>
            <button onClick={() => setActivado(false)} style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--gray-500)', padding: '1rem', cursor: 'pointer', marginTop: '1rem' }}>
              Falsa alarma (Desactivar)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '2rem' }}>
      <div style={{ background: 'var(--gray-900)', borderRadius: '24px', padding: '3rem', textAlign: 'center', maxWidth: '450px', width: '100%', border: '1px solid var(--border)' }}>
        
        <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>Botón de Pánico</h2>
        <p style={{ color: 'var(--gray-400)', marginBottom: '3rem' }}>
          Úsalo solo en situaciones de peligro real. Alertará a las autoridades inmediatamente.
        </p>

        {!confirmando ? (
          <button 
            onClick={() => setConfirmando(true)}
            style={{ 
              width: '180px', height: '180px', borderRadius: '50%', background: 'linear-gradient(145deg, #ef4444, #b91c1c)', 
              border: 'none', color: 'white', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4), inset 0 5px 15px rgba(255,255,255,0.2)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.75rem',
              margin: '0 auto', transition: 'transform 0.2s'
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <FaShieldAlt style={{ fontSize: '3.5rem' }} />
            S.O.S
          </button>
        ) : (
          <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.3)', padding: '2rem', borderRadius: '16px' }}>
            <FaExclamationTriangle style={{ color: '#ef4444', fontSize: '2.5rem', marginBottom: '1rem' }} />
            <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>¿Estás seguro?</h3>
            <p style={{ color: 'var(--gray-400)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Al confirmar, se enviará tu ubicación exacta a la policía.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={() => setConfirmando(false)}
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.85rem', borderRadius: '10px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
              <button 
                onClick={activarAlarma}
                style={{ flex: 1, background: '#ef4444', border: 'none', color: 'white', padding: '0.85rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
