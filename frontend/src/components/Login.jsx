import { useState } from 'react';
import { FaEnvelope, FaLock, FaTimes, FaUserAlt, FaCarSide, FaUserShield } from 'react-icons/fa';

export default function Login({ onLogin, onClose }) {
  const [role, setRole] = useState('Pasajero');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        
        <h2 className="modal-title">Bienvenido de nuevo</h2>
        <p className="modal-subtitle">Inicia sesión para continuar en TaxiEc.</p>

        <div className="form-group">
          <label className="form-label">¿Cómo deseas ingresar?</label>
          <div className="role-selector">
            <button className={`role-btn ${role === 'Pasajero' ? 'selected' : ''}`} onClick={() => setRole('Pasajero')}>
              <FaUserAlt style={{fontSize: '1.2rem', marginBottom: '0.4rem'}} />
              <div>Pasajero</div>
            </button>
            <button className={`role-btn ${role === 'Conductor' ? 'selected' : ''}`} onClick={() => setRole('Conductor')}>
              <FaCarSide style={{fontSize: '1.2rem', marginBottom: '0.4rem'}} />
              <div>Conductor</div>
            </button>
            <button className={`role-btn ${role === 'Admin' ? 'selected' : ''}`} onClick={() => setRole('Admin')}>
              <FaUserShield style={{fontSize: '1.2rem', marginBottom: '0.4rem'}} />
              <div>Admin</div>
            </button>
          </div>
        </div>

        <div className="divider-text">Tus credenciales</div>

        <div className="form-group">
          <label className="form-label">Correo electrónico</label>
          <div className="form-input-icon">
            <FaEnvelope className="icon" />
            <input type="email" className="form-input" placeholder="tu@correo.com" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Contraseña <a href="#" className="forgot-link">¿Olvidaste?</a></label>
          <div className="form-input-icon">
            <FaLock className="icon" />
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>
        </div>

        <button className="btn btn-full btn-full-yellow" style={{marginTop: '1.5rem'}} onClick={() => onLogin(role)}>
          Ingresar al Sistema
        </button>
      </div>
    </div>
  );
}
