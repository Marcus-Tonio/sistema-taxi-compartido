import React, { useState, useEffect } from 'react';
import { FaStar, FaUserCircle, FaCheckCircle, FaCar, FaRoute } from 'react-icons/fa';

// Simular historial de viajes completados del pasajero
// En producción esto vendría del backend
const historialViajes = JSON.parse(localStorage.getItem('historialViajes') || '[]');

const ULTIMO_VIAJE_DEMO = {
  conductor: 'Carlos Mendoza',
  avatar: 'https://i.pravatar.cc/150?img=11',
  origen: 'Universidad de Guayaquil',
  destino: 'Malecón 2000',
  fecha: new Date().toLocaleDateString('es-EC', { day: 'numeric', month: 'long' })
};

export default function Calificacion() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comentario, setComentario] = useState('');
  const [enviado, setEnviado] = useState(false);
  // Demo: simular que hay (o no) un viaje reciente para calificar
  const [tieneViajeReciente, setTieneViajeReciente] = useState(false);
  const [ratingApp, setRatingApp] = useState(0);
  const [hoverApp, setHoverApp] = useState(0);
  const [appEnviada, setAppEnviada] = useState(false);

  // Si el usuario aprueba el modo demo, mostrar la calificación
  const activarModoDemo = () => setTieneViajeReciente(true);

  // Pantalla de confirmación de calificación
  if (enviado) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '2rem' }}>
        <div style={{ background: 'var(--gray-900)', padding: '3rem', borderRadius: '24px', textAlign: 'center', maxWidth: '420px', width: '100%', border: '1px solid var(--border)' }}>
          <FaCheckCircle style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem' }} />
          <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>¡Gracias por calificar!</h2>
          <p style={{ color: 'var(--gray-400)', marginBottom: '2rem' }}>Tu opinión ayuda a mantener la calidad del servicio.</p>
          <button className="btn btn-full-yellow" onClick={() => { setEnviado(false); setRating(0); setComentario(''); setTieneViajeReciente(false); }}>Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100%', padding: '2rem' }}>
      <div style={{ maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* ─── Estado: SIN VIAJES RECIENTES ─── */}
        {!tieneViajeReciente && (
          <>
            {/* Banner principal informativo */}
            <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(180,83,9,0.12))', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🚕</div>
              <h2 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.3rem' }}>Aún no tienes viajes para calificar</h2>
              <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Una vez que completes tu primer viaje, podrás dejar tu calificación y comentarios sobre el conductor.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--yellow-400)', fontSize: '0.85rem', fontWeight: 600 }}>
                <FaRoute /> Solicita un viaje para comenzar
              </div>
            </div>

            {/* Botón para modo demo */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.78rem', marginBottom: '0.5rem' }}>── Modo de demostración ──</p>
              <button onClick={activarModoDemo} style={{ background: 'rgba(255,255,255,0.05)', border: '1px dashed var(--border)', color: 'var(--gray-400)', padding: '0.6rem 1.5rem', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem' }}>
                Simular viaje completado
              </button>
            </div>

            {/* Calificación de la APP */}
            <div style={{ background: 'var(--gray-900)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.75rem', textAlign: 'center' }}>
              <h3 style={{ color: 'white', marginBottom: '0.3rem', fontSize: '1.1rem' }}>¿Cómo te parece TaxiEc?</h3>
              <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Califica nuestra aplicación y ayúdanos a mejorar.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {[...Array(5)].map((_, i) => {
                  const val = i + 1;
                  return (
                    <FaStar key={i} size={32} color={val <= (hoverApp || ratingApp) ? '#f59e0b' : 'rgba(255,255,255,0.1)'} onMouseEnter={() => setHoverApp(val)} onMouseLeave={() => setHoverApp(0)} onClick={() => setRatingApp(val)} style={{ cursor: 'pointer', transition: 'color 0.15s' }} />
                  );
                })}
              </div>
              {!appEnviada ? (
                <button className="btn btn-full-yellow" disabled={ratingApp === 0} onClick={() => setAppEnviada(true)}>
                  Enviar calificación de app
                </button>
              ) : (
                <div style={{ color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <FaCheckCircle /> ¡Gracias por tu opinión!
                </div>
              )}
            </div>
          </>
        )}

        {/* ─── Estado: HAY VIAJE PARA CALIFICAR ─── */}
        {tieneViajeReciente && (
          <div style={{ background: 'var(--gray-900)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border)', textAlign: 'center' }}>
            {/* Conductor a calificar */}
            <img src={ULTIMO_VIAJE_DEMO.avatar} alt={ULTIMO_VIAJE_DEMO.conductor} style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--yellow-400)', marginBottom: '0.75rem' }} />
            <h2 style={{ color: 'white', marginBottom: '0.2rem', fontSize: '1.3rem' }}>¿Qué tal tu viaje con {ULTIMO_VIAJE_DEMO.conductor}?</h2>
            <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
              {ULTIMO_VIAJE_DEMO.origen} → {ULTIMO_VIAJE_DEMO.destino}
            </p>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.78rem', marginBottom: '2rem' }}>{ULTIMO_VIAJE_DEMO.fecha}</p>

            {/* Estrellas */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              {[...Array(5)].map((_, i) => {
                const val = i + 1;
                return (
                  <FaStar key={i} size={40} color={val <= (hover || rating) ? '#f59e0b' : 'rgba(255,255,255,0.1)'} onMouseEnter={() => setHover(val)} onMouseLeave={() => setHover(0)} onClick={() => setRating(val)} style={{ cursor: 'pointer', transition: 'color 0.15s' }} />
                );
              })}
            </div>

            {/* Comentario */}
            <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: 'var(--gray-300)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Comentario (opcional)</label>
              <textarea
                rows="3"
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', color: 'white', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                placeholder="Ej. Excelente servicio, muy amable."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </div>

            <button className="btn btn-full-yellow" disabled={rating === 0} onClick={() => setEnviado(true)}>
              Enviar calificación
            </button>
            <button onClick={() => setTieneViajeReciente(false)} style={{ background: 'none', border: 'none', color: 'var(--gray-500)', cursor: 'pointer', fontSize: '0.82rem', marginTop: '0.75rem', display: 'block', width: '100%' }}>
              Calificar más tarde
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
