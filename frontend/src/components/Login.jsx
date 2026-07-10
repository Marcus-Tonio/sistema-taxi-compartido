import { useState } from 'react';
import { FaEnvelope, FaLock, FaTimes, FaSpinner } from 'react-icons/fa';

export default function Login({ onLogin, onClose }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleIngresar = async () => {
    if (!correo || !contrasena) {
      return setError('Ingresa tu correo y contraseña.');
    }
    
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasena })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.detail || 'Error de inicio de sesión');
      }

      // Mapear el rol de la BD al rol del Frontend
      let rolFrontend = 'Pasajero';
      if (data.usuario.rol === 'CONDUCTOR') rolFrontend = 'Conductor';
      if (data.usuario.rol === 'ADMIN') rolFrontend = 'Admin';

      onLogin(rolFrontend, data.usuario);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        
        <h2 className="modal-title">Bienvenido de nuevo</h2>
        <p className="modal-subtitle">Inicia sesión con tu correo registrado.</p>

        <div className="form-group">
          <label className="form-label">Correo electrónico</label>
          <div className="form-input-icon">
            <FaEnvelope className="icon" />
            <input 
              type="email" 
              className="form-input" 
              placeholder="tu@correo.com" 
              value={correo}
              onChange={e => setCorreo(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Contraseña <a href="#" className="forgot-link">¿Olvidaste?</a></label>
          <div className="form-input-icon">
            <FaLock className="icon" />
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={contrasena}
              onChange={e => setContrasena(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid var(--danger)', borderRadius: '8px', padding: '0.75rem 1rem', color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            {error}
          </div>
        )}

        <button 
          className="btn btn-full btn-full-yellow" 
          style={{marginTop: '1.5rem'}} 
          onClick={handleIngresar}
          disabled={loading}
        >
          {loading ? <><FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '0.5rem' }} /> Iniciando...</> : 'Ingresar al Sistema'}
        </button>
      </div>
    </div>
  );
}
