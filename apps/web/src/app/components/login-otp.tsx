import { useState, useRef, useEffect } from 'react';
import { useClient } from '../context/ClientContext';
import styles from './login.module.css';

interface LoginOtpProps {
  email: string;
  otpCode: string;
  onSuccess: () => void;
}

export default function LoginOtp({ email, otpCode, onSuccess }: LoginOtpProps) {
  const { clientData } = useClient();
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [isValidating, setIsValidating] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (otpCode) {
      const codeStr = otpCode.toString().padStart(6, '0');
      const digits = codeStr.split('').slice(0, 6);
      setOtpDigits(digits);
    }
  }, [otpCode]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleValidateOtp = async () => {
    const otp = otpDigits.join('');
    if (otp.length !== 6 || !clientData?.clientId) return;

    setIsValidating(true);
    try {
      const response = await fetch('http://localhost:3000/client/otp-validation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: clientData.clientId,
          phoneNumber: email,
          otp: otp,
        }),
      });

      const data = await response.json();
      console.log('Login OTP validation response:', data);

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error validating login OTP:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const otp = otpDigits.join('');
  const canSubmit = otp.length === 6 && !isValidating;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Verificación OTP</h1>
            <p className={styles.subtitle}>Ingresa el código de 6 dígitos enviado a {email}</p>
          </div>

          <div style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  style={{
                    width: '3rem',
                    height: '3.5rem',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    outline: 'none',
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleValidateOtp}
              disabled={!canSubmit}
              className={styles.button}
              style={{ marginTop: '2rem' }}
            >
              {isValidating ? 'Validando...' : 'Verificar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
