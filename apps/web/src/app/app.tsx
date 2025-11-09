import KYCFlow from './components/kyc-flow';
import './styles.css';

export function App() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)'
    }}>
      <KYCFlow />
    </main>
  );
}

export default App;