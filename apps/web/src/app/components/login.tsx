import { useState } from 'react';
import { LogIn } from 'lucide-react';
import styles from './login.module.css';

interface LoginProps {
  onLogin: (email: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email);
    }
  };

  const canSubmit = email.includes('@');

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.iconWrapper}>
              <LogIn size={32} color="white" />
            </div>
            <h1 className={styles.title}>Personal Pay</h1>
            <p className={styles.subtitle}>Inicia sesión en tu cuenta</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className={styles.input}
              />
            </div>

            <button type="submit" disabled={!canSubmit} className={styles.button}>
              Iniciar Sesión
            </button>
          </form>

          <div className={styles.divider}>
            <p className={styles.dividerText}>
              ¿No tienes cuenta?{' '}
              <a
                href="/register"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '/register');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className={styles.link}
              >
                Crear cuenta
              </a>
            </p>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>© 2025 Personal Pay - Hackaton Project</p>
        </div>
      </div>
    </div>
  );
}
