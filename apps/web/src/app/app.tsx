import { useState, useEffect } from 'react';
import { Router, navigate } from './router';
import Login from './components/login';
import LoginOtp from './components/login-otp';
import VerifyEmail from './components/verify-email';
import Home from './components/home';
import KYCFlow from './components/kyc-flow';
import { Loader } from './components/loader';
import { ClientProvider, useClient } from './context/ClientContext';
import { LoginResponse } from './types/login.types';
import './styles.css';

function AppContent() {
  const { setClientData } = useClient();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(globalThis.location.pathname);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginOtpCode, setLoginOtpCode] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(globalThis.location.pathname);
      setIsLoading(false);
    };

    globalThis.addEventListener('popstate', handlePopState);
    return () => globalThis.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogin = (email: string, loginResponse: LoginResponse) => {
    setLoginEmail(email);
    setClientData(loginResponse);
    setIsLoading(true);
    
    setTimeout(() => {
      if (loginResponse.state === 'VALIDATED' && loginResponse.strategy === 'SILENT_VALIDATION') {
        navigate('/verify-email');
        setCurrentPath('/verify-email');
      } else if (loginResponse.state === 'PENDING' && loginResponse.strategy === 'OTP') {
        setLoginOtpCode(loginResponse.code.toString());
        navigate('/login-otp');
        setCurrentPath('/login-otp');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleLoginOtpSuccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/verify-email');
      setCurrentPath('/verify-email');
      setIsLoading(false);
    }, 800);
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
      component: <Login onLogin={handleLogin} onLoadingChange={setIsLoading} />
    },
    {
      path: '/login-otp',
      component: <LoginOtp email={loginEmail} otpCode={loginOtpCode} onSuccess={handleLoginOtpSuccess} />
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
      component: <Login onLogin={handleLogin} onLoadingChange={setIsLoading} />
    }
  ];

  return <Router routes={routes} defaultPath="/login" />;
}

export function App() {
  return (
    <ClientProvider>
      <AppContent />
    </ClientProvider>
  );
}

export default App;