import { useState } from 'react';

export default function Register() {
  const [role, setRole] = useState('Pasajero');

  return (
    <div className="card">
      <h2 className="card-title">Registro Multicanal</h2>
      
      <div className="form-group">
        <span className="form-label">Tipo de usuario</span>
        <div className="radio-group">
          <label className="radio-label">
            <input type="radio" name="role" checked={role === 'Pasajero'} onChange={() => setRole('Pasajero')} />
            Pasajero
          </label>
          <label className="radio-label">
            <input type="radio" name="role" checked={role === 'Conductor'} onChange={() => setRole('Conductor')} />
            Conductor
          </label>
          <label className="radio-label">
            <input type="radio" name="role" checked={role === 'Administrador'} onChange={() => setRole('Administrador')} />
            Administrador
          </label>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Tipo de registro</label>
        <select className="form-control">
          <option>Número telefónico</option>
          <option>Correo electrónico</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Nombre completo</label>
        <input type="text" className="form-control" placeholder="Ej. Juan Pérez" />
      </div>

      <div className="form-group">
        <label className="form-label">Correo / Teléfono</label>
        <input type="text" className="form-control" placeholder="juan@correo.com / 0991234567" />
      </div>

      <div className="form-group">
        <label className="form-label">Contraseña</label>
        <input type="password" className="form-control" placeholder="Mín. 6 caracteres" />
      </div>

      <div className="form-group">
        <label className="form-label">Estado de verificación</label>
        <input type="text" className="form-control" value="Pendiente validación" disabled />
      </div>

      <div className="button-group">
        <button className="btn btn-secondary">Cancelar</button>
        <button className="btn btn-primary">Registrar Usuario</button>
      </div>
    </div>
  );
}
