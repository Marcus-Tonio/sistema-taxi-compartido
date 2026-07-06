import React from 'react';
import { FaBell, FaCarSide, FaCheckCircle, FaExclamationTriangle, FaTags } from 'react-icons/fa';

export default function Notificaciones() {
  const notificaciones = [
    {
      id: 1,
      tipo: 'viaje',
      titulo: 'Tu conductor ha llegado',
      mensaje: 'Carlos te está esperando en el punto de encuentro (Universidad de Guayaquil).',
      tiempo: 'Hace 2 min',
      leida: false,
      icono: <FaCarSide />,
      color: '#3b82f6'
    },
    {
      id: 2,
      tipo: 'promocion',
      titulo: '¡15% de descuento hoy!',
      mensaje: 'Usa el código TAXIEC15 en tu próximo viaje compartido antes de la medianoche.',
      tiempo: 'Hace 3 horas',
      leida: true,
      icono: <FaTags />,
      color: '#10b981'
    },
    {
      id: 3,
      tipo: 'alerta',
      titulo: 'Tráfico inusual en tu ruta',
      mensaje: 'Hemos recalculado tu ruta debido a congestión en la Av. 9 de Octubre.',
      tiempo: 'Ayer',
      leida: true,
      icono: <FaExclamationTriangle />,
      color: '#f59e0b'
    },
    {
      id: 4,
      tipo: 'sistema',
      titulo: 'Viaje completado con éxito',
      mensaje: 'Gracias por viajar con nosotros. Tu recibo ha sido enviado a tu correo.',
      tiempo: 'Ayer',
      leida: true,
      icono: <FaCheckCircle />,
      color: '#8b5cf6'
    }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%', padding: '2rem', overflowY: 'auto' }}>
      <div style={{ background: 'var(--gray-900)', borderRadius: '24px', maxWidth: '600px', width: '100%', border: '1px solid var(--border)', padding: '2rem' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FaBell style={{color: 'var(--yellow-400)'}}/> Notificaciones
          </h2>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--yellow-400)', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 'bold' }}>
            Marcar todas como leídas
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notificaciones.map(noti => (
            <div key={noti.id} style={{ 
              display: 'flex', 
              gap: '1.25rem', 
              background: noti.leida ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.08)', 
              padding: '1.25rem', 
              borderRadius: '16px', 
              borderLeft: `4px solid ${noti.leida ? 'transparent' : noti.color}`,
              transition: 'background 0.2s',
              cursor: 'pointer'
            }}>
              
              <div style={{ 
                background: `${noti.color}20`, 
                color: noti.color, 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                fontSize: '1.5rem',
                flexShrink: 0
              }}>
                {noti.icono}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                  <h3 style={{ margin: 0, color: noti.leida ? 'var(--gray-300)' : 'white', fontSize: '1.05rem' }}>{noti.titulo}</h3>
                  <span style={{ color: 'var(--gray-500)', fontSize: '0.75rem', whiteSpace: 'nowrap', marginLeft: '1rem' }}>{noti.tiempo}</span>
                </div>
                <p style={{ margin: 0, color: 'var(--gray-400)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  {noti.mensaje}
                </p>
              </div>

              {!noti.leida && (
                <div style={{ width: '8px', height: '8px', background: 'var(--yellow-400)', borderRadius: '50%', alignSelf: 'center', flexShrink: 0 }}></div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
