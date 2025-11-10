import { Check } from 'lucide-react';
import styles from './steps.module.css';

interface AccountCreatedProps {
  referenciaId: string;
}

export const AccountCreated = ({ referenciaId }: AccountCreatedProps) => (
  <div className={styles.centerContainer}>
    <div className={`${styles.iconCircle} ${styles.successIcon}`}>
      <Check size={40} color="white" />
    </div>
    <h2 className={styles.largeTitle}>Cuenta Creada Exitosamente</h2>
    <p className={styles.centerText}>Tu cuenta ha sido verificada</p>
    <p className={styles.refText}>Ref: {referenciaId}</p>
  </div>
);
