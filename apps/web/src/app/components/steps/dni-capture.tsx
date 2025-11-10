import styles from './steps.module.css';

export interface DNICaptureProps {
  dni: string;
  gender?: string;
  onDniChange: (value: string) => void;
  onGenderChange?: (value: string) => void;
}

export default function DNICapture({
  dni,
  gender = '',
  onDniChange,
  onGenderChange,
}: DNICaptureProps) {
  return (
    <div>
      <h2 className={styles.title}>Informa DNI</h2>
      <p className={styles.subtitle}>Ingresa tu DNI y género</p>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>DNI</label>
          <input
            type="text"
            value={dni}
            onChange={(e) => onDniChange(e.target.value)}
            placeholder="12345678"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Género</label>
          <select
            value={gender}
            onChange={(e) => onGenderChange?.(e.target.value)}
            className={styles.select}
          >
            <option value="">Selecciona un género</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
        </div>
      </div>
    </div>
  );
}
