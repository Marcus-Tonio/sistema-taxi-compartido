import React, { useState } from 'react';
import { FaStar, FaUserCircle, FaCheckCircle } from 'react-icons/fa';

export default function Calificacion() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comentario, setComentario] = useState('');
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '2rem' }}>
        <div style={{ background: 'var(--gray-900)', padding: '3rem', borderRadius: '24px', textAlign: 'center', maxWidth: '400px', width: '100%', border: '1px solid var(--border)' }}>
          <FaCheckCircle style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem' }} />
          <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>¡Gracias por tu feedback!</h2>
          <p style={{ color: 'var(--gray-400)', marginBottom: '2rem' }}>Tus comentarios nos ayudan a mejorar la comunidad.</p>
          <button className="btn btn-full-yellow" onClick={() => {setEnviado(false); setRating(0); setComentario('');}}>Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '2rem' }}>
      <div style={{ background: 'var(--gray-900)', padding: '2.5rem', borderRadius: '24px', maxWidth: '450px', width: '100%', border: '1px solid var(--border)', textAlign: 'center' }}>
        
        <div style={{ fontSize: '4rem', color: 'var(--yellow-400)', marginBottom: '0.5rem' }}><FaUserCircle /></div>
        <h2 style={{ color: 'white', marginBottom: '0.2rem' }}>¿Qué tal tu viaje con Carlos?</h2>
        <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: '2rem' }}>Viaje completado: Universidad → Malecón</p>

        {/* Estrellas Interactivas */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input 
                  type="radio" 
                  name="rating" 
                  value={ratingValue} 
                  onClick={() => setRating(ratingValue)}
                  style={{ display: 'none' }}
                />
                <FaStar 
                  className="star" 
                  color={ratingValue <= (hover || rating) ? "#f59e0b" : "rgba(255,255,255,0.1)"} 
                  size={40} 
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                  style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                />
              </label>
            );
          })}
        </div>

        <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: 'var(--gray-300)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Deja un comentario (opcional)</label>
          <textarea 
            rows="4" 
            style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', color: 'white', resize: 'none', fontFamily: 'inherit' }}
            placeholder="Ej. Excelente servicio, muy amable."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          ></textarea>
        </div>

        <button 
          className="btn btn-full-yellow" 
          disabled={rating === 0}
          onClick={() => setEnviado(true)}
        >
          Enviar Calificación
        </button>
      </div>
    </div>
  );
}
