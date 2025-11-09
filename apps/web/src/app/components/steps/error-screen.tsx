import { AlertCircle } from 'lucide-react';

interface ErrorScreenProps {
  onRetry: () => void;
  onClose: () => void;
}

export default function ErrorScreen({ onRetry, onClose }: ErrorScreenProps) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)'
    }}>
      <div style={{ maxWidth: '28rem', width: '100%' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '5rem',
              height: '5rem',
              backgroundColor: '#fee2e2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertCircle size={40} color="var(--error)" />
            </div>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--gray-900)', marginBottom: '0.5rem' }}>
            Verificación Rechazada
          </h2>
          <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>
            Lamentablemente, tu número de teléfono no pudo ser verificado. Por favor, intenta nuevamente con un número válido.
          </p>

          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <p style={{ fontSize: '0.875rem', color: '#7f1d1d' }}>
              <strong>Motivo:</strong> El número de teléfono no coincide con los registros de la cuenta
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={onRetry}
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--primary)',
                color: 'white',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Intentar Nuevamente
            </button>
            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--gray-300)',
                backgroundColor: 'white',
                color: 'var(--gray-700)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
