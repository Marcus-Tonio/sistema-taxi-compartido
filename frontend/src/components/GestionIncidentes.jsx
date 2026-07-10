import React, { useState } from 'react';

const incidentesData = [
  { id: 'INC-001', tipo: 'Emergencia', descripcion: 'Conductor reportó accidente menor en Av. 9 de Octubre', fecha: '06 Jul · 20:31', estado: 'EN_ATENCION', prioridad: 'alta' },
  { id: 'INC-002', tipo: 'Incidente', descripcion: 'Pasajero olvidó pertenencias en el vehículo GBT-0234', fecha: '06 Jul · 19:15', estado: 'ABIERTO', prioridad: 'media' },
  { id: 'INC-003', tipo: 'Soporte', descripcion: 'Error al procesar pago con tarjeta Visa del usuario Ana Torres', fecha: '06 Jul · 18:02', estado: 'RESUELTO', prioridad: 'baja' },
  { id: 'INC-004', tipo: 'Emergencia', descripcion: 'Botón de pánico activado. Ruta: Urdesa Central', fecha: '05 Jul · 22:10', estado: 'RESUELTO', prioridad: 'alta' },
];

const estadoConf = {
  ABIERTO: { bg: '#FEE2E2', text: '#991B1B' },
  EN_ATENCION: { bg: '#FEF3C7', text: '#D97706' },
  RESUELTO: { bg: '#D1FAE5', text: '#065F46' },
};

const prioridadConf = {
  alta: { icon: '🔴', label: 'Alta' },
  media: { icon: '🟡', label: 'Media' },
  baja: { icon: '🟢', label: 'Baja' },
};

export default function GestionIncidentes() {
  const [incidentes, setIncidentes] = useState(incidentesData);
  const [filtroEstado, setFiltroEstado] = useState('todos');

  const cambiarEstado = (id, nuevoEstado) => setIncidentes(prev => prev.map(i => i.id === id ? { ...i, estado: nuevoEstado } : i));

  const filtrados = filtroEstado === 'todos' ? incidentes : incidentes.filter(i => i.estado === filtroEstado);

  return (
    <div className="card" style={{ maxWidth: '650px' }}>
      <h2 className="card-title">Monitor de Incidentes</h2>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['todos', 'ABIERTO', 'EN_ATENCION', 'RESUELTO'].map(f => (
          <button
            key={f}
            onClick={() => setFiltroEstado(f)}
            style={{
              padding: '0.3rem 0.85rem', borderRadius: '20px', border: '1px solid',
              borderColor: filtroEstado === f ? '#FFD500' : '#E5E7EB',
              background: filtroEstado === f ? '#FEF3C7' : 'transparent',
              fontWeight: filtroEstado === f ? 700 : 400,
              cursor: 'pointer', fontSize: '0.82rem',
            }}
          >
            {f === 'todos' ? 'Todos' : f.replace('_', ' ')}
            {f !== 'todos' && (
              <span style={{ marginLeft: '5px', background: '#1F2937', color: '#fff', borderRadius: '50%', padding: '0 5px', fontSize: '0.72rem' }}>
                {incidentes.filter(i => i.estado === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtrados.map(inc => (
          <div key={inc.id} style={{ padding: '1rem', border: `1px solid ${estadoConf[inc.estado].bg}`, borderLeft: `4px solid ${estadoConf[inc.estado].text}`, borderRadius: '10px', background: '#FAFAFA' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1F2937' }}>{inc.id}</span>
                <span style={{ background: '#F3F4F6', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', color: '#6C757D' }}>{inc.tipo}</span>
                <span style={{ fontSize: '0.82rem' }}>{prioridadConf[inc.prioridad].icon}</span>
              </div>
              <span style={{ background: estadoConf[inc.estado].bg, color: estadoConf[inc.estado].text, padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 600 }}>
                {inc.estado.replace('_', ' ')}
              </span>
            </div>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.88rem', color: '#374151' }}>{inc.descripcion}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>🕐 {inc.fecha}</span>
              {inc.estado !== 'RESUELTO' && (
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {inc.estado === 'ABIERTO' && (
                    <button onClick={() => cambiarEstado(inc.id, 'EN_ATENCION')} style={{ border: '1px solid #D97706', borderRadius: '6px', padding: '3px 8px', cursor: 'pointer', fontSize: '0.75rem', background: '#FEF3C7', color: '#D97706' }}>
                      Atender
                    </button>
                  )}
                  <button onClick={() => cambiarEstado(inc.id, 'RESUELTO')} style={{ border: '1px solid #059669', borderRadius: '6px', padding: '3px 8px', cursor: 'pointer', fontSize: '0.75rem', background: '#D1FAE5', color: '#059669' }}>
                    Resolver ✓
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
