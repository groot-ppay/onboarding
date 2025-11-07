import { useEffect, useState } from 'react';

export function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(() => setMessage('Error connecting to API'));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 Frontend React</h1>
      <p>Mensaje del backend: <strong>{message}</strong></p>
      <p>Frontend corriendo en puerto 4200</p>
      <p>Backend corriendo en puerto 3000</p>
    </div>
  );
}

export default App;