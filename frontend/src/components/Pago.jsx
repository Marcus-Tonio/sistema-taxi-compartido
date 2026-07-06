import React, { useState } from 'react';
import { FaCreditCard, FaMoneyBillWave, FaPaypal, FaCheckCircle, FaLock } from 'react-icons/fa';

export default function Pago() {
  const [metodo, setMetodo] = useState('tarjeta');
  const [pagado, setPagado] = useState(false);
  const [loading, setLoading] = useState(false);

  const procesarPago = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPagado(true);
    }, 1500);
  };

  if (pagado) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '2rem' }}>
        <div style={{ background: 'var(--gray-900)', padding: '3rem', borderRadius: '24px', textAlign: 'center', maxWidth: '400px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid var(--border)' }}>
          <FaCheckCircle style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem' }} />
          <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>Pago Exitoso</h2>
          <p style={{ color: 'var(--gray-400)', marginBottom: '2rem' }}>Tu recibo ha sido enviado a tu correo.</p>
          <button className="btn btn-full-yellow" onClick={() => setPagado(false)}>Volver al inicio</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '2rem' }}>
      <div style={{ background: 'var(--gray-900)', padding: '2.5rem', borderRadius: '24px', maxWidth: '450px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid var(--border)' }}>
        
        <h2 style={{ color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Checkout <FaLock style={{fontSize: '1rem', color: 'var(--gray-500)'}} />
        </h2>
        <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: '2rem' }}>Completa tu pago de forma segura.</p>

        {/* Resumen */}
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--gray-300)' }}>
            <span>Viaje de Universidad a Malecón</span>
            <span>$4.50</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--gray-300)' }}>
            <span>Tasa de servicio</span>
            <span>$0.50</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '1rem', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
            <span>Total a pagar</span>
            <span style={{ color: 'var(--yellow-400)' }}>$5.00</span>
          </div>
        </div>

        {/* Métodos */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: metodo === 'tarjeta' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${metodo === 'tarjeta' ? 'var(--yellow-400)' : 'transparent'}`, color: 'white', cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={() => setMetodo('tarjeta')}
          >
            <FaCreditCard style={{ fontSize: '1.5rem', color: metodo === 'tarjeta' ? 'var(--yellow-400)' : 'var(--gray-400)', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '0.85rem' }}>Tarjeta</div>
          </button>
          <button 
            style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: metodo === 'efectivo' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${metodo === 'efectivo' ? 'var(--yellow-400)' : 'transparent'}`, color: 'white', cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={() => setMetodo('efectivo')}
          >
            <FaMoneyBillWave style={{ fontSize: '1.5rem', color: metodo === 'efectivo' ? 'var(--yellow-400)' : 'var(--gray-400)', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '0.85rem' }}>Efectivo</div>
          </button>
          <button 
            style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: metodo === 'paypal' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${metodo === 'paypal' ? 'var(--yellow-400)' : 'transparent'}`, color: 'white', cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={() => setMetodo('paypal')}
          >
            <FaPaypal style={{ fontSize: '1.5rem', color: metodo === 'paypal' ? 'var(--yellow-400)' : 'var(--gray-400)', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '0.85rem' }}>PayPal</div>
          </button>
        </div>

        {metodo === 'tarjeta' && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--border)' }}>
              <div style={{ background: '#1e3a8a', padding: '0.3rem 0.6rem', borderRadius: '6px', color: 'white', fontWeight: 'bold', fontSize: '0.8rem', fontStyle: 'italic' }}>VISA</div>
              <div style={{ color: 'white', flex: 1 }}>•••• •••• •••• 4242</div>
              <div style={{ color: 'var(--yellow-400)', fontSize: '0.8rem', cursor: 'pointer' }}>Cambiar</div>
            </div>
          </div>
        )}

        <button 
          className="btn btn-full-yellow" 
          style={{ padding: '1rem', fontSize: '1.1rem' }} 
          onClick={procesarPago}
          disabled={loading}
        >
          {loading ? 'Procesando...' : `Pagar $5.00`}
        </button>
      </div>
    </div>
  );
}
