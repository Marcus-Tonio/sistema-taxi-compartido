import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import SolicitudGeolocalizada from './components/SolicitudGeolocalizada';
import Disponibilidad from './components/Disponibilidad';
import CalculoRuta from './components/CalculoRuta';
import PerfilTransparencia from './components/PerfilTransparencia';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="app-container">
      <header className="header">
        <h1>🚕 Taxi Compartido</h1>
        <div style={{fontWeight: 500}}>Dashboard</div>
      </header>
      
      <main className="main-content">
        <div style={{width: '100%', maxWidth: '800px', display: 'flex', gap: '2rem'}}>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '200px'}}>
            <h3 style={{fontSize: '0.9rem', color: '#6C757D', marginBottom: '0.5rem', textTransform: 'uppercase'}}>Onboarding</h3>
            <button className={`btn ${activeTab === 'login' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('login')}>Iniciar Sesión</button>
            <button className={`btn ${activeTab === 'register' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('register')}>Registro</button>
            
            <h3 style={{fontSize: '0.9rem', color: '#6C757D', margin: '1rem 0 0.5rem', textTransform: 'uppercase'}}>Pasajero</h3>
            <button className={`btn ${activeTab === 'rf3' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf3')}>Solicitar Viaje</button>
            <button className={`btn ${activeTab === 'rf4' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf4')}>Ver Disponibles</button>
            <button className={`btn ${activeTab === 'rf5' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf5')}>Ruta y Costo</button>
            <button className={`btn ${activeTab === 'rf7' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rf7')}>Perfil Conductor</button>
          </div>

          <div style={{flex: 1}}>
            {activeTab === 'login' && <Login />}
            {activeTab === 'register' && <Register />}
            {activeTab === 'rf3' && <SolicitudGeolocalizada />}
            {activeTab === 'rf4' && <Disponibilidad />}
            {activeTab === 'rf5' && <CalculoRuta />}
            {activeTab === 'rf7' && <PerfilTransparencia />}
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default App;
