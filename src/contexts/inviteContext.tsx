'use client';

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import useFetchWithToken from '@/hooks/useFetchToken';

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
  cursorId: number | null;
  setInvitationData: (newData: InvitationData[] | ((prevState: InvitationData[]) => InvitationData[])) => void;
  searchInvitation: (keyword: string) => void;
  acceptInvitation: (id: number) => void;
  rejectInvitation: (id: number) => void;
}

const defaultValues: InviteValues = {
  invitationData: [],
  cursorId: null,
  setInvitationData: () => {},
  searchInvitation: () => {},
  acceptInvitation: () => {},
  rejectInvitation: () => {},
};

const InviteContext = createContext<InviteValues>(defaultValues);

const formatInviteData = (inviteList: Invitation[]) =>
  inviteList.map(({ id, inviter: { nickname }, dashboard: { title }, inviteAccepted }) => ({
    id,
    nickname,
    title,
    inviteAccepted,
  }));

export function InviteProvider({ children }: InviteProviderProps) {
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [invitationData, setInvitationData] = useState<InvitationData[]>([]);

  /**
   * @TODO
   * -로딩 관련 처리?
   * -url env
   */
  const {
    fetchWithToken: inviteResponse,
    error: inviteConfirmError,
    // loading: inviteConfirmLoading,
  } = useFetchWithToken();

  const {
    fetchWithToken: getInvitations,
    error: getInvitationError,
    // loading: getInvitatioLoading,
  } = useFetchWithToken();

  const searchInvitation = (keyword: string) => {
    if (keyword.trim() === '') {
      setInvitationData(formatInviteData(invitations));
    } else {
      const nextInvitedData = formatInviteData(invitations).filter((data) => data.title.includes(keyword));
      setInvitationData(nextInvitedData);
    }
  };

  const acceptInvitation = async (id: number) => {
    try {
      await inviteResponse(`https://sp-taskify-api.vercel.app/4-20/invitations/${id}`, 'PUT', {
        inviteAccepted: true,
      });
    } catch (error) {
      console.log(inviteConfirmError);
    }
  };

  const rejectInvitation = async (id: number) => {
    try {
      await inviteResponse(`https://sp-taskify-api.vercel.app/4-20/invitations/${id}`, 'PUT', {
        inviteAccepted: false,
      });
    } catch (error) {
      console.log(inviteConfirmError);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInvitations(`https://sp-taskify-api.vercel.app/4-20/invitations?size=10`, 'GET');
        if (response) {
          setInvitations(response.invitations);
          setCursorId(response.cursorId);
          const formatInvitedData = formatInviteData(response.invitations).filter((data) => !data.inviteAccepted);
          setInvitationData(formatInvitedData);
        }
      } catch (error) {
        console.log(getInvitationError);
      }
    };
    fetchData();

    // const formatInvitedData = formatInviteData(invitations).filter((data) => data.inviteAccepted !== true);
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
