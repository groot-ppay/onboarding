import { Home, LogOut, Settings } from 'lucide-react';

export interface HomeScreenProps {
  formData: {
    email: string;
    name: string;
    referenciaId: string;
  };
  onReset: () => void;
}

export default function HomeScreen({ formData, onReset }: HomeScreenProps) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--primary) 0%, #6d28d9 100%)'
    }}>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{ width: '100%', maxWidth: '42rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              backgroundColor: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <Home size={32} color="var(--primary)" />
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
              Bienvenido a Personal Pay
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Tu cuenta ha sido creada exitosamente
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--gray-200)'
              }}>
                <span style={{ color: 'var(--gray-600)' }}>Email</span>
                <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{formData.email}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--gray-200)'
              }}>
                <span style={{ color: 'var(--gray-600)' }}>Nombre</span>
                <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
                  {formData.name || 'No registrado'}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: 'var(--gray-600)' }}>Referencia KYC</span>
                <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{formData.referenciaId}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button style={{
              width: '100%',
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
              backgroundColor: 'white',
              color: 'var(--primary)',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.2s'
            }}>
              <Settings size={20} />
              Mi Cuenta
            </button>
            <button
              onClick={onReset}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.2s'
              }}
            >
              <LogOut size={20} />
              Cerrar sesión
            </button>
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
              © 2025 Personal Pay - Hackaton Project
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
