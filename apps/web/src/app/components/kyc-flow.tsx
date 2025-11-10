import EmailRegister from './steps/email-register';
import DNICapture from './steps/dni-capture';
import PhoneVerification from './steps/phone-verification';
import OtpVerification from './steps/otp-verification';
import Affidavit from './steps/affidavit';
import HomeScreen from './steps/home-screen';
import ErrorScreen from './steps/error-screen';
import { ValidationSuccess } from './steps/validation-success';
import { AccountCreated } from './steps/account-created';
import { Loader } from './loader';
import { FormLayout } from './form-layout';
import { Container } from './ui/container';
import { PageHeader } from './ui/page-header';
import { useKYCFlow } from '../hooks/useKYCFlow';

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
    handlePhoneValidation,
    canProceed,
  } = useKYCFlow();

  if (showError) return <ErrorScreen onRetry={handleRetry} onClose={handleReset} />;
  if (currentStep === 8) return <HomeScreen formData={formData} onReset={handleReset} />;

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
          dni={formData.dni}
          gender={formData.gender}
          onDniChange={(value) => updateFormData('dni', value)}
          onGenderChange={(value) => updateFormData('gender', value)}
        />
      ),
      4: (
        <PhoneVerification 
          phone={formData.phone} 
          clientId={formData.clientId} 
          onPhoneChange={(value) => updateFormData('phone', value)}
          onValidationComplete={handlePhoneValidation}
        />
      ),
      5: <OtpVerification phone={formData.phone} otp={formData.otp} otpCode={formData.otpCode} onOtpChange={(value) => updateFormData('otp', value)} />,
      6: <Affidavit accepted={formData.affidavitAccepted} onAcceptChange={(value) => updateFormData('affidavitAccepted', value)} />,
      7: <AccountCreated referenciaId={formData.referenciaId} />,
    };

    return stepComponents[currentStep] || null;
  };

  return (
    <Container centered minHeight="100vh">
      <div style={{ width: '100%', maxWidth: '42rem', padding: '1rem 1rem 3rem' }}>
        <PageHeader title="Crear Cuenta" subtitle="Completa tu verificación de identidad" />

        <FormLayout
          currentStep={currentStep}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canProceed={canProceed()}
          isLoading={isLoading}
          nextLabel={currentStep === 7 ? 'Ir a Home' : 'Siguiente'}
        >
          {renderContent()}
        </FormLayout>
      </div>
    </Container>
  );
};

export default KYCFlow;
