export interface EmailRegisterProps {
  email: string;
  onEmailChange: (value: string) => void;
}

export default function EmailRegister({ email, onEmailChange }: EmailRegisterProps) {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--gray-900)', marginBottom: '1rem' }}>
        Registrar Email
      </h2>
      <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>
        Ingresa tu correo electrónico para comenzar
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-900)', marginBottom: '0.5rem' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="tu@email.com"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--gray-300)',
              fontSize: '1rem',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
          />
        </div>

        <div style={{
          backgroundColor: '#dbeafe',
          border: '1px solid #93c5fd',
          borderRadius: '0.5rem',
          padding: '1rem'
        }}>
          <p style={{ fontSize: '0.875rem', color: '#1e3a8a' }}>
            Te enviaremos un código de confirmación a este email
          </p>
        </div>
      </div>
    </div>
  );
}
