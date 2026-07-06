import React, { useState } from 'react';

export default function Calificacion() {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [enviado, setEnviado] = useState(false);

  const labels = ['', 'Muy malo', 'Regular', 'Bueno', 'Muy bueno', 'Excelente'];

  if (enviado) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>¡Gracias por tu calificación!</h2>
        <p style={{ color: '#6C757D' }}>Tu opinión ayuda a mejorar el servicio.</p>
        <div style={{ fontSize: '2rem', margin: '1rem 0' }}>
          {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
        </div>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => { setStars(0); setEnviado(false); }}>
          Calificar otro viaje
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">Calificación y Reseña (RF-9)</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#F3F4F6', borderRadius: '8px', marginBottom: '1.5rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#1F2937', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: '#FFD500', fontSize: '1.1rem' }}>
          MP
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 600 }}>Manuel Pauta</p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#6C757D' }}>Viaje completado · Hoy 20:14</p>
        </div>
      </div>

      <div className="form-group" style={{ textAlign: 'center' }}>
        <label className="form-label">¿Cómo calificarías este viaje?</label>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', fontSize: '2.5rem', margin: '0.75rem 0', cursor: 'pointer' }}>
          {[1, 2, 3, 4, 5].map(i => (
            <span
              key={i}
              style={{ color: i <= (hover || stars) ? '#FFD500' : '#D1D5DB', transition: 'color 0.15s, transform 0.15s', transform: hover === i ? 'scale(1.2)' : 'scale(1)' }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setStars(i)}
            >
              ★
            </span>
          ))}
        </div>
        {(hover || stars) > 0 && (
          <span style={{ fontSize: '0.9rem', color: '#6C757D' }}>{labels[hover || stars]}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Etiquetas rápidas</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
          {['Puntual', 'Amable', 'Auto limpio', 'Manejo seguro', 'Ruta correcta'].map(tag => (
            <span
              key={tag}
              style={{ padding: '4px 12px', border: '1px solid #E5E7EB', borderRadius: '16px', fontSize: '0.85rem', cursor: 'pointer', backgroundColor: '#F9FAFB' }}
              onMouseEnter={e => { e.target.style.background = '#FFD500'; e.target.style.borderColor = '#FFD500'; }}
              onMouseLeave={e => { e.target.style.background = '#F9FAFB'; e.target.style.borderColor = '#E5E7EB'; }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Comentario adicional (opcional)</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Cuéntanos cómo fue tu experiencia..."
          style={{ resize: 'none' }}
        />
      </div>

      <div className="button-group">
        <button className="btn btn-secondary">Omitir</button>
        <button
          className="btn btn-primary"
          disabled={stars === 0}
          style={{ opacity: stars === 0 ? 0.5 : 1 }}
          onClick={() => setEnviado(true)}
        >
          Enviar calificación
        </button>
      </div>
    </div>
  );
}
