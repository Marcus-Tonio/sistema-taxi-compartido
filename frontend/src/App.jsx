import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
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
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setActiveTab('rf3'); // Redirigir a solicitar viaje al entrar
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('login');
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🚕 Taxi Compartido</h1>
        <div style={{fontWeight: 500, display: 'flex', alignItems: 'center', gap: '1rem'}}>
          {isAuthenticated ? (
            <>
              <span>Modo Pasajero</span>
              <button className="btn btn-secondary" style={{padding: '0.25rem 0.75rem', fontSize: '0.8rem'}} onClick={handleLogout}>Salir</button>
            </>
          ) : (
            <span>Bienvenido</span>
          )}
        </div>
      </header>
      
      <main className="main-content">
        <div style={{width: '100%', maxWidth: isAuthenticated ? '900px' : '500px', display: 'flex', gap: '2rem'}}>
          
          {isAuthenticated && (
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '220px'}}>
              <h3 style={{fontSize: '0.9rem', color: '#6C757D', margin: '0 0 0.5rem', textTransform: 'uppercase'}}>Pasajero</h3>
              <button className={`btn ${activeTab === 'rf3' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf3')}>Solicitar Viaje</button>
              <button className={`btn ${activeTab === 'rf4' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf4')}>Ver Disponibles</button>
              <button className={`btn ${activeTab === 'rf5' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf5')}>Ruta y Costo</button>
              <button className={`btn ${activeTab === 'rf6' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf6')}>Compartir Viaje</button>
              <button className={`btn ${activeTab === 'rf7' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf7')}>Perfil Conductor</button>
              <button className={`btn ${activeTab === 'rf8' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf8')}>Pago</button>
              <button className={`btn ${activeTab === 'rf9' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf9')}>Calificación</button>
              <button className={`btn ${activeTab === 'rf10' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf10')}>
                Notificaciones
              </button>

              <h3 style={{fontSize: '0.9rem', color: '#6C757D', margin: '1rem 0 0.5rem', textTransform: 'uppercase'}}>Conductor</h3>
              <button className={`btn ${activeTab === 'rf11' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf11')}>Solicitudes</button>
              <button className={`btn ${activeTab === 'rf12' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf12')}>Capacidad</button>
              <button className={`btn ${activeTab === 'rf13' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf13')}>Zonas</button>
              <button className={`btn ${activeTab === 'rf14' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf14')}>Historial</button>

              <h3 style={{fontSize: '0.9rem', color: '#6C757D', margin: '1rem 0 0.5rem', textTransform: 'uppercase'}}>Administrador</h3>
              <button className={`btn ${activeTab === 'rf15' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf15')}>Usuarios</button>
              <button className={`btn ${activeTab === 'rf16' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf16')}>Flota</button>
              <button className={`btn ${activeTab === 'rf17' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf17')}>Localidades</button>
              <button className={`btn ${activeTab === 'rf18' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf18')}>Incidentes</button>
              <button className={`btn ${activeTab === 'rf19' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf19')}>Reportes</button>
              <button className={`btn ${activeTab === 'rf20' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf20')}>Configuración</button>
            </div>
          )}

          <div style={{flex: 1}}>
            {!isAuthenticated && (
              <div className="nav-tabs">
                <div className={`nav-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Iniciar Sesión</div>
                <div className={`nav-tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>Registrarse</div>
              </div>
            )}

            {!isAuthenticated && activeTab === 'login' && <Login onLogin={handleLogin} />}
            {!isAuthenticated && activeTab === 'register' && <Register />}
            
            {isAuthenticated && activeTab === 'rf3' && <SolicitudGeolocalizada />}
            {isAuthenticated && activeTab === 'rf4' && <Disponibilidad />}
            {isAuthenticated && activeTab === 'rf5' && <CalculoRuta />}
            {isAuthenticated && activeTab === 'rf6' && <CompartirViaje />}
            {isAuthenticated && activeTab === 'rf7' && <PerfilTransparencia />}
            {isAuthenticated && activeTab === 'rf8' && <Pago />}
            {isAuthenticated && activeTab === 'rf9' && <Calificacion />}
            {isAuthenticated && activeTab === 'rf10' && <Notificaciones />}
            {isAuthenticated && activeTab === 'rf11' && <GestionSolicitudes />}
            {isAuthenticated && activeTab === 'rf12' && <ControlCapacidad />}
            {isAuthenticated && activeTab === 'rf13' && <ZonasPreferenciales />}
            {isAuthenticated && activeTab === 'rf14' && <HistorialConductor />}
            {isAuthenticated && activeTab === 'rf15' && <GestionUsuarios />}
            {isAuthenticated && activeTab === 'rf16' && <GestionFlota />}
            {isAuthenticated && activeTab === 'rf17' && <GestionLocalidades />}
            {isAuthenticated && activeTab === 'rf18' && <GestionIncidentes />}
            {isAuthenticated && activeTab === 'rf19' && <Reportes />}
            {isAuthenticated && activeTab === 'rf20' && <Configuracion />}
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default App;
