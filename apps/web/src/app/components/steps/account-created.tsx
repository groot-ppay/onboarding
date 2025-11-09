import { Check } from 'lucide-react';

interface AccountCreatedProps {
  referenciaId: string;
}

export const AccountCreated = ({ referenciaId }: AccountCreatedProps) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '24rem'
  }}>
    <div style={{
      width: '5rem',
      height: '5rem',
      backgroundColor: 'var(--success)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }}>
      <Check size={40} color="white" />
    </div>
    <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--gray-900)', marginBottom: '0.5rem', textAlign: 'center' }}>
      Cuenta Creada Exitosamente
    </h2>
    <p style={{ color: 'var(--gray-600)', textAlign: 'center', marginBottom: '0.5rem' }}>
      Tu cuenta ha sido verificada
    </p>
    <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
      Ref: {referenciaId}
    </p>
  </div>
);
