import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserPanel from './components/UserPanel';
import SolicitudGeolocalizada from './components/SolicitudGeolocalizada';
import Disponibilidad from './components/Disponibilidad';
import PerfilTransparencia from './components/PerfilTransparencia';
import Calificacion from './components/Calificacion';
import Notificaciones from './components/Notificaciones';
import CancelacionServicio from './components/CancelacionServicio';
import SeguimientoTiempoReal from './components/SeguimientoTiempoReal';
import Pago from './components/Pago';
import UbicacionesFavoritas from './components/UbicacionesFavoritas';
import HistorialPasajero from './components/HistorialPasajero';
import GestionSolicitudes from './components/GestionSolicitudes';
import ZonasPreferenciales from './components/ZonasPreferenciales';
import HistorialConductor from './components/HistorialConductor';
import GestionUsuarios from './components/GestionUsuarios';
import GestionFlota from './components/GestionFlota';
import ControlCapacidad from './components/ControlCapacidad';
import GestionIncidentes from './components/GestionIncidentes';
import Reportes from './components/Reportes';
import Configuracion from './components/Configuracion';
import {
  FaCarSide, FaSignOutAlt, FaMapMarkedAlt, FaSearchLocation, FaRoute,
  FaUserTie, FaCreditCard, FaStar, FaBell, FaClipboardList, FaMapSigns,
  FaHistory, FaUsersCog, FaCar, FaExclamationTriangle, FaChartBar, FaCog,
  FaUserCircle, FaTimesCircle, FaLocationArrow, FaMapMarkerAlt, FaShieldAlt
} from 'react-icons/fa';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('rf3');
  const [showModal, setShowModal] = useState(null);
  const [userRole, setUserRole] = useState('Pasajero');
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserPanel, setShowUserPanel] = useState(false);

  const handleLogin = (role, userData) => {
    setUserRole(role);
    setCurrentUser(userData || { nombres: role, apellidos: '', correo: '', telefono: '' });
    setIsAuthenticated(true);
    setShowModal(null);
    if (role === 'Pasajero') setActiveTab('rf3');
    else if (role === 'Conductor') setActiveTab('rf8');
    else if (role === 'Admin') setActiveTab('admin-usuarios');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('rf3');
    setShowUserPanel(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Home onNavigate={setShowModal} />
        {showModal === 'login' && (
          <Login
            onLogin={handleLogin}
            onClose={() => setShowModal(null)}
            onSwitchToRegister={() => setShowModal('register')}
          />
        )}
        {showModal === 'register' && (
          <Register
            onClose={() => setShowModal(null)}
            onSwitchToLogin={() => setShowModal('login')}
          />
        )}
      </>
    );
  }

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon"><FaCarSide /></div>
          Taxi<span>Ec</span>
        </div>

        {/* ── MENÚ PASAJERO ── */}
        {userRole === 'Pasajero' && (
          <>
            <div className="sidebar-section-label">Modo Pasajero</div>
            <button className={`sidebar-btn ${activeTab === 'rf3' ? 'active' : ''}`} onClick={() => setActiveTab('rf3')}>
              <div className="sidebar-btn-icon"><FaMapMarkedAlt/></div> Solicitar Viaje
            </button>
            <button className={`sidebar-btn ${activeTab === 'rf4' ? 'active' : ''}`} onClick={() => setActiveTab('rf4')}>
              <div className="sidebar-btn-icon"><FaSearchLocation/></div> Disponibilidad
            </button>
            <button className={`sidebar-btn ${activeTab === 'rf7' ? 'active' : ''}`} onClick={() => setActiveTab('rf7')}>
              <div className="sidebar-btn-icon"><FaUserTie/></div> Perfil Conductor
            </button>
            <button className={`sidebar-btn ${activeTab === 'rf9' ? 'active' : ''}`} onClick={() => setActiveTab('rf9')}>
              <div className="sidebar-btn-icon"><FaStar/></div> Calificación
            </button>
            <button className={`sidebar-btn ${activeTab === 'rf10' ? 'active' : ''}`} onClick={() => setActiveTab('rf10')}>
              <div className="sidebar-btn-icon"><FaBell/></div> Notificaciones
            </button>
            <button className={`sidebar-btn ${activeTab === 'rf11' ? 'active' : ''}`} onClick={() => setActiveTab('rf11')}>
              <div className="sidebar-btn-icon"><FaTimesCircle/></div> Cancelar Viaje
            </button>
            <button className={`sidebar-btn ${activeTab === 'rf12' ? 'active' : ''}`} onClick={() => setActiveTab('rf12')}>
              <div className="sidebar-btn-icon"><FaLocationArrow/></div> Seguimiento
            </button>
            <button className={`sidebar-btn ${activeTab === 'rf13' ? 'active' : ''}`} onClick={() => setActiveTab('rf13')}>
              <div className="sidebar-btn-icon"><FaCreditCard/></div> Pagos
            </button>
            <button className={`sidebar-btn ${activeTab === 'rf14' ? 'active' : ''}`} onClick={() => setActiveTab('rf14')}>
              <div className="sidebar-btn-icon"><FaMapMarkerAlt/></div> Ubicaciones Favoritas
            </button>
            <button className={`sidebar-btn ${activeTab === 'rf16p' ? 'active' : ''}`} onClick={() => setActiveTab('rf16p')}>
              <div className="sidebar-btn-icon"><FaHistory/></div> Historial
            </button>
          </>
        )}

        {/* ── MENÚ CONDUCTOR ── */}
        {userRole === 'Conductor' && (
          <>
            <div className="sidebar-section-label">Modo Conductor</div>
            <button className={`sidebar-btn ${activeTab === 'rf8' ? 'active' : ''}`} onClick={() => setActiveTab('rf8')}>
              <div className="sidebar-btn-icon"><FaClipboardList/></div> Solicitudes
            </button>
            <button className={`sidebar-btn ${activeTab === 'rf15' ? 'active' : ''}`} onClick={() => setActiveTab('rf15')}>
              <div className="sidebar-btn-icon"><FaMapSigns/></div> Zonas Preferenciales
            </button>
            <button className={`sidebar-btn ${activeTab === 'rf16c' ? 'active' : ''}`} onClick={() => setActiveTab('rf16c')}>
              <div className="sidebar-btn-icon"><FaHistory/></div> Historial
            </button>
          </>
        )}

        {/* ── MENÚ ADMIN ── */}
        {userRole === 'Admin' && (
          <>
            <div className="sidebar-section-label">Panel Admin</div>
            <button className={`sidebar-btn ${activeTab === 'admin-usuarios' ? 'active' : ''}`} onClick={() => setActiveTab('admin-usuarios')}>
              <div className="sidebar-btn-icon"><FaUsersCog/></div> Usuarios
            </button>
            <button className={`sidebar-btn ${activeTab === 'admin-flota' ? 'active' : ''}`} onClick={() => setActiveTab('admin-flota')}>
              <div className="sidebar-btn-icon"><FaCar/></div> Flota
            </button>
            <button className={`sidebar-btn ${activeTab === 'admin-capacidad' ? 'active' : ''}`} onClick={() => setActiveTab('admin-capacidad')}>
              <div className="sidebar-btn-icon"><FaRoute/></div> Control Capacidad
            </button>
            <button className={`sidebar-btn ${activeTab === 'admin-incidentes' ? 'active' : ''}`} onClick={() => setActiveTab('admin-incidentes')}>
              <div className="sidebar-btn-icon"><FaExclamationTriangle/></div> Incidentes
            </button>
            <button className={`sidebar-btn ${activeTab === 'admin-reportes' ? 'active' : ''}`} onClick={() => setActiveTab('admin-reportes')}>
              <div className="sidebar-btn-icon"><FaChartBar/></div> Reportes
            </button>
            <button className={`sidebar-btn ${activeTab === 'admin-config' ? 'active' : ''}`} onClick={() => setActiveTab('admin-config')}>
              <div className="sidebar-btn-icon"><FaCog/></div> Configuración
            </button>
          </>
        )}

        <div className="sidebar-footer">
          <button
            className="sidebar-user-btn"
            onClick={() => setShowUserPanel(!showUserPanel)}
            title="Ver mi perfil"
          >
            <div className="sidebar-user-avatar"><FaUserCircle /></div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{currentUser?.nombres || userRole}</div>
              <div className="sidebar-user-role">{userRole}</div>
            </div>
          </button>
          <button className="sidebar-logout-btn" onClick={handleLogout} title="Cerrar sesión">
            <FaSignOutAlt />
          </button>
        </div>
      </aside>

      <main className={`dashboard-main ${showUserPanel ? 'panel-open' : ''}`}>
        {/* ── VISTAS PASAJERO ── */}
        {activeTab === 'rf3'  && <SolicitudGeolocalizada />}
        {activeTab === 'rf4'  && <Disponibilidad />}
        {activeTab === 'rf7'  && <PerfilTransparencia />}
        {activeTab === 'rf9'  && <Calificacion />}
        {activeTab === 'rf10' && <Notificaciones />}
        {activeTab === 'rf11' && <CancelacionServicio />}
        {activeTab === 'rf12' && <SeguimientoTiempoReal />}
        {activeTab === 'rf13' && <Pago />}
        {activeTab === 'rf14' && <UbicacionesFavoritas />}
        {activeTab === 'rf16p'&& <HistorialPasajero />}

        {/* ── VISTAS CONDUCTOR ── */}
        {activeTab === 'rf8'  && <GestionSolicitudes />}
        {activeTab === 'rf15' && <ZonasPreferenciales />}
        {activeTab === 'rf16c'&& <HistorialConductor />}

        {/* ── VISTAS ADMIN ── */}
        {activeTab === 'admin-usuarios'  && <GestionUsuarios />}
        {activeTab === 'admin-flota'     && <GestionFlota />}
        {activeTab === 'admin-capacidad' && <ControlCapacidad />}
        {activeTab === 'admin-incidentes'&& <GestionIncidentes />}
        {activeTab === 'admin-reportes'  && <Reportes />}
        {activeTab === 'admin-config'    && <Configuracion />}
      </main>

      {showUserPanel && (
        <UserPanel
          user={currentUser}
          role={userRole}
          onClose={() => setShowUserPanel(false)}
        />
      )}
    </div>
  );
}

export default App;
