import { useState, useEffect } from 'react';
import { FaCarSide, FaMapMarkedAlt, FaShieldAlt, FaNewspaper } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';

export default function Home({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="navbar-brand">
          <div className="navbar-icon"><FaCarSide /></div>
          Taxi<span>Ec</span>
        </a>
        
        <div className="navbar-links">
          <button className="navbar-link" onClick={() => window.scrollTo(0, 0)}>Inicio</button>
          <button className="navbar-link" onClick={() => document.getElementById('como-funciona').scrollIntoView()}>¿Cómo funciona?</button>
          <button className="navbar-link" onClick={() => document.getElementById('noticias').scrollIntoView()}>Noticias</button>
        </div>

        <div className="navbar-actions">
          <button className="btn btn-ghost" onClick={() => onNavigate('login')}>Iniciar Sesión</button>
          <button className="btn btn-yellow" onClick={() => onNavigate('register')}>Crear Cuenta</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot"></div>
            Tu viaje seguro y económico
          </div>
          <h1>Comparte ruta.<br/>Ahorra <span className="highlight">dinero</span> y tiempo.</h1>
          <p>La nueva forma de moverse por la ciudad. Encuentra compañeros de ruta, divide los gastos y viaja cómodo en taxis verificados.</p>
          
          <div className="hero-cta">
            <button className="btn btn-yellow-lg" onClick={() => onNavigate('register')}>
              Comenzar a viajar <BsArrowRight />
            </button>
            <button className="btn btn-dark-lg" onClick={() => document.getElementById('como-funciona').scrollIntoView()}>
              Ver más
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <div className="hero-stat-value">5K+</div>
              <div className="hero-stat-label">Usuarios activos</div>
            </div>
            <div>
              <div className="hero-stat-value">12K+</div>
              <div className="hero-stat-label">Viajes completados</div>
            </div>
            <div>
              <div className="hero-stat-value">4.8</div>
              <div className="hero-stat-label">Calificación promedio</div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="como-funciona" className="section">
        <div className="section-label">Proceso simple</div>
        <h2 className="section-title">¿Cómo funciona?</h2>
        <p className="section-subtitle">Tres simples pasos para llegar a tu destino de la forma más eficiente y económica posible.</p>
        
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon"><FaMapMarkedAlt /></div>
            <h3>Pide tu viaje</h3>
            <p>Ingresa tu origen y destino. Nuestro sistema buscará rutas compartidas disponibles o creará una nueva para ti.</p>
          </div>
          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon"><FaCarSide /></div>
            <h3>Comparte y ahorra</h3>
            <p>El algoritmo te empareja con personas en tu misma ruta. El costo se divide automáticamente.</p>
          </div>
          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon"><FaShieldAlt /></div>
            <h3>Viaja seguro</h3>
            <p>Todos nuestros conductores son verificados. Comparte tu ubicación en tiempo real con familiares.</p>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="noticias" className="section">
        <div className="section-label">Actualizaciones</div>
        <h2 className="section-title">Últimas Noticias</h2>
        <p className="section-subtitle">Mantente al tanto de las novedades, promociones y actualizaciones de nuestra plataforma.</p>
        
        <div className="news-grid">
          <div className="news-card">
            <div className="news-card-img" style={{background: 'linear-gradient(45deg, #1A1A1A, #242424)'}}><FaNewspaper color="#FBBF24"/></div>
            <div className="news-card-body">
              <span className="news-tag">Promoción</span>
              <h4>Usa el cupón PROMO10</h4>
              <p>Este mes, obtén un 10% de descuento en todos tus viajes compartidos hacia el centro.</p>
              <div className="news-date">Hace 2 días</div>
            </div>
          </div>
          <div className="news-card">
            <div className="news-card-img" style={{background: 'linear-gradient(45deg, #1A1A1A, #242424)'}}><FaShieldAlt color="#10B981"/></div>
            <div className="news-card-body">
              <span className="news-tag">Seguridad</span>
              <h4>Nuevas medidas de seguridad</h4>
              <p>Hemos implementado validación biométrica para todos los conductores nuevos de la flota.</p>
              <div className="news-date">Hace 1 semana</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="navbar-brand">
          <div className="navbar-icon" style={{width: 24, height: 24, fontSize: '0.7rem'}}><FaCarSide /></div>
          Taxi<span>Ec</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Grupo C - Base de Datos. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
