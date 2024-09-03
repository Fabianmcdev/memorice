
import { createContext, useContext, useState, ReactNode } from 'react';
import { UserContextType } from '../types/definitions';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState<UserContextType['isGameOver']>();

  return (
    <UserContext.Provider value={{ user, setUser, isGameOver, setIsGameOver }}>
      {children}
    </UserContext.Provider>
  );
};