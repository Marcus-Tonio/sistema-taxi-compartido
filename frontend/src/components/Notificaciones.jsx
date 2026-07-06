import React, { useState } from 'react';

const notificacionesMock = [
  { id: 1, tipo: 'viaje', icono: '🚕', titulo: 'Conductor asignado', mensaje: 'Manuel Pauta llegará en 5 minutos. Placa: GBT-0234', hora: 'Hace 2 min', leida: false },
  { id: 2, tipo: 'pago', icono: '💳', titulo: 'Pago confirmado', mensaje: 'Se procesó correctamente el pago de $2.25 por tu viaje.', hora: 'Hace 15 min', leida: false },
  { id: 3, tipo: 'promo', icono: '🎁', titulo: 'Nuevo cupón disponible', mensaje: 'Usa PROMO10 y obtén 10% de descuento en tu próximo viaje.', hora: 'Hace 1 hora', leida: true },
  { id: 4, tipo: 'sistema', icono: '🔔', titulo: 'Bienvenido al sistema', mensaje: 'Tu cuenta ha sido verificada exitosamente. ¡Buen viaje!', hora: 'Ayer', leida: true },
];

export default function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState(notificacionesMock);
  const [filtro, setFiltro] = useState('todas');

  const marcarLeidas = () => setNotificaciones(n => n.map(x => ({ ...x, leida: true })));

  const filtradas = filtro === 'todas' ? notificaciones : notificaciones.filter(n => !n.leida);
  const noLeidas = notificaciones.filter(n => !n.leida).length;

  return (
    <div className="card" style={{ maxWidth: '560px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
          Notificaciones (RF-10)
          {noLeidas > 0 && (
            <span style={{ marginLeft: '0.5rem', background: '#EF4444', color: '#fff', borderRadius: '50%', padding: '1px 7px', fontSize: '0.75rem', verticalAlign: 'middle' }}>
              {noLeidas}
            </span>
          )}
        </h2>
        {noLeidas > 0 && (
          <button onClick={marcarLeidas} style={{ background: 'none', border: 'none', color: '#6C757D', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline' }}>
            Marcar todo como leído
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {['todas', 'no leídas'].map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            style={{
              padding: '0.35rem 1rem',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: filtro === f ? '#FFD500' : '#E5E7EB',
              background: filtro === f ? '#FEF3C7' : 'transparent',
              fontWeight: filtro === f ? 700 : 400,
              cursor: 'pointer',
              fontSize: '0.85rem',
              textTransform: 'capitalize',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtradas.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6C757D' }}>
            <div style={{ fontSize: '2rem' }}>🎉</div>
            <p>¡Todo al día! No tienes notificaciones pendientes.</p>
          </div>
        )}
        {filtradas.map(n => (
          <div
            key={n.id}
            onClick={() => setNotificaciones(prev => prev.map(x => x.id === n.id ? { ...x, leida: true } : x))}
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '0.85rem 1rem',
              borderRadius: '10px',
              background: n.leida ? '#F9FAFB' : '#FFFBEB',
              border: `1px solid ${n.leida ? '#E5E7EB' : '#FDE68A'}`,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{n.icono}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <p style={{ margin: 0, fontWeight: n.leida ? 500 : 700, fontSize: '0.95rem' }}>{n.titulo}</p>
                <span style={{ fontSize: '0.75rem', color: '#9CA3AF', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>{n.hora}</span>
              </div>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#6C757D' }}>{n.mensaje}</p>
            </div>
            {!n.leida && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFD500', flexShrink: 0, marginTop: '6px' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
