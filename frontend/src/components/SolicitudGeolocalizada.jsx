import React, { useState } from 'react';

export default function SolicitudGeolocalizada() {
  const [tipoServicio, setTipoServicio] = useState('Compartido');

  return (
    <div className="card">
      <h2 className="card-title">Solicitar Taxi (RF-3)</h2>
      
      <div className="form-group">
        <label className="form-label">ID de pasajero</label>
        <input type="text" className="form-control" value="Ej. USR-00342" disabled />
      </div>

      <div className="form-group" style={{display: 'flex', gap: '1rem'}}>
        <div style={{flex: 1}}>
          <label className="form-label">Latitud actual</label>
          <input type="text" className="form-control" value="Lat: -2.1900" disabled />
        </div>
        <div style={{flex: 1}}>
          <label className="form-label">Longitud actual</label>
          <input type="text" className="form-control" value="Lng: -79.8857" disabled />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Destino</label>
        <input type="text" className="form-control" placeholder="Av. 9 de Octubre y Malecón Simón Bolívar" />
      </div>

      <div className="form-group">
        <span className="form-label">Tipo de servicio</span>
        <div className="radio-group">
          <label className="radio-label">
            <input type="radio" checked={tipoServicio === 'Compartido'} onChange={() => setTipoServicio('Compartido')} />
            Compartido
          </label>
          <label className="radio-label">
            <input type="radio" checked={tipoServicio === 'Exclusivo'} onChange={() => setTipoServicio('Exclusivo')} />
            Exclusivo
          </label>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Fecha y hora</label>
        <input type="datetime-local" className="form-control" />
      </div>

      <div className="form-group">
        <label className="form-label">Estado de solicitud</label>
        <span style={{background: '#FEF3C7', color: '#D97706', padding: '4px 12px', borderRadius: '16px', fontSize: '0.875rem', fontWeight: 600}}>
          En espera
        </span>
      </div>

      <div className="button-group">
        <button className="btn btn-secondary">Cancelar</button>
        <button className="btn btn-primary">Enviar Solicitud</button>
      </div>
    </div>
  );
}
