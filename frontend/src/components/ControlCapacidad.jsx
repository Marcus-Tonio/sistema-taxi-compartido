import React, { useState } from 'react';

export default function ControlCapacidad() {
  const [asientosOcupados, setAsientosOcupados] = useState(2);
  const capacidadTotal = 4;
  const disponibles = capacidadTotal - asientosOcupados;
  const porcentaje = (asientosOcupados / capacidadTotal) * 100;

  const pasajeros = [
    { nombre: 'Ana Torres', destino: 'Urdesa Central', parada: 1 },
    { nombre: 'Carla Reyes', destino: 'Alborada 9na', parada: 2 },
  ];

  return (
    <div className="card">
      <h2 className="card-title">Control de Capacidad (RF-12)</h2>

      {/* Barra de capacidad */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span className="form-label" style={{ margin: 0 }}>Ocupación del vehículo</span>
          <span style={{ fontWeight: 700, color: porcentaje >= 75 ? '#EF4444' : '#059669' }}>
            {asientosOcupados}/{capacidadTotal} asientos
          </span>
        </div>
        <div style={{ height: '12px', background: '#E5E7EB', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${porcentaje}%`,
            background: porcentaje >= 75 ? '#EF4444' : '#FFD500',
            borderRadius: '6px',
            transition: 'width 0.4s ease',
          }} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', justifyContent: 'center' }}>
          {Array.from({ length: capacidadTotal }).map((_, i) => (
            <div key={i} style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: i < asientosOcupados ? '#FFD500' : '#F3F4F6',
              border: `2px solid ${i < asientosOcupados ? '#E6C000' : '#E5E7EB'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
            }}>
              {i < asientosOcupados ? '👤' : ''}
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Pasajeros a bordo</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {pasajeros.map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
              <span style={{ fontWeight: 500 }}>👤 {p.nombre}</span>
              <span style={{ fontSize: '0.8rem', color: '#6C757D' }}>→ {p.destino}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Asientos disponibles para nuevas solicitudes</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: disponibles > 0 ? '#D1FAE5' : '#FEE2E2', borderRadius: '8px' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: disponibles > 0 ? '#059669' : '#DC2626' }}>
            {disponibles}
          </span>
          <span style={{ color: disponibles > 0 ? '#065F46' : '#991B1B', fontWeight: 500 }}>
            {disponibles > 0 ? `${disponibles} asiento${disponibles > 1 ? 's' : ''} disponible${disponibles > 1 ? 's' : ''}` : 'Taxi lleno — no se aceptan más solicitudes'}
          </span>
        </div>
      </div>

      <div className="button-group">
        <button className="btn btn-secondary" onClick={() => setAsientosOcupados(Math.max(0, asientosOcupados - 1))}>
          − Liberar asiento
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setAsientosOcupados(Math.min(capacidadTotal, asientosOcupados + 1))}
          disabled={asientosOcupados >= capacidadTotal}
          style={{ opacity: asientosOcupados >= capacidadTotal ? 0.5 : 1 }}
        >
          + Agregar pasajero
        </button>
      </div>
    </div>
  );
}
