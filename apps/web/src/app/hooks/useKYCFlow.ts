import { useState } from 'react';

export const useKYCFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    gender: '',
    name: '',
    dni: '',
    dateOfBirth: '',
    phone: '',
    referenciaId: 'KYC-2025-001122',
  });
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (currentStep < 6) {
        setCurrentStep(currentStep + 1);
        setShowError(false);
      }
      setIsLoading(false);
    }, 2000);
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
      gender: '',
      name: '',
      dni: '',
      dateOfBirth: '',
      phone: '',
      referenciaId: 'KYC-2025-001122',
    });
    setShowError(false);
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.email.includes('@');
      case 3:
        return formData.name && formData.dni && formData.gender && formData.dateOfBirth;
      case 4:
        return formData.phone && formData.phone.length >= 10;
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
    canProceed,
  };
};
