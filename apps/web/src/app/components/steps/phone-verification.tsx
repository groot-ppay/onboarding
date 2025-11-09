export interface PhoneVerificationProps {
  phone: string;
  onPhoneChange: (value: string) => void;
}

export default function PhoneVerification({ phone, onPhoneChange }: PhoneVerificationProps) {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--gray-900)', marginBottom: '1rem' }}>
        Verificación de Teléfono
      </h2>
      <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>
        Ingresa tu número de teléfono para la verificación
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-900)', marginBottom: '0.5rem' }}>
            Teléfono
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="+54 9 11 1234-5678"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--gray-300)',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{
          backgroundColor: 'var(--gray-50)',
          border: '1px solid var(--gray-200)',
          borderRadius: '0.5rem',
          padding: '1rem'
        }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
            Conectando a las APIs de verificación para validar tu teléfono...
          </p>
        </div>
      </div>
    </div>
  );
}
