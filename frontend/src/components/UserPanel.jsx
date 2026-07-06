import { FaUserCircle, FaEnvelope, FaPhone, FaCarSide, FaUserTie, FaUserShield, FaShieldAlt, FaCalendarAlt, FaTimes } from 'react-icons/fa';

const ROLE_CONFIG = {
  Pasajero:  { icon: <FaUserTie />,   color: '#f59e0b', label: 'Pasajero'  },
  Conductor: { icon: <FaCarSide />,   color: '#3b82f6', label: 'Conductor' },
  Admin:     { icon: <FaUserShield />, color: '#8b5cf6', label: 'Admin'     },
};

export default function UserPanel({ user, role, onClose }) {
  const cfg = ROLE_CONFIG[role] || ROLE_CONFIG['Pasajero'];
  const joinDate = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <aside className="user-panel">
      {/* Header del panel */}
      <div className="user-panel-header">
        <button className="user-panel-close" onClick={onClose}><FaTimes /></button>
        <div className="user-panel-avatar">
          <FaUserCircle />
        </div>
        <h3 className="user-panel-name">{user?.nombres || 'Usuario'} {user?.apellidos || ''}</h3>
        <div className="user-panel-badge" style={{ background: cfg.color }}>
          {cfg.icon} {cfg.label}
        </div>
      </div>

      {/* Info del usuario */}
      <div className="user-panel-body">
        <div className="user-panel-section-title">Información de cuenta</div>

        <div className="user-panel-item">
          <FaEnvelope className="user-panel-item-icon" />
          <div>
            <div className="user-panel-item-label">Correo</div>
            <div className="user-panel-item-value">{user?.correo || 'usuario@correo.com'}</div>
          </div>
        </div>

        <div className="user-panel-item">
          <FaPhone className="user-panel-item-icon" />
          <div>
            <div className="user-panel-item-label">Teléfono</div>
            <div className="user-panel-item-value">{user?.telefono || 'No registrado'}</div>
          </div>
        </div>

        <div className="user-panel-item">
          <FaCalendarAlt className="user-panel-item-icon" />
          <div>
            <div className="user-panel-item-label">Miembro desde</div>
            <div className="user-panel-item-value">{joinDate}</div>
          </div>
        </div>

        <div className="user-panel-item">
          <FaShieldAlt className="user-panel-item-icon" />
          <div>
            <div className="user-panel-item-label">Estado de cuenta</div>
            <div className="user-panel-item-value" style={{ color: '#22c55e', fontWeight: 600 }}>● Activo</div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="user-panel-section-title" style={{ marginTop: '1.5rem' }}>Estadísticas</div>
        <div className="user-panel-stats">
          <div className="user-panel-stat">
            <div className="user-panel-stat-value">0</div>
            <div className="user-panel-stat-label">{role === 'Conductor' ? 'Viajes realizados' : 'Viajes tomados'}</div>
          </div>
          <div className="user-panel-stat">
            <div className="user-panel-stat-value">5.0</div>
            <div className="user-panel-stat-label">Calificación</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
