import React, { useState } from 'react';

export default function Disponibilidad() {
  const [zona, setZona] = useState('Centro de Guayaquil');

  return (
    <div className="card">
      <h2 className="card-title">Monitor de Conductores Activos (RF-4)</h2>
      
      <div className="form-group">
        <label className="form-label">Zona de búsqueda</label>
        <select className="form-control" value={zona} onChange={(e) => setZona(e.target.value)}>
          <option>Centro de Guayaquil</option>
          <option>Urdesa</option>
          <option>Vía a la Costa</option>
          <option>Sur de Guayaquil</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Radio de cobertura (km)</label>
        <input type="number" className="form-control" defaultValue={5} />
      </div>

      <div className="form-group">
        <span className="form-label">Filtrar por estado</span>
        <div style={{display: 'flex', gap: '1rem', marginTop: '0.5rem'}}>
          <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem'}}>
            <input type="checkbox" defaultChecked /> Disponible
          </label>
          <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem'}}>
            <input type="checkbox" defaultChecked /> En ruta
          </label>
          <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem'}}>
            <input type="checkbox" /> Fuera de servicio
          </label>
        </div>
      </div>

      <div className="form-group" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <label className="form-label" style={{margin: 0}}>Conductores hallados</label>
        <span style={{background: '#D1FAE5', color: '#065F46', padding: '4px 12px', borderRadius: '16px', fontSize: '0.875rem', fontWeight: 600}}>
          8 activos cerca
        </span>
      </div>

      <div className="form-group">
        <label className="form-label">Última actualización</label>
        <input type="text" className="form-control" value="Hace 12 segundos" disabled />
      </div>

      <div className="button-group">
        <button className="btn btn-secondary">Limpiar filtros</button>
        <button className="btn btn-primary" style={{backgroundColor: '#1F2937', color: '#fff'}}>Actualizar Mapa</button>
      </div>
    </div>
  );
}
