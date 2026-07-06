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
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default App;
