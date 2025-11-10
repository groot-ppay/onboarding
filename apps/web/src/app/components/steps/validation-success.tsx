import { Check } from 'lucide-react';
import styles from './steps.module.css';

export const ValidationSuccess = () => (
  <div className={styles.centerContainer}>
    <div className={`${styles.iconCircle} ${styles.successIcon}`}>
      <Check size={40} color="white" />
    </div>
    <h2 className={styles.largeTitle}>Validación Exitosa</h2>
    <p className={styles.centerText}>Tu email ha sido verificado correctamente</p>
  </div>
);
