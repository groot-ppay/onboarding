import { useState } from 'react';
import { useClient } from '../../context/ClientContext';
import { PhoneValidationResponse } from '../../types/phone-validation.types';
import styles from './steps.module.css';

export interface PhoneVerificationProps {
  phone: string;
  clientId: string;
  onPhoneChange: (value: string) => void;
  onValidationComplete: (response: PhoneValidationResponse) => void;
}

export default function PhoneVerification({ phone, clientId, onPhoneChange, onValidationComplete }: PhoneVerificationProps) {
  const { clientData } = useClient();
  const [isValidating, setIsValidating] = useState(false);
  
  console.log('PhoneVerification - clientData:', clientData, 'phone:', phone);

  const handleValidatePhone = async () => {
    if (!phone || !clientData?.clientId) return;

    setIsValidating(true);
    try {
      const response = await fetch('http://localhost:3000/client/phone-validation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: clientData.clientId,
          phoneNumber: phone,
        }),
      });

      const data: PhoneValidationResponse = await response.json();
      console.log('Phone validation response:', data);
      
      onValidationComplete(data);
    } catch (error) {
      console.error('Error validating phone:', error);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Verificación de Teléfono</h2>
      <p className={styles.subtitle}>Ingresa tu número de teléfono para la verificación</p>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Teléfono</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="+54 9 11 1234-5678"
            className={styles.input}
          />
        </div>

        <button
          type="button"
          onClick={handleValidatePhone}
          disabled={!phone || isValidating}
          className={styles.validateButton}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: phone && !isValidating ? 'pointer' : 'not-allowed',
            opacity: phone && !isValidating ? 1 : 0.5,
          }}
        >
          {isValidating ? 'Validando...' : 'Validar Teléfono'}
        </button>

        <div className={styles.grayBox}>
          <p className={styles.grayText}>
            Conectando a las APIs de verificación para validar tu teléfono...
          </p>
        </div>
      </div>
    </div>
  );
}
