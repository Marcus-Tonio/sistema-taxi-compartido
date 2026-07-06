import { useState } from 'react';
import { FaUserAlt, FaEnvelope, FaLock, FaIdCard, FaTimes, FaCarSide } from 'react-icons/fa';

export default function Register({ onClose }) {
  const [role, setRole] = useState('Pasajero');
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        
        <h2 className="modal-title">Crea tu cuenta</h2>
        <p className="modal-subtitle">Únete a la comunidad de TaxiEc hoy mismo.</p>

        <div className="modal-tabs">
          <button className={`modal-tab ${role === 'Pasajero' ? 'active' : ''}`} onClick={() => setRole('Pasajero')}>
            Pasajero
          </button>
          <button className={`modal-tab ${role === 'Conductor' ? 'active' : ''}`} onClick={() => setRole('Conductor')}>
            Conductor
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Nombre completo</label>
          <div className="form-input-icon">
            <FaUserAlt className="icon" />
            <input type="text" className="form-input" placeholder="Ej. Juan Pérez" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Correo electrónico</label>
          <div className="form-input-icon">
            <FaEnvelope className="icon" />
            <input type="email" className="form-input" placeholder="tu@correo.com" />
          </div>
        </div>

        <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label className="form-label">Contraseña</label>
            <div className="form-input-icon">
              <FaLock className="icon" />
              <input type="password" className="form-input" placeholder="••••••••" />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label className="form-label">Confirmar</label>
            <div className="form-input-icon">
              <FaLock className="icon" />
              <input type="password" className="form-input" placeholder="••••••••" />
            </div>
          </div>
        </div>

        {role === 'Conductor' && (
          <div className="form-group">
            <label className="form-label">Número de Licencia</label>
            <div className="form-input-icon">
              <FaIdCard className="icon" />
              <input type="text" className="form-input" placeholder="Ej. 0912345678" />
            </div>
          </div>
        )}

        <button className="btn btn-full btn-full-yellow" style={{marginTop: '1.5rem'}}>
          Registrar {role}
        </button>
        
        <p style={{fontSize: '0.8rem', color: 'var(--gray-500)', textAlign: 'center', marginTop: '1rem'}}>
          Al registrarte aceptas nuestros <a href="#" style={{color: 'var(--yellow-400)'}}>términos y condiciones</a>.
        </p>
      </div>
    </div>
  );
}
