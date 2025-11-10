import { useState } from 'react';
import { LoginResponse } from '../types/login.types';
import logo from '../../assets/personal_pay_logo.svg';
import styles from './login.module.css';

interface LoginProps {
  readonly onLogin: (email: string, loginResponse: LoginResponse) => void;
  readonly onLoadingChange: (loading: boolean) => void;
}

export default function Login({ onLogin, onLoadingChange }: LoginProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    onLoadingChange(true);
    try {
      const response = await fetch('http://localhost:3000/client/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data: LoginResponse = await response.json();
      console.log('Login response:', data);

      if (response.ok) {
        onLogin(email, data);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      onLoadingChange(false);
    }
  };

  const canSubmit = email.includes('@') && !isLoading;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <img src={logo} alt="Personal Pay" style={{ width: '200px', marginBottom: '1rem', filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(246deg) brightness(104%) contrast(97%)' }} />
            <p className={styles.subtitle}>Inicia sesión en tu cuenta</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className={styles.input}
              />
            </div>

            <button type="submit" disabled={!canSubmit} className={styles.button}>
              {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className={styles.divider}>
            <p className={styles.dividerText}>
              ¿No tienes cuenta?{' '}
              <a
                href="/register"
                onClick={(e) => {
                  e.preventDefault();
                  globalThis.history.pushState({}, '', '/register');
                  globalThis.dispatchEvent(new PopStateEvent('popstate'));
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
