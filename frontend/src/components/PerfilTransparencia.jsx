import React from 'react';

export default function PerfilTransparencia() {
  return (
    <div className="card">
      <h2 className="card-title">Perfil de Transparencia (RF-7)</h2>
      
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', padding: '1rem', backgroundColor: '#F3F4F6', borderRadius: '8px'}}>
        <div style={{width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#FFD500', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.2rem'}}>
          MP
        </div>
        <div>
          <h3 style={{margin: 0, fontSize: '1.1rem', color: '#1F2937'}}>Manuel Pauta</h3>
          <p style={{margin: 0, fontSize: '0.85rem', color: '#059669'}}>✓ Conductor verificado</p>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Placa del vehículo</label>
        <input type="text" className="form-control" value="GBT-0234" disabled style={{backgroundColor: '#374151', color: 'white'}} />
      </div>

      <div className="form-group">
        <label className="form-label">Modelo / Color</label>
        <input type="text" className="form-control" value="Chevrolet Aveo - Blanco" disabled style={{backgroundColor: '#374151', color: 'white'}} />
      </div>

      <div className="form-group">
        <label className="form-label">Ruta asignada</label>
        <input type="text" className="form-control" value="Av. Pedro Carbo y Sucre → Malecón y Av. Olmedo" disabled style={{backgroundColor: '#374151', color: 'white'}} />
      </div>

      <div className="form-group">
        <label className="form-label">Calificación promedio</label>
        <div className="form-control" style={{backgroundColor: '#FEF3C7', color: '#B45309', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <span>4.8 / 5.0</span>
          <span>★★★★★</span>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Viajes completados</label>
        <input type="text" className="form-control" value="1,247 viajes" disabled style={{backgroundColor: '#374151', color: 'white'}} />
      </div>
      
      <div className="form-group" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <label className="form-label" style={{margin: 0}}>Estado actual</label>
        <span style={{background: '#1F2937', color: '#F9FAFB', padding: '4px 12px', borderRadius: '16px', fontSize: '0.875rem', fontWeight: 600}}>
          En camino hacia ti
        </span>
      </div>

      <div className="button-group">
        <button className="btn btn-secondary" style={{color: '#DC2626'}}>Reportar problema</button>
        <button className="btn btn-primary" style={{backgroundColor: '#1F2937', color: '#fff'}}>Confirmar Viaje</button>
      </div>
    </div>
  );
}
