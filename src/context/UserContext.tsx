
import { createContext, useContext, useState, ReactNode } from 'react';
import { UserContextType } from '../types/definitions';

const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook personalizado para acceder al contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};

// Componente proveedor del contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};