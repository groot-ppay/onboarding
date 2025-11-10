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

export const validatePhone = async (clientId: string, phoneNumber: string): Promise<PhoneValidationResponse | null> => {
  try {
    const response = await fetch('http://localhost:3000/client/phone-validation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, phoneNumber }),
    });

    const data: PhoneValidationResponse = await response.json();
    console.log('Phone validation response:', data);
    return response.ok ? data : null;
  } catch (error) {
    console.error('Error validating phone:', error);
    return null;
  }
};

export default function PhoneVerification({ phone, clientId, onPhoneChange, onValidationComplete }: PhoneVerificationProps) {

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

        <div className={styles.grayBox} style={{ marginTop: '1rem' }}>
          <p className={styles.grayText}>
            Conectando a las APIs de verificación para validar tu teléfono...
          </p>
        </div>
      </div>
    </div>
  );
}
