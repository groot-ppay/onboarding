import { ReactNode } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import styles from './form-layout.module.css';

interface FormLayoutProps {
  currentStep: number;
  children: ReactNode;
  onNext: () => void;
  onReset: () => void;
  canProceed: boolean;
  isLoading: boolean;
  nextLabel?: string;
}

export const FormLayout = ({
  currentStep,
  children,
  onNext,
  onReset,
  canProceed,
  isLoading,
  nextLabel = 'Siguiente'
}: FormLayoutProps) => {
  const isLargeCard = currentStep === 2 || currentStep === 5;
  
  return (
    <div>
      <div className={`${styles.card} ${isLargeCard ? styles.cardLarge : ''}`}>
        {children}
      </div>

      <div className={styles.navigation}>
        <button
          onClick={onReset}
          className={`${styles.button} ${styles.buttonBack}`}
        >
          <Home size={20} />
          Ir al Inicio
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed || isLoading}
          className={`${styles.button} ${styles.buttonNext}`}
        >
          {nextLabel}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
