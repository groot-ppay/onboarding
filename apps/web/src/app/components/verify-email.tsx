import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { Loader } from './loader';
import styles from './verify-email.module.css';

interface VerifyEmailProps {
  email: string;
}

export default function VerifyEmail({ email }: VerifyEmailProps) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const verifyTimer = setTimeout(() => {
      setShowLoader(true);
      
      const redirectTimer = setTimeout(() => {
        window.history.pushState({}, '', '/home');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, 1500);

      return () => clearTimeout(redirectTimer);
    }, 3000);

    return () => clearTimeout(verifyTimer);
  }, []);

  if (showLoader) {
    return (
      <div className={styles.loaderContainer}>
        <Loader description="Verificando..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Mail size={32} color="white" />
          </div>

          <h1 className={styles.title}>Verifica tu correo</h1>
          <p className={styles.subtitle}>Hemos enviado un enlace de verificación a</p>

          <div className={styles.emailBox}>
            <p className={styles.email}>{email}</p>
          </div>

          <p className={styles.info}>Haz clic en el enlace del correo para continuar</p>

          <div className={styles.divider}>
            <p className={styles.resendText}>¿No recibiste el correo?</p>
            <button type="button" className={styles.resendButton}>
              Reenviar correo
            </button>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>© 2025 Personal Pay - Hackaton Project</p>
        </div>
      </div>
    </div>
  );
}
