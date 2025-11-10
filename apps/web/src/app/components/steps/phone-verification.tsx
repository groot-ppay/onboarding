import styles from './steps.module.css';

export interface PhoneVerificationProps {
  phone: string;
  onPhoneChange: (value: string) => void;
}

export default function PhoneVerification({ phone, onPhoneChange }: PhoneVerificationProps) {
  return (
    <div>
      <h2 className={styles.title}>Verificación de Teléfono</h2>
      <p className={styles.subtitle}>Ingresa tu número de teléfono para la verificación</p>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Teléfono</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="+54 9 11 1234-5678"
            className={styles.input}
          />
        </div>

        <div className={styles.grayBox}>
          <p className={styles.grayText}>
            Conectando a las APIs de verificación para validar tu teléfono...
          </p>
        </div>
      </div>
    </div>
  );
}
