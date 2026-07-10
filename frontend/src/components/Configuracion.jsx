import React from 'react';

const configItems = [
  {
    seccion: 'Base de datos',
    icono: '🗄',
    items: [
      { label: 'Motor de BD', value: 'Oracle 19c' },
      { label: 'Host', value: 'localhost:1521' },
      { label: 'Esquema', value: 'GRUPOC_TAXI' },
      { label: 'Estado de conexión', value: '✓ Conectado', ok: true },
    ],
  },
  {
    seccion: 'Aplicación',
    icono: '⚙️',
    items: [
      { label: 'Versión', value: 'v1.0.0 — Segundo Parcial' },
      { label: 'Backend', value: 'Python 3.11 + FastAPI' },
      { label: 'Frontend', value: 'React 19 + Vite' },
      { label: 'Entorno', value: 'Desarrollo local' },
    ],
  },
  {
    seccion: 'Equipo de desarrollo',
    icono: '👥',
    items: [
      { label: 'Integrante 1', value: 'Tablas maestras (USUARIO, LOCALIDAD...)' },
      { label: 'Integrante 2', value: 'Entidades del Conductor y Entorno' },
      { label: 'Integrante 3', value: 'Núcleo Operacional (VIAJE, RUTA...)' },
      { label: 'Integrante 4', value: 'Transacciones, Seguridad y Soporte' },
      { label: 'Integrante 5', value: 'Ensamblaje, QA y Datos de Prueba' },
    ],
  },
];

export default function Configuracion() {
  return (
    <div className="card" style={{ maxWidth: '620px' }}>
      <h2 className="card-title">Configuración del Sistema</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {configItems.map(grupo => (
          <div key={grupo.seccion} style={{ background: '#F9FAFB', borderRadius: '10px', padding: '1rem', border: '1px solid #E5E7EB' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1F2937', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{grupo.icono}</span> {grupo.seccion}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {grupo.items.map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0', borderBottom: '1px solid #F3F4F6' }}>
                  <span style={{ fontSize: '0.85rem', color: '#6C757D' }}>{item.label}</span>
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: item.ok ? '#059669' : '#1F2937',
                    background: item.ok ? '#D1FAE5' : 'transparent',
                    padding: item.ok ? '2px 8px' : '0',
                    borderRadius: item.ok ? '10px' : '0',
                  }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '10px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#92400E' }}>
          🎓 <strong>GRUPO C</strong> · Materia: Base de Datos · 4to Semestre · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
