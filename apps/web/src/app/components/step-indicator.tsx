import { CheckCircle2 } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {steps.map((step, index) => (
          <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div style={{ flexShrink: 0, position: 'relative', zIndex: 10 }}>
                {currentStep > step.id ? (
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: 'var(--success)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <CheckCircle2 size={32} />
                  </div>
                ) : currentStep === step.id ? (
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: 'var(--primary)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.125rem'
                  }}>
                    {step.id}
                  </div>
                ) : (
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: 'var(--gray-200)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gray-600)',
                    fontWeight: 'bold',
                    fontSize: '1.125rem'
                  }}>
                    {step.id}
                  </div>
                )}
              </div>

              {index < steps.length - 1 && (
                <div style={{
                  flex: 1,
                  height: '4px',
                  margin: '0 0.5rem',
                  backgroundColor: currentStep > step.id ? 'var(--success)' : 'var(--gray-200)'
                }} />
              )}
            </div>

            <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-900)' }}>{step.name}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
