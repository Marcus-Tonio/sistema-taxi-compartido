import React, { useState } from 'react';
import { FaTimesCircle, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function CancelacionServicio() {
  const [motivo, setMotivo] = useState('');
  const [cancelado, setCancelado] = useState(false);
  const [loading, setLoading] = useState(false);

  const motivos = [
    'Cambié de planes',
    'Tardó demasiado el conductor',
    'Encontré otra alternativa',
    'Error al solicitar',
    'Emergencia personal',
  ];

  const cancelar = () => {
    if (!motivo) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setCancelado(true); }, 1200);
  };

  if (cancelado) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '2rem' }}>
        <div style={{ background: 'var(--gray-900)', padding: '3rem', borderRadius: '24px', textAlign: 'center', maxWidth: '400px', width: '100%', border: '1px solid var(--border)' }}>
          <FaCheckCircle style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem' }} />
          <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>Viaje Cancelado</h2>
          <p style={{ color: 'var(--gray-400)', marginBottom: '2rem' }}>Tu cancelación fue registrada. Si cancelas frecuentemente con menos de 5 minutos de anticipación, se anotará en tu historial.</p>
          <button className="btn btn-full-yellow" onClick={() => { setCancelado(false); setMotivo(''); }}>Volver al inicio</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '2rem' }}>
      <div style={{ background: 'var(--gray-900)', padding: '2.5rem', borderRadius: '24px', maxWidth: '450px', width: '100%', border: '1px solid var(--border)' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <FaTimesCircle style={{ color: '#ef4444', fontSize: '1.5rem' }} />
          <h2 style={{ color: 'white', margin: 0 }}>Cancelar Viaje</h2>
        </div>
        <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: '2rem' }}>Puedes cancelar tu solicitud antes de que el conductor inicie el trayecto.</p>

        {/* Viaje activo */}
        <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '14px', padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ color: 'var(--gray-300)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Viaje en curso:</div>
          <div style={{ color: 'white', fontWeight: 'bold' }}>Universidad de Guayaquil → Malecón 2000</div>
          <div style={{ color: 'var(--gray-400)', fontSize: '0.85rem', marginTop: '0.3rem' }}>Conductor: Carlos Mendoza · ETA: 8 min</div>
        </div>

        {/* Advertencia */}
        <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '10px', padding: '0.85rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <FaExclamationTriangle style={{ color: 'var(--yellow-400)', marginTop: '2px', flexShrink: 0 }} />
          <p style={{ margin: 0, color: 'var(--gray-300)', fontSize: '0.85rem' }}>
            Si cancelas con <strong style={{ color: 'var(--yellow-400)' }}>menos de 5 minutos</strong> de anticipación, se registrará una cancelación tardía en tu historial.
          </p>
        </div>

        <label style={{ display: 'block', color: 'var(--gray-300)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Motivo de cancelación</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
          {motivos.map(m => (
            <label key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: motivo === m ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${motivo === m ? 'rgba(239,68,68,0.4)' : 'transparent'}`, padding: '0.85rem', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <input type="radio" name="motivo" value={m} checked={motivo === m} onChange={() => setMotivo(m)} style={{ accentColor: '#ef4444' }} />
              <span style={{ color: 'var(--gray-200)', fontSize: '0.9rem' }}>{m}</span>
            </label>
          ))}
        </div>

        <button
          onClick={cancelar}
          disabled={!motivo || loading}
          style={{ width: '100%', background: motivo ? 'rgba(239,68,68,0.85)' : 'rgba(255,255,255,0.05)', border: 'none', color: motivo ? 'white' : 'var(--gray-600)', padding: '1rem', borderRadius: '12px', fontWeight: 'bold', cursor: motivo ? 'pointer' : 'not-allowed', fontSize: '1rem', transition: 'all 0.2s' }}
        >
          {loading ? 'Cancelando...' : 'Confirmar Cancelación'}
        </button>
      </div>
    </div>
  );
}
