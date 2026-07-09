import { useState } from 'react';
import { FaUserAlt, FaEnvelope, FaLock, FaIdCard, FaTimes, FaPhone, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const API_URL = 'http://localhost:8000';

export default function Register({ onClose, onSwitchToLogin }) {
  const [role, setRole] = useState('Pasajero');
  const [form, setForm] = useState({
    nombres: '', apellidos: '', correo: '', telefono: '',
    contrasena: '', confirmar: '', licencia: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    // Validaciones locales
    if (!form.nombres || !form.apellidos || !form.correo || !form.contrasena) {
      return setError('Por favor completa todos los campos obligatorios.');
    }
    if (form.contrasena !== form.confirmar) {
      return setError('Las contraseñas no coinciden.');
    }
    if (form.contrasena.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres.');
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/usuarios/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombres: form.nombres,
          apellidos: form.apellidos,
          correo: form.correo,
          telefono: form.telefono,
          contrasena: form.contrasena,
          rol: role === 'Pasajero' ? 'CLIENTE' : 'CONDUCTOR',
          idioma: 'ES'
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Error al registrar el usuario.');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        if (onSwitchToLogin) onSwitchToLogin();
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={e => e.stopPropagation()} style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <FaCheckCircle style={{ fontSize: '3rem', color: 'var(--yellow-400)', marginBottom: '1rem' }} />
          <h2 className="modal-title">¡Registro exitoso!</h2>
          <p className="modal-subtitle">Tu cuenta fue creada. Redirigiendo al inicio de sesión...</p>
        </div>
      </div>
    );
  }

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

        {/* Nombre y apellido en fila */}
        <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label className="form-label">Nombre *</label>
            <div className="form-input-icon">
              <FaUserAlt className="icon" />
              <input name="nombres" type="text" className="form-input" placeholder="Juan" value={form.nombres} onChange={handleChange} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label className="form-label">Apellido *</label>
            <div className="form-input-icon">
              <FaUserAlt className="icon" />
              <input name="apellidos" type="text" className="form-input" placeholder="Pérez" value={form.apellidos} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Correo electrónico *</label>
          <div className="form-input-icon">
            <FaEnvelope className="icon" />
            <input name="correo" type="email" className="form-input" placeholder="tu@correo.com" value={form.correo} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Teléfono</label>
          <div className="form-input-icon">
            <FaPhone className="icon" />
            <input name="telefono" type="tel" className="form-input" placeholder="+593 99 000 0000" value={form.telefono} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label className="form-label">Contraseña *</label>
            <div className="form-input-icon">
              <FaLock className="icon" />
              <input name="contrasena" type="password" className="form-input" placeholder="••••••••" value={form.contrasena} onChange={handleChange} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label className="form-label">Confirmar *</label>
            <div className="form-input-icon">
              <FaLock className="icon" />
              <input name="confirmar" type="password" className="form-input" placeholder="••••••••" value={form.confirmar} onChange={handleChange} />
            </div>
          </div>
        </div>

        {role === 'Conductor' && (
          <div className="form-group">
            <label className="form-label">Número de Licencia</label>
            <div className="form-input-icon">
              <FaIdCard className="icon" />
              <input name="licencia" type="text" className="form-input" placeholder="Ej. 0912345678" value={form.licencia} onChange={handleChange} />
            </div>
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid var(--danger)', borderRadius: '8px', padding: '0.75rem 1rem', color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            {error}
          </div>
        )}

        <button
          className="btn btn-full btn-full-yellow"
          style={{ marginTop: '1rem' }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <><FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '0.5rem' }} /> Registrando...</> : `Registrar como ${role}`}
        </button>

        <p style={{ fontSize: '0.82rem', color: 'var(--gray-500)', textAlign: 'center', marginTop: '1rem' }}>
          ¿Ya tienes cuenta?{' '}
          <button onClick={onSwitchToLogin} style={{ background: 'none', border: 'none', color: 'var(--yellow-400)', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
}
