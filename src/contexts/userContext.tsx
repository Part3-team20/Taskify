import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userId: number | null;
  setUserId: (id: number | null) => void;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <UserContext.Provider value={{ userId, setUserId }}>{children}</UserContext.Provider>;
}
