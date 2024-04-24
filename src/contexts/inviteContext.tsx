'use client';

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import invitedBoardData from '@/components/InvitedBoard/mockData';

interface InviteProviderProps {
  children: ReactNode;
}

interface Inviter {
  nickname: string;
  email: string;
  id: number;
}

interface Dashboard {
  title: string;
  id: number;
}

export interface Invitation {
  id: number;
  inviter: Inviter;
  teamId: string;
  dashboard: Dashboard;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InvitationData {
  id: number;
  nickname: string;
  title: string;
  inviteAccepted: boolean;
}

interface InviteValues {
  invitationData: InvitationData[];
  cursorId: number;
  setInvitationData: (newData: InvitationData[] | ((prevState: InvitationData[]) => InvitationData[])) => void;
  searchInvitation: (keyword: string) => void;
  acceptInvitation: (id: number) => void;
  rejectInvitation: (id: number) => void;
}

const defaultValues: InviteValues = {
  invitationData: [],
  cursorId: 0,
  setInvitationData: () => {},
  searchInvitation: () => {},
  acceptInvitation: () => {},
  rejectInvitation: () => {},
};

const InviteContext = createContext<InviteValues>(defaultValues);

const useFormatInviteData = (inviteList: Invitation[]) =>
  inviteList.map(({ id, inviter: { nickname }, dashboard: { title }, inviteAccepted }) => ({
    id,
    nickname,
    title,
    inviteAccepted,
  }));

export function InviteProvider({ children }: InviteProviderProps) {
  const [invitationData, setInvitationData] = useState<InvitationData[]>([]);
  const { cursorId, invitations } = invitedBoardData;
  const formatInvitedData = useFormatInviteData(invitations).filter((data) => data.inviteAccepted !== true);

  const searchInvitation = (keyword: string) => {
    if (keyword.trim() === '') {
      setInvitationData(formatInvitedData);
    }

    const nextInvitedData = formatInvitedData.filter((data) => data.title.includes(keyword));
    setInvitationData(nextInvitedData);
  };

  const acceptInvitation = (id: number) => {
    /**
     * @TODO
     * PUT Request /invitations/{invitationId}
     * payload: {'inviteAccepted': true}
     */
    console.log('accept ', id);
  };

  const rejectInvitation = (id: number) => {
    /**
     * @TODO
     * PUT Request /invitations/{invitationId}
     * payload: {'inviteAccepted': false}
     * 근데 기본이 false인 상태라면 거절해도 계속 초대 목록에 남아있는게 아닌가?
     * 별도의 처리로 자동 변경되는건지? 실제 데이터 통신으로 확인해볼 것
     */
    console.log('reject', id);
  };

  /**
   * @TODOS
   * -실제 데이터 가져오기
   * -로직 다듬기
   */
  useEffect(() => {
    setInvitationData(() => formatInvitedData);
  }, []);

  const value = useMemo(
    () => ({ invitationData, cursorId, setInvitationData, searchInvitation, acceptInvitation, rejectInvitation }),
    [invitationData, cursorId]
  );

  return <InviteContext.Provider value={value}>{children}</InviteContext.Provider>;
}

export const useInvite = () => {
  const context = useContext(InviteContext);

  if (!context) {
    throw new Error('useInvite는 InviteProvider 내부에서 사용되어야 합니다.');
  }

  return context;
};
