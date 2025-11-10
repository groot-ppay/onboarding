import styles from './steps.module.css';

export interface EmailRegisterProps {
  email: string;
  onEmailChange: (value: string) => void;
}

export default function EmailRegister({ email, onEmailChange }: EmailRegisterProps) {
  return (
    <div>
      <h2 className={styles.title}>Registrar Email</h2>
      <p className={styles.subtitle}>Ingresa tu correo electrónico para comenzar</p>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="tu@email.com"
            className={styles.input}
          />
        </div>

        <div className={styles.infoBox}>
          <p className={styles.infoText}>
            Te enviaremos un código de confirmación a este email
          </p>
        </div>
      </div>
    </div>
  );
}
