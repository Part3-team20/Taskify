import React, { ReactNode, createContext, useContext } from 'react';

interface IdProviderProps {
  children: ReactNode;
  boardId: number | undefined; // boardId의 타입을 명시합니다.
}

const IdContext = createContext<number | undefined>(undefined);

export function useBoardId() {
  return useContext(IdContext);
}

export default function IdProvider({ children, boardId }: IdProviderProps) {
  return <IdContext.Provider value={boardId}>{children}</IdContext.Provider>;
}
