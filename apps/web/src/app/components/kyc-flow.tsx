import EmailRegister from './steps/email-register';
import DNICapture from './steps/dni-capture';
import PhoneVerification from './steps/phone-verification';
import HomeScreen from './steps/home-screen';
import ErrorScreen from './steps/error-screen';
import { ValidationSuccess } from './steps/validation-success';
import { AccountCreated } from './steps/account-created';
import { Loader } from './loader';
import { FormLayout } from './form-layout';
import { Container } from './ui/container';
import { PageHeader } from './ui/page-header';
import { useKYCFlow } from '../hooks/useKYCFlow';

const STEPS = [
  { id: 1, name: 'Email', description: 'Usuario informa mail' },
  { id: 2, name: 'Validación', description: 'Verificación iniciada' },
  { id: 3, name: 'DNI', description: 'Informa DNI y datos personales' },
  { id: 4, name: 'Teléfono', description: 'Verificación de teléfono' },
  { id: 5, name: 'Cuenta OK', description: 'Cuenta verificada' },
  { id: 6, name: 'Home', description: 'Bienvenido' },
];

const KYCFlow = () => {
  const {
    currentStep,
    formData,
    showError,
    isLoading,
    handleNext,
    handlePrevious,
    handleRetry,
    handleReset,
    updateFormData,
    canProceed,
  } = useKYCFlow();

  if (showError) return <ErrorScreen onRetry={handleRetry} onClose={handleReset} />;
  if (currentStep === 6) return <HomeScreen formData={formData} onReset={handleReset} />;

  const renderContent = () => {
    if (isLoading) {
      return (
        <Container centered minHeight="24rem">
          <Loader description="Procesando información..." />
        </Container>
      );
    }

    const stepComponents: Record<number, React.ReactElement> = {
      1: <EmailRegister email={formData.email} onEmailChange={(value) => updateFormData('email', value)} />,
      2: <ValidationSuccess />,
      3: (
        <DNICapture
          name={formData.name}
          dni={formData.dni}
          gender={formData.gender}
          dateOfBirth={formData.dateOfBirth}
          onNameChange={(value) => updateFormData('name', value)}
          onDniChange={(value) => updateFormData('dni', value)}
          onGenderChange={(value) => updateFormData('gender', value)}
          onDateOfBirthChange={(value) => updateFormData('dateOfBirth', value)}
        />
      ),
      4: <PhoneVerification phone={formData.phone} onPhoneChange={(value) => updateFormData('phone', value)} />,
      5: <AccountCreated referenciaId={formData.referenciaId} />,
    };

    return stepComponents[currentStep] || null;
  };

  return (
    <Container centered minHeight="100vh">
      <div style={{ width: '100%', maxWidth: '42rem', padding: '1rem 1rem 3rem' }}>
        <PageHeader title="Crear Cuenta" subtitle="Completa tu verificación de identidad" />

        <FormLayout
          steps={STEPS}
          currentStep={currentStep}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canProceed={canProceed()}
          isLoading={isLoading}
          nextLabel={currentStep === 5 ? 'Ir a Home' : 'Siguiente'}
        >
          {renderContent()}
        </FormLayout>
      </div>
    </Container>
  );
};

export default KYCFlow;
