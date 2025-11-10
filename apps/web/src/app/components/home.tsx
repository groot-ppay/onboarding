import { LogOut, Settings } from 'lucide-react';
import logo from '../../assets/personal_pay_logo.svg';
import styles from './home.module.css';

export default function Home() {
  const handleLogout = () => {
    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <img src={logo} alt="Personal Pay" style={{ width: '180px', marginBottom: '1rem' }} />
            <h1 className={styles.title}>Bienvenido</h1>
            <p className={styles.subtitle}>Tu cuenta está activa</p>
          </div>

          <div className={styles.card}>
            <div className={styles.infoList}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>usuario@email.com</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Nombre</span>
                <span className={styles.infoValue}>Usuario Demo</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Estado</span>
                <span className={styles.infoValueSuccess}>Activo</span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={`${styles.button} ${styles.buttonPrimary}`}>
              <Settings size={20} />
              Mi Cuenta
            </button>
            <button onClick={handleLogout} className={`${styles.button} ${styles.buttonSecondary}`}>
              <LogOut size={20} />
              Cerrar sesión
            </button>
          </div>

          <div className={styles.footer}>
            <p className={styles.footerText}>© 2025 Personal Pay - Hackaton Project</p>
          </div>
        </div>
      </div>
    </div>
  );
}
