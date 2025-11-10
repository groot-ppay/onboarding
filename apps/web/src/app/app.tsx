import { useState, useEffect } from 'react';
import { Router, navigate } from './router';
import Login from './components/login';
import VerifyEmail from './components/verify-email';
import Home from './components/home';
import KYCFlow from './components/kyc-flow';
import { Loader } from './components/loader';
import './styles.css';

export function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(globalThis.location.pathname);
  const [loginEmail, setLoginEmail] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(globalThis.location.pathname);
      setIsLoading(false);
    };

    globalThis.addEventListener('popstate', handlePopState);
    return () => globalThis.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogin = (email: string) => {
    setLoginEmail(email);
    setIsLoading(true);
    setTimeout(() => {
      navigate('/verify-email');
      setCurrentPath('/verify-email');
      setIsLoading(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--primary) 0%, #6d28d9 100%)'
      }}>
        <Loader description="Cargando..." />
      </div>
    );
  }

  const routes = [
    {
      path: '/login',
      component: <Login onLogin={handleLogin} />
    },
    {
      path: '/verify-email',
      component: <VerifyEmail email={loginEmail} />
    },
    {
      path: '/register',
      component: (
        <main style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)'
        }}>
          <KYCFlow />
        </main>
      )
    },
    {
      path: '/home',
      component: <Home />
    },
    {
      path: '/',
      component: <Login onLogin={handleLogin} />
    }
  ];

  return <Router routes={routes} defaultPath="/login" />;
}

export default App;