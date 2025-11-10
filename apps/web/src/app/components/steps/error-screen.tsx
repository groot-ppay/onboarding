import { AlertCircle } from 'lucide-react';
import styles from './error-screen.module.css';

interface ErrorScreenProps {
  onRetry: () => void;
  onClose: () => void;
}

export default function ErrorScreen({ onRetry, onClose }: ErrorScreenProps) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <div className={styles.iconCircle}>
              <AlertCircle size={40} color="var(--error)" />
            </div>
          </div>

          <h2 className={styles.title}>Verificación Rechazada</h2>
          <p className={styles.message}>
            Lamentablemente, tu número de teléfono no pudo ser verificado. Por favor, intenta nuevamente con un número válido.
          </p>

          <div className={styles.errorBox}>
            <p className={styles.errorText}>
              <strong>Motivo:</strong> El número de teléfono no coincide con los registros de la cuenta
            </p>
          </div>

          <div className={styles.actions}>
            <button onClick={onRetry} className={`${styles.button} ${styles.buttonPrimary}`}>
              Intentar Nuevamente
            </button>
            <button onClick={onClose} className={`${styles.button} ${styles.buttonSecondary}`}>
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
