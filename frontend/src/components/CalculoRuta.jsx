import React from 'react';

export default function CalculoRuta() {
  return (
    <div className="card">
      <h2 className="card-title">Cálculo de Ruta y Costo (RF-5)</h2>
      
      <div className="form-group">
        <label className="form-label">Origen</label>
        <input type="text" className="form-control" defaultValue="Calle Pichincha y Av. 9 de Octubre" />
      </div>

      <div className="form-group">
        <label className="form-label">Destino final</label>
        <input type="text" className="form-control" defaultValue="Malecón Simón Bolívar y Calle Aguirre" />
      </div>

      <div className="form-group">
        <label className="form-label">Paradas intermedias</label>
        <input type="text" className="form-control" defaultValue="Av. Olmedo y Clemente Ballén, Parque Centenario" />
      </div>

      <div className="form-group">
        <label className="form-label">Servicio de mapas</label>
        <select className="form-control">
          <option>Google Maps API</option>
          <option>Mapbox</option>
          <option>OpenStreetMap</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Distancia estimada</label>
        <input type="text" className="form-control" value="4.2 km" disabled />
      </div>

      <div className="form-group">
        <label className="form-label" style={{color: '#D97706', fontWeight: 'bold'}}>Costo aproximado</label>
        <input 
          type="text" 
          className="form-control" 
          value="$ 2.50 USD" 
          disabled 
          style={{backgroundColor: '#FEF3C7', color: '#B45309', fontWeight: 'bold', border: '1px solid #FDE68A'}}
        />
      </div>

      <div className="button-group">
        <button className="btn btn-primary" style={{marginTop: '1rem'}}>Confirmar Ruta</button>
      </div>
    </div>
  );
}
