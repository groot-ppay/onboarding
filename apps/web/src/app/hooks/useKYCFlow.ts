import { useState, useEffect } from 'react';
import { useClient } from '../context/ClientContext';
import { PhoneValidationResponse } from '../types/phone-validation.types';
import { validateOtp } from '../components/steps/otp-verification';
import { validatePhone } from '../components/steps/phone-verification';

const generateReferenceId = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `KYC-${year}-${randomNum}`;
};

export const useKYCFlow = () => {
  const { clientData, setClientData, clearClientData } = useClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    clientId: '',
    gender: '',
    dni: '',
    phone: '',
    otp: '',
    otpCode: '',
    affidavitAccepted: false,
    referenciaId: generateReferenceId(),
  });
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Siguiente');



  useEffect(() => {
    // Actualizar el label cuando cambia el step
    if (currentStep === 4) {
      setButtonLabel('Validar Teléfono');
    } else if (currentStep === 5) {
      setButtonLabel('Validar OTP');
    } else if (currentStep === 7) {
      setButtonLabel('Ir a Home');
    } else {
      setButtonLabel('Siguiente');
    }
  }, [currentStep]);

  const handleNext = async () => {
    if (currentStep === 1) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/client', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email }),
        });

        if (!response.ok) {
          setShowError(true);
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        console.log('Client registration response:', data);
        setClientData(data);
        setFormData((prev) => ({ ...prev, clientId: data.id }));
        
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
          setShowError(false);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error registering client:', error);
        setShowError(true);
        setIsLoading(false);
      }
    } else if (currentStep === 4) {
      setIsLoading(true);
      const validationResponse = await validatePhone(clientData?.clientId || '', formData.phone);
      if (!validationResponse) {
        setShowError(true);
        setIsLoading(false);
        return;
      }
      
      setTimeout(() => {
        if (validationResponse.state === 'PENDING' && validationResponse.strategy === 'OTP') {
          setFormData((prev) => ({ ...prev, otpCode: validationResponse.code.toString() }));
          setCurrentStep(5);
        } else if (validationResponse.state === 'VALIDATED' && validationResponse.strategy === 'SILENT_VALIDATION') {
          setCurrentStep(6);
        }
        setIsLoading(false);
      }, 800);
    } else if (currentStep === 5) {
      setIsLoading(true);
      const isValid = await validateOtp(clientData?.clientId || '', formData.phone, formData.otp);
      if (!isValid) {
        setShowError(true);
        setIsLoading(false);
        return;
      }
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setShowError(false);
        setIsLoading(false);
      }, 800);
    } else if (currentStep < 8) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setShowError(false);
        setIsLoading(false);
      }, 800);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowError(false);
    }
  };

  const handleRetry = () => setShowError(false);

  const handleReset = () => {
    setCurrentStep(1);
    setFormData({
      email: '',
      clientId: '',
      gender: '',
      dni: '',
      phone: '',
      otp: '',
      otpCode: '',
      affidavitAccepted: false,
      referenciaId: generateReferenceId(),
    });
    clearClientData();
    setShowError(false);
    globalThis.history.pushState({}, '', '/login');
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return formData.email.includes('@');
      case 3:
        return !!(formData.dni && formData.gender);
      case 4:
        return formData.phone.length >= 10;
      case 5:
        console.log('Checking OTP canProceed:', formData.otp, 'length:', formData.otp.length);
        return formData.otp.length === 6;
      case 6:
        return formData.affidavitAccepted;
      default:
        return true;
    }
  };

  return {
    currentStep,
    formData,
    showError,
    isLoading,
    buttonLabel,
    handleNext,
    handlePrevious,
    handleRetry,
    handleReset,
    updateFormData,
    canProceed,
  };
};
