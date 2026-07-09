import React, { useState } from 'react';
import { FaStar, FaCar, FaUserShield, FaComments, FaRoute, FaHistory, FaChevronRight } from 'react-icons/fa';

// Historial simulado de conductores anteriores
const HISTORIAL_CONDUCTORES = [
  {
    id: 1,
    nombre: 'Carlos Mendoza',
    avatar: 'https://i.pravatar.cc/150?img=11',
    auto: 'Kia Picanto · GSB-4598',
    rating: 4.9,
    origen: 'Universidad de Guayaquil',
    destino: 'Malecón 2000',
    fecha: '8 de julio, 2026',
    viajes: 342,
    reseñas: ['Excelente conductor, muy prudente.', 'Llegó a tiempo, muy recomendado.']
  },
  {
    id: 2,
    nombre: 'Ana Torres',
    avatar: 'https://i.pravatar.cc/150?img=5',
    auto: 'Chevrolet Aveo · GBT-0234',
    rating: 4.7,
    origen: 'Urdesa',
    destino: 'Plaza Lagos',
    fecha: '5 de julio, 2026',
    viajes: 218,
    reseñas: ['Muy amable y puntual.']
  },
];

export default function PerfilTransparencia() {
  const [viajeActivo, setViajeActivo] = useState(false); // En producción vendría del contexto global
  const [conductorSeleccionado, setConductorSeleccionado] = useState(null);

  // Modo demo
  const activarDemo = () => {
    setViajeActivo(true);
    setConductorSeleccionado(HISTORIAL_CONDUCTORES[0]);
  };

  // Vista expandida de un conductor del historial
  if (conductorSeleccionado) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%', padding: '2rem', overflowY: 'auto' }}>
        <div style={{ background: 'var(--gray-900)', borderRadius: '24px', maxWidth: '500px', width: '100%', border: '1px solid var(--border)', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)', height: '120px', position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: '-40px', left: '2rem', width: '80px', height: '80px', borderRadius: '50%', background: '#fff', border: '4px solid var(--gray-900)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <img src={conductorSeleccionado.avatar} alt="Conductor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '10px', right: '1.5rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', padding: '0.4rem 0.8rem', borderRadius: '20px', color: 'white', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FaUserShield /> Identidad Verificada
            </div>
          </div>

          <div style={{ padding: '3.5rem 2rem 2rem 2rem' }}>
            <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>{conductorSeleccionado.nombre}</h2>
            <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Conductor Pro • Miembro desde 2024</p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { val: `${conductorSeleccionado.rating} ⭐`, label: 'Calificación', color: 'var(--yellow-400)' },
                { val: conductorSeleccionado.viajes, label: 'Viajes', color: 'white' },
                { val: '2.5 años', label: 'Experiencia', color: 'white' },
              ].map(s => (
                <div key={s.label} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ color: s.color, fontSize: '1.2rem', fontWeight: 'bold' }}>{s.val}</div>
                  <div style={{ color: 'var(--gray-500)', fontSize: '0.75rem', marginTop: '0.2rem' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Vehículo */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white', fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaCar style={{ color: 'var(--gray-400)' }} /> Vehículo Asignado
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ background: '#2563eb', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '6px', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.85rem' }}>
                  {conductorSeleccionado.auto.split('·')[1]?.trim()}
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: 'bold' }}>{conductorSeleccionado.auto.split('·')[0]?.trim()}</div>
                  <div style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>Capacidad: 4 asientos</div>
                </div>
              </div>
            </div>

            {/* Reseñas */}
            <div>
              <h3 style={{ color: 'white', fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaComments style={{ color: 'var(--gray-400)' }} /> Reseñas
              </h3>
              {conductorSeleccionado.reseñas.map((r, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--yellow-400)', fontSize: '0.8rem' }}>★★★★★</span>
                  <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem', margin: '0.3rem 0 0' }}>"{r}"</p>
                </div>
              ))}
            </div>

            <button onClick={() => setConductorSeleccionado(null)} style={{ marginTop: '1.5rem', width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--gray-300)', padding: '0.85rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>
              ← Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '2rem' }}>
      
      {/* ─── Estado: SIN VIAJE ACTIVO ─── */}
      {!viajeActivo && (
        <>
          <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(0,0,0,0))', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '20px', padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🙈</div>
            <h2 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.3rem' }}>Aún no hay un conductor asignado</h2>
            <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Una vez que solicites un viaje y el conductor sea asignado, podrás ver su perfil aquí con todos sus datos, calificación y vehículo.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--yellow-400)', fontSize: '0.85rem', fontWeight: 600 }}>
              <FaRoute /> Solicita un viaje para ver el perfil del conductor
            </div>
          </div>

          {/* Modo demo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.78rem', marginBottom: '0.5rem' }}>── Modo de demostración ──</p>
            <button onClick={activarDemo} style={{ background: 'rgba(255,255,255,0.05)', border: '1px dashed var(--border)', color: 'var(--gray-400)', padding: '0.6rem 1.5rem', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem' }}>
              Simular viaje activo
            </button>
          </div>
        </>
      )}

      {/* ─── Estado: VIAJE ACTIVO (perfil del conductor actual) ─── */}
      {viajeActivo && (
        <div style={{ background: 'var(--gray-900)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '20px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <img src={HISTORIAL_CONDUCTORES[0].avatar} alt="conductor" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--yellow-400)' }} />
          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>{HISTORIAL_CONDUCTORES[0].nombre}</div>
            <div style={{ color: 'var(--gray-400)', fontSize: '0.82rem' }}>{HISTORIAL_CONDUCTORES[0].auto}</div>
            <div style={{ color: 'var(--yellow-400)', fontWeight: 'bold', fontSize: '0.85rem' }}>⭐ {HISTORIAL_CONDUCTORES[0].rating}</div>
          </div>
          <button onClick={() => setConductorSeleccionado(HISTORIAL_CONDUCTORES[0])} style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: 'var(--yellow-400)', padding: '0.5rem 1rem', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Ver perfil <FaChevronRight />
          </button>
        </div>
      )}

      {/* ─── Historial de conductores anteriores ─── */}
      <div>
        <h3 style={{ color: 'var(--gray-300)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaHistory /> Conductores anteriores
        </h3>
        {HISTORIAL_CONDUCTORES.map(c => (
          <div
            key={c.id}
            onClick={() => setConductorSeleccionado(c)}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--gray-900)', border: '1px solid var(--border)', borderRadius: '14px', marginBottom: '0.75rem', cursor: 'pointer', transition: 'border-color 0.2s' }}
          >
            <img src={c.avatar} alt={c.nombre} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem' }}>{c.nombre}</div>
              <div style={{ color: 'var(--gray-400)', fontSize: '0.78rem' }}>{c.origen} → {c.destino}</div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.75rem' }}>{c.fecha}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ color: 'var(--yellow-400)', fontWeight: 'bold', fontSize: '0.9rem' }}>⭐ {c.rating}</div>
              <FaChevronRight style={{ color: 'var(--gray-600)', marginTop: '0.3rem' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
