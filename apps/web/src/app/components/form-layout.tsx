import { ReactNode } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import StepIndicator from './step-indicator';

interface FormLayoutProps {
  steps: Array<{ id: number; name: string; description: string }>;
  currentStep: number;
  children: ReactNode;
  onNext: () => void;
  onPrevious: () => void;
  canProceed: boolean;
  isLoading: boolean;
  nextLabel?: string;
}

export const FormLayout = ({
  steps,
  currentStep,
  children,
  onNext,
  onPrevious,
  canProceed,
  isLoading,
  nextLabel = 'Siguiente'
}: FormLayoutProps) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem 1rem 3rem' }}>
    <div style={{ width: '100%', maxWidth: '42rem' }}>
      <StepIndicator steps={steps} currentStep={currentStep} />

      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: currentStep === 2 || currentStep === 5 ? '3rem' : '2rem',
        marginBottom: '2rem',
        minHeight: '24rem'
      }}>
        {children}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
        <button
          onClick={onPrevious}
          disabled={currentStep === 1}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--gray-300)',
            backgroundColor: 'white',
            color: 'var(--gray-700)',
            fontWeight: 500,
            cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
            opacity: currentStep === 1 ? 0.5 : 1,
            transition: 'background-color 0.2s'
          }}
        >
          <ChevronLeft size={20} />
          Atrás
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed || isLoading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--primary)',
            color: 'white',
            fontWeight: 500,
            border: 'none',
            cursor: (!canProceed || isLoading) ? 'not-allowed' : 'pointer',
            opacity: (!canProceed || isLoading) ? 0.5 : 1,
            transition: 'background-color 0.2s'
          }}
        >
          {nextLabel}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  </div>
);
