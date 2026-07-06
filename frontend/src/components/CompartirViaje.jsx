import React, { useState } from 'react';

export default function CompartirViaje() {
  const [copiado, setCopiado] = useState(false);
  const codigoViaje = 'TXC-20260706-A3F9';

  const copiarCodigo = () => {
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="card">
      <h2 className="card-title">Compartir Viaje (RF-6)</h2>

      <div style={{ background: '#F3F4F6', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', color: '#6C757D', marginBottom: '0.25rem' }}>Código de seguimiento</p>
        <p style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '4px', color: '#1F1F1F' }}>{codigoViaje}</p>
      </div>

      <div className="form-group">
        <label className="form-label">Compartir con</label>
        <input type="text" className="form-control" placeholder="Nombre o teléfono del contacto" />
      </div>

      <div className="form-group">
        <label className="form-label">Método de compartición</label>
        <select className="form-control">
          <option>WhatsApp</option>
          <option>SMS</option>
          <option>Correo electrónico</option>
          <option>Copiar enlace</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Enlace de seguimiento en vivo</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            className="form-control"
            value={`taxiapp.ec/seguir/${codigoViaje}`}
            disabled
            style={{ flex: 1 }}
          />
          <button
            className="btn btn-primary"
            style={{ width: 'auto', padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}
            onClick={copiarCodigo}
          >
            {copiado ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Estado del viaje compartido</label>
        <span style={{ background: '#D1FAE5', color: '#065F46', padding: '4px 12px', borderRadius: '16px', fontSize: '0.875rem', fontWeight: 600 }}>
          En ruta · ETA 8 min
        </span>
      </div>

      <div className="button-group">
        <button className="btn btn-secondary">Dejar de compartir</button>
        <button className="btn btn-primary">Enviar ahora</button>
      </div>
    </div>
  );
}
