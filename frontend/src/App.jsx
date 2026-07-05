import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import './App.css'; // Mantenemos el import por si acaso, aunque usamos index.css

function App() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="app-container">
      <header className="header">
        <h1>🚕 Taxi Compartido</h1>
        <div style={{fontWeight: 500}}>Bienvenido</div>
      </header>
      
      <main className="main-content">
        <div style={{width: '100%', maxWidth: '500px'}}>
          
          <div className="nav-tabs">
            <div 
              className={`nav-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Iniciar Sesión
            </div>
            <div 
              className={`nav-tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Registrarse
            </div>
          </div>

          {activeTab === 'login' ? <Login /> : <Register />}
          
        </div>
      </main>
    </div>
  );
}

export default App;
