import React from 'react';
import { FaStar, FaCar, FaUserShield, FaMedal, FaComments, FaRegCheckCircle } from 'react-icons/fa';

export default function PerfilTransparencia() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%', padding: '2rem', overflowY: 'auto' }}>
      <div style={{ background: 'var(--gray-900)', borderRadius: '24px', maxWidth: '500px', width: '100%', border: '1px solid var(--border)', overflow: 'hidden' }}>
        
        {/* Header con foto */}
        <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)', height: '120px', position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: '-40px', left: '2rem', width: '80px', height: '80px', borderRadius: '50%', background: '#fff', border: '4px solid var(--gray-900)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <img src="https://i.pravatar.cc/150?img=11" alt="Conductor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '10px', right: '1.5rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', padding: '0.4rem 0.8rem', borderRadius: '20px', color: 'white', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FaUserShield /> Identidad Verificada
          </div>
        </div>

        {/* Info principal */}
        <div style={{ padding: '3.5rem 2rem 2rem 2rem' }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>Carlos Mendoza</h2>
          <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Conductor Pro • Miembro desde 2024</p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ color: 'var(--yellow-400)', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.3rem' }}>
                4.9 <FaStar style={{fontSize: '1rem'}}/>
              </div>
              <div style={{ color: 'var(--gray-500)', fontSize: '0.75rem', marginTop: '0.2rem' }}>Calificación</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>342</div>
              <div style={{ color: 'var(--gray-500)', fontSize: '0.75rem', marginTop: '0.2rem' }}>Viajes completados</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>2.5</div>
              <div style={{ color: 'var(--gray-500)', fontSize: '0.75rem', marginTop: '0.2rem' }}>Años de exp.</div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaCar style={{color: 'var(--gray-400)'}}/> Vehículo Asignado
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ background: '#2563eb', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '6px', fontWeight: 'bold', letterSpacing: '2px' }}>
                GSB-4598
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: 'bold' }}>Kia Picanto (Plata)</div>
                <div style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>Año 2022 • Capacidad: 4 asientos</div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaComments style={{color: 'var(--gray-400)'}}/> Reseñas Recientes
            </h3>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ color: 'var(--gray-300)', fontWeight: 'bold', fontSize: '0.9rem' }}>María L.</span>
                <span style={{ color: 'var(--yellow-400)', fontSize: '0.8rem' }}>★★★★★</span>
              </div>
              <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem', margin: 0 }}>"Excelente conductor, muy prudente y el auto estaba impecable."</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ color: 'var(--gray-300)', fontWeight: 'bold', fontSize: '0.9rem' }}>Andrés J.</span>
                <span style={{ color: 'var(--yellow-400)', fontSize: '0.8rem' }}>★★★★★</span>
              </div>
              <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem', margin: 0 }}>"Llegó a tiempo y fue muy amable. Totalmente recomendado."</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
