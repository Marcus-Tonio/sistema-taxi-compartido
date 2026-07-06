import React, { useState } from 'react';

export default function Pago() {
  const [metodoPago, setMetodoPago] = useState('Tarjeta');
  const [cupon, setCupon] = useState('');
  const [descuento, setDescuento] = useState(null);

  const aplicarCupon = () => {
    if (cupon.toUpperCase() === 'PROMO10') {
      setDescuento(10);
    } else {
      setDescuento(0);
    }
  };

  const subtotal = 2.50;
  const montoFinal = descuento ? (subtotal * (1 - descuento / 100)).toFixed(2) : subtotal.toFixed(2);

  return (
    <div className="card">
      <h2 className="card-title">Procesamiento de Pago (RF-8)</h2>

      <div style={{ background: '#F3F4F6', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: '#6C757D', fontSize: '0.9rem' }}>Viaje · 4.2 km</span>
          <span style={{ fontWeight: 600 }}>$2.50</span>
        </div>
        {descuento > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#059669', fontSize: '0.9rem' }}>Cupón PROMO10 (-{descuento}%)</span>
            <span style={{ color: '#059669', fontWeight: 600 }}>-$0.25</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E5E7EB', paddingTop: '0.5rem' }}>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Total</span>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#B45309' }}>${montoFinal}</span>
        </div>
      </div>

      <div className="form-group">
        <span className="form-label">Método de pago</span>
        <div className="radio-group" style={{ flexWrap: 'wrap' }}>
          {['Tarjeta', 'Efectivo', 'QR Code'].map(m => (
            <label key={m} className="radio-label">
              <input type="radio" checked={metodoPago === m} onChange={() => setMetodoPago(m)} />
              {m}
            </label>
          ))}
        </div>
      </div>

      {metodoPago === 'Tarjeta' && (
        <>
          <div className="form-group">
            <label className="form-label">Número de tarjeta</label>
            <input type="text" className="form-control" placeholder="**** **** **** 1234" maxLength={19} />
          </div>
          <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">Vencimiento</label>
              <input type="text" className="form-control" placeholder="MM/AA" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">CVV</label>
              <input type="password" className="form-control" placeholder="•••" maxLength={3} />
            </div>
          </div>
        </>
      )}

      <div className="form-group">
        <label className="form-label">Cupón de descuento</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Ej. PROMO10"
            value={cupon}
            onChange={(e) => setCupon(e.target.value)}
            style={{ flex: 1 }}
          />
          <button
            className="btn btn-secondary"
            style={{ width: 'auto', padding: '0.75rem 1rem' }}
            onClick={aplicarCupon}
          >
            Aplicar
          </button>
        </div>
        {descuento === 0 && <p style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>Cupón no válido.</p>}
        {descuento > 0 && <p style={{ color: '#059669', fontSize: '0.8rem', marginTop: '0.25rem' }}>✓ Descuento aplicado correctamente.</p>}
      </div>

      <div className="button-group">
        <button className="btn btn-secondary">Cancelar</button>
        <button className="btn btn-primary">Confirmar Pago · ${montoFinal}</button>
      </div>
    </div>
  );
}
