import React, { useState } from 'react';
import { FaExclamationTriangle, FaPaperPlane, FaCheckCircle, FaCamera } from 'react-icons/fa';

export default function ReporteIncidente() {
  const [enviado, setEnviado] = useState(false);
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const enviar = (e) => {
    e.preventDefault();
    if (!tipo || !descripcion) return;
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setTipo('');
      setDescripcion('');
    }, 3000);
  };

  if (enviado) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '2rem' }}>
        <div style={{ background: 'var(--gray-900)', borderRadius: '24px', padding: '3rem', textAlign: 'center', maxWidth: '450px', width: '100%', border: '1px solid var(--border)' }}>
          <FaCheckCircle style={{ color: '#10b981', fontSize: '4rem', marginBottom: '1.5rem' }} />
          <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>Reporte Enviado</h2>
          <p style={{ color: 'var(--gray-400)', marginBottom: '2rem' }}>
            Nuestro equipo revisará tu reporte lo antes posible. Te contactaremos si necesitamos más información.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%', padding: '2rem', overflowY: 'auto' }}>
      <div style={{ background: 'var(--gray-900)', borderRadius: '24px', padding: '2.5rem', maxWidth: '550px', width: '100%', border: '1px solid var(--border)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '0.5rem', borderRadius: '10px' }}>
            <FaExclamationTriangle style={{ color: 'var(--yellow-400)', fontSize: '1.2rem' }} />
          </div>
          <h2 style={{ color: 'white', margin: 0 }}>Reportar un Problema (RF-19)</h2>
        </div>
        <p style={{ color: 'var(--gray-400)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Describe detalladamente el incidente. Si es una emergencia, usa el botón S.O.S.
        </p>

        <form onSubmit={enviar} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div>
            <label style={{ display: 'block', color: 'var(--gray-300)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Tipo de Incidente</label>
            <select 
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.85rem', color: 'white', outline: 'none', fontSize: '0.9rem' }}
            >
              <option value="" disabled style={{ background: '#1a1a1a' }}>Selecciona una opción</option>
              <option value="objeto_perdido" style={{ background: '#1a1a1a' }}>Objeto perdido o encontrado</option>
              <option value="comportamiento" style={{ background: '#1a1a1a' }}>Comportamiento inadecuado</option>
              <option value="cobro" style={{ background: '#1a1a1a' }}>Problema con el cobro</option>
              <option value="accidente" style={{ background: '#1a1a1a' }}>Accidente de tránsito</option>
              <option value="otro" style={{ background: '#1a1a1a' }}>Otro</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--gray-300)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Descripción detallada</label>
            <textarea 
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              placeholder="¿Qué ocurrió? Proporciona todos los detalles posibles..."
              rows={5}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.85rem', color: 'white', outline: 'none', fontSize: '0.9rem', resize: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button type="button" style={{ background: 'rgba(255,255,255,0.05)', border: '1px dashed var(--border)', color: 'var(--gray-400)', padding: '0.85rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'border 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--yellow-400)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
              <FaCamera /> Adjuntar Foto
            </button>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Opcional. Max 5MB.</span>
          </div>

          <button 
            type="submit"
            disabled={!tipo || !descripcion}
            style={{ width: '100%', background: (!tipo || !descripcion) ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', color: (!tipo || !descripcion) ? 'var(--gray-500)' : '#000', padding: '1rem', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: (!tipo || !descripcion) ? 'not-allowed' : 'pointer', marginTop: '1rem', transition: 'all 0.3s' }}
          >
            <FaPaperPlane /> Enviar Reporte
          </button>
        </form>

      </div>
    </div>
  );
}
