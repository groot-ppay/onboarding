import { createContext, useContext, useState, ReactNode } from 'react';

interface ClientData {
  id: string;
  email: string;
  [key: string]: any;
}

interface ClientContextType {
  clientData: ClientData | null;
  setClientData: (data: ClientData) => void;
  clearClientData: () => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [clientData, setClientDataState] = useState<ClientData | null>(null);

  const setClientData = (data: ClientData) => {
    console.log('ClientContext - Setting client data:', data);
    setClientDataState(data);
  };

  const clearClientData = () => {
    setClientDataState(null);
  };

  return (
    <ClientContext.Provider value={{ clientData, setClientData, clearClientData }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within ClientProvider');
  }
  return context;
};
