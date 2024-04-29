import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id?: number;
  nickname?: string;
  profileImageUrl?: string;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType>({ user: {}, setUser: () => {} });

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react/function-component-definition
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({});

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
