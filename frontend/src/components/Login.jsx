import { useState } from 'react';

export default function Login({ onLogin }) {
  const [role, setRole] = useState('Pasajero');

  return (
    <div className="card">
      <h2 className="card-title">Autenticación Segura</h2>
      
      <div className="form-group">
        <span className="form-label">Tipo de acceso</span>
        <div className="radio-group">
          <label className="radio-label">
            <input type="radio" name="loginRole" checked={role === 'Pasajero'} onChange={() => setRole('Pasajero')} />
            Pasajero
          </label>
          <label className="radio-label">
            <input type="radio" name="loginRole" checked={role === 'Conductor'} onChange={() => setRole('Conductor')} />
            Conductor
          </label>
          <label className="radio-label">
            <input type="radio" name="loginRole" checked={role === 'Administrador'} onChange={() => setRole('Administrador')} />
            Administrador
          </label>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Correo / Teléfono</label>
        <input type="text" className="form-control" placeholder="usuario@correo.com" />
      </div>

      <div className="form-group">
        <label className="form-label">Contraseña</label>
        <input type="password" className="form-control" placeholder="••••••••" />
      </div>

      <div className="form-group">
        <label className="form-label">Token de sesión</label>
        <input type="text" className="form-control" value="Generado automáticamente" disabled />
      </div>

      <div className="form-group">
        <label className="form-label">Estado de sesión</label>
        <input type="text" className="form-control" value="Inactiva" disabled />
      </div>

      <div className="button-group">
        <button className="btn btn-secondary">Restablecer</button>
        <button className="btn btn-primary" onClick={onLogin}>Ingresar al Sistema</button>
      </div>
    </div>
  );
}
