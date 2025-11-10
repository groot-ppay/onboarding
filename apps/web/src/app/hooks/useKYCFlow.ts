import { useState } from 'react';
import { useClient } from '../context/ClientContext';
import { PhoneValidationResponse } from '../types/phone-validation.types';

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
    referenciaId: 'KYC-2025-001122',
  });
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        setCurrentStep(currentStep + 1);
        setShowError(false);
      } catch (error) {
        console.error('Error registering client:', error);
        setShowError(true);
      } finally {
        setIsLoading(false);
      }
    } else if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
      setShowError(false);
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
      referenciaId: 'KYC-2025-001122',
    });
    clearClientData();
    setShowError(false);
    globalThis.history.pushState({}, '', '/login');
    globalThis.dispatchEvent(new PopStateEvent('popstate'));
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhoneValidation = (response: PhoneValidationResponse) => {
    if (response.state === 'PENDING' && response.strategy === 'OTP') {
      setFormData((prev) => ({ ...prev, otpCode: response.code.toString() }));
      setCurrentStep(5);
    } else if (response.state === 'VALIDATED' && response.strategy === 'SILENT_VALIDATION') {
      setCurrentStep(6);
    }
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
    handleNext,
    handlePrevious,
    handleRetry,
    handleReset,
    updateFormData,
    handlePhoneValidation,
    canProceed,
  };
};
