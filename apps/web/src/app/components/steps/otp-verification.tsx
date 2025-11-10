import { useState, useRef, useEffect } from 'react';
import styles from './steps.module.css';

export interface OtpVerificationProps {
  phone: string;
  otp: string;
  onOtpChange: (value: string) => void;
}

export default function OtpVerification({ phone, otp, onOtpChange }: OtpVerificationProps) {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    onOtpChange(newDigits.join(''));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newDigits = [...otpDigits];
    
    pastedData.forEach((char, i) => {
      if (/^\d$/.test(char) && i < 6) {
        newDigits[i] = char;
      }
    });
    
    setOtpDigits(newDigits);
    onOtpChange(newDigits.join(''));
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  return (
    <div>
      <h2 className={styles.title}>Verificación OTP</h2>
      <p className={styles.subtitle}>Ingresa el código de 6 dígitos enviado a {phone}</p>

      <div className={styles.form}>
        <div className={styles.otpContainer}>
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
              onPaste={handlePaste}
              className={`${styles.otpInput} ${digit ? styles.otpInputFilled : ''}`}
            />
          ))}
        </div>

        <div className={styles.resendBox}>
          <p className={styles.resendText}>¿No recibiste el código?</p>
          <button type="button" className={styles.resendButton}>
            Reenviar código
          </button>
        </div>
      </div>
    </div>
  );
}
