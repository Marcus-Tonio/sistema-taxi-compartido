import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserPanel from './components/UserPanel';
import SolicitudGeolocalizada from './components/SolicitudGeolocalizada';
import Disponibilidad from './components/Disponibilidad';
import CalculoRuta from './components/CalculoRuta';
import PerfilTransparencia from './components/PerfilTransparencia';
import CompartirViaje from './components/CompartirViaje';
import Pago from './components/Pago';
import Calificacion from './components/Calificacion';
import Notificaciones from './components/Notificaciones';
import GestionSolicitudes from './components/GestionSolicitudes';
import ControlCapacidad from './components/ControlCapacidad';
import ZonasPreferenciales from './components/ZonasPreferenciales';
import HistorialConductor from './components/HistorialConductor';
import GestionUsuarios from './components/GestionUsuarios';
import GestionFlota from './components/GestionFlota';
import GestionLocalidades from './components/GestionLocalidades';
import GestionIncidentes from './components/GestionIncidentes';
import Reportes from './components/Reportes';
import Configuracion from './components/Configuracion';
import {
  FaCarSide, FaSignOutAlt, FaMapMarkedAlt, FaSearchLocation, FaRoute, FaShareAlt,
  FaUserTie, FaCreditCard, FaStar, FaBell, FaClipboardList, FaUsers, FaMapSigns,
  FaHistory, FaUsersCog, FaCar, FaMapPin, FaExclamationTriangle, FaChartBar, FaCog,
  FaUserCircle
} from 'react-icons/fa';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('rf3');
  const [showModal, setShowModal] = useState(null); // 'login' | 'register' | null
  const [userRole, setUserRole] = useState('Pasajero');
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserPanel, setShowUserPanel] = useState(false);

  const handleLogin = (role, userData) => {
    setUserRole(role);
    setCurrentUser(userData || { nombres: role, apellidos: '', correo: '', telefono: '' });
    setIsAuthenticated(true);
    setShowModal(null);
    if (role === 'Pasajero') setActiveTab('rf3');
    else if (role === 'Conductor') setActiveTab('rf11');
    else if (role === 'Admin') setActiveTab('rf15');
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
      {/* Sidebar de navegación */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon"><FaCarSide /></div>
          Taxi<span>Ec</span>
        </div>

        {userRole === 'Pasajero' && (
          <>
            <div className="sidebar-section-label">Modo Pasajero</div>
            <button className={`sidebar-btn ${activeTab === 'rf3' ? 'active' : ''}`} onClick={() => setActiveTab('rf3')}><div className="sidebar-btn-icon"><FaMapMarkedAlt/></div> Solicitar Viaje</button>
            <button className={`sidebar-btn ${activeTab === 'rf4' ? 'active' : ''}`} onClick={() => setActiveTab('rf4')}><div className="sidebar-btn-icon"><FaSearchLocation/></div> Ver Disponibles</button>
            <button className={`sidebar-btn ${activeTab === 'rf5' ? 'active' : ''}`} onClick={() => setActiveTab('rf5')}><div className="sidebar-btn-icon"><FaRoute/></div> Ruta y Costo</button>
            <button className={`sidebar-btn ${activeTab === 'rf6' ? 'active' : ''}`} onClick={() => setActiveTab('rf6')}><div className="sidebar-btn-icon"><FaShareAlt/></div> Compartir Viaje</button>
            <button className={`sidebar-btn ${activeTab === 'rf7' ? 'active' : ''}`} onClick={() => setActiveTab('rf7')}><div className="sidebar-btn-icon"><FaUserTie/></div> Perfil Conductor</button>
            <button className={`sidebar-btn ${activeTab === 'rf8' ? 'active' : ''}`} onClick={() => setActiveTab('rf8')}><div className="sidebar-btn-icon"><FaCreditCard/></div> Pago</button>
            <button className={`sidebar-btn ${activeTab === 'rf9' ? 'active' : ''}`} onClick={() => setActiveTab('rf9')}><div className="sidebar-btn-icon"><FaStar/></div> Calificación</button>
            <button className={`sidebar-btn ${activeTab === 'rf10' ? 'active' : ''}`} onClick={() => setActiveTab('rf10')}><div className="sidebar-btn-icon"><FaBell/></div> Notificaciones</button>
          </>
        )}

        {userRole === 'Conductor' && (
          <>
            <div className="sidebar-section-label">Modo Conductor</div>
            <button className={`sidebar-btn ${activeTab === 'rf11' ? 'active' : ''}`} onClick={() => setActiveTab('rf11')}><div className="sidebar-btn-icon"><FaClipboardList/></div> Solicitudes</button>
            <button className={`sidebar-btn ${activeTab === 'rf12' ? 'active' : ''}`} onClick={() => setActiveTab('rf12')}><div className="sidebar-btn-icon"><FaUsers/></div> Capacidad</button>
            <button className={`sidebar-btn ${activeTab === 'rf13' ? 'active' : ''}`} onClick={() => setActiveTab('rf13')}><div className="sidebar-btn-icon"><FaMapSigns/></div> Zonas</button>
            <button className={`sidebar-btn ${activeTab === 'rf14' ? 'active' : ''}`} onClick={() => setActiveTab('rf14')}><div className="sidebar-btn-icon"><FaHistory/></div> Historial</button>
          </>
        )}

        {userRole === 'Admin' && (
          <>
            <div className="sidebar-section-label">Panel Admin</div>
            <button className={`sidebar-btn ${activeTab === 'rf15' ? 'active' : ''}`} onClick={() => setActiveTab('rf15')}><div className="sidebar-btn-icon"><FaUsersCog/></div> Usuarios</button>
            <button className={`sidebar-btn ${activeTab === 'rf16' ? 'active' : ''}`} onClick={() => setActiveTab('rf16')}><div className="sidebar-btn-icon"><FaCar/></div> Flota</button>
            <button className={`sidebar-btn ${activeTab === 'rf17' ? 'active' : ''}`} onClick={() => setActiveTab('rf17')}><div className="sidebar-btn-icon"><FaMapPin/></div> Localidades</button>
            <button className={`sidebar-btn ${activeTab === 'rf18' ? 'active' : ''}`} onClick={() => setActiveTab('rf18')}><div className="sidebar-btn-icon"><FaExclamationTriangle/></div> Incidentes</button>
            <button className={`sidebar-btn ${activeTab === 'rf19' ? 'active' : ''}`} onClick={() => setActiveTab('rf19')}><div className="sidebar-btn-icon"><FaChartBar/></div> Reportes</button>
            <button className={`sidebar-btn ${activeTab === 'rf20' ? 'active' : ''}`} onClick={() => setActiveTab('rf20')}><div className="sidebar-btn-icon"><FaCog/></div> Configuración</button>
          </>
        )}

        {/* Footer del sidebar: perfil + cerrar sesión */}
        <div className="sidebar-footer">
          <button
            className="sidebar-user-btn"
            onClick={() => setShowUserPanel(!showUserPanel)}
            title="Ver mi perfil"
          >
            <div className="sidebar-user-avatar"><FaUserCircle /></div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">
                {currentUser?.nombres || userRole}
              </div>
              <div className="sidebar-user-role">{userRole}</div>
            </div>
          </button>
          <button className="sidebar-logout-btn" onClick={handleLogout} title="Cerrar sesión">
            <FaSignOutAlt />
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className={`dashboard-main ${showUserPanel ? 'panel-open' : ''}`}>
        {activeTab === 'rf3'  && <SolicitudGeolocalizada />}
        {activeTab === 'rf4'  && <Disponibilidad />}
        {activeTab === 'rf5'  && <CalculoRuta />}
        {activeTab === 'rf6'  && <CompartirViaje />}
        {activeTab === 'rf7'  && <PerfilTransparencia />}
        {activeTab === 'rf8'  && <Pago />}
        {activeTab === 'rf9'  && <Calificacion />}
        {activeTab === 'rf10' && <Notificaciones />}
        {activeTab === 'rf11' && <GestionSolicitudes />}
        {activeTab === 'rf12' && <ControlCapacidad />}
        {activeTab === 'rf13' && <ZonasPreferenciales />}
        {activeTab === 'rf14' && <HistorialConductor />}
        {activeTab === 'rf15' && <GestionUsuarios />}
        {activeTab === 'rf16' && <GestionFlota />}
        {activeTab === 'rf17' && <GestionLocalidades />}
        {activeTab === 'rf18' && <GestionIncidentes />}
        {activeTab === 'rf19' && <Reportes />}
        {activeTab === 'rf20' && <Configuracion />}
      </main>

      {/* Panel lateral de perfil de usuario (deslizable) */}
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
