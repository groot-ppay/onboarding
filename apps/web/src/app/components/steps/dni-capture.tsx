export interface DNICaptureProps {
  name: string;
  dni: string;
  gender?: string;
  dateOfBirth: string;
  onNameChange: (value: string) => void;
  onDniChange: (value: string) => void;
  onGenderChange?: (value: string) => void;
  onDateOfBirthChange: (value: string) => void;
}

export default function DNICapture({
  name,
  dni,
  gender = '',
  dateOfBirth,
  onNameChange,
  onDniChange,
  onGenderChange,
  onDateOfBirthChange,
}: DNICaptureProps) {
  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid var(--gray-300)',
    fontSize: '1rem',
    outline: 'none'
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--gray-900)', marginBottom: '1rem' }}>
        Informa DNI
      </h2>
      <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>
        Género, Nombre, Apellido y Fecha de nacimiento
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-900)', marginBottom: '0.5rem' }}>
            Nombre y Apellido
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Juan Pérez"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-900)', marginBottom: '0.5rem' }}>
            DNI
          </label>
          <input
            type="text"
            value={dni}
            onChange={(e) => onDniChange(e.target.value)}
            placeholder="12345678"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-900)', marginBottom: '0.5rem' }}>
            Género
          </label>
          <select
            value={gender}
            onChange={(e) => onGenderChange?.(e.target.value)}
            style={inputStyle}
          >
            <option value="">Selecciona un género</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-900)', marginBottom: '0.5rem' }}>
            Fecha de nacimiento
          </label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => onDateOfBirthChange(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  );
}
