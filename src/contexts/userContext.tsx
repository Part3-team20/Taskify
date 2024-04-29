import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

  useEffect(() => {
    // 컴포넌트 마운트 시 로컬 스토리지에서 userId 불러오기
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  useEffect(() => {
    console.log('현재 userId 상태:', userId);
  }, [userId]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <UserContext.Provider value={{ userId, setUserId }}>{children}</UserContext.Provider>;
}
