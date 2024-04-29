'use client';

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { INVITATIONS } from '@/constants/ApiUrl';
import useFetchWithToken from '@/hooks/useFetchToken';
import Toast from '@/util/Toast';

interface InviteProviderProps {
  children: ReactNode;
}
export interface Invitation {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationData {
  id: number;
  nickname: string;
  title: string;
  inviteAccepted: boolean;
}

interface InviteValues {
  invitationData: InvitationData[];
  cursorId: number | null;
  setInvitationData: (newData: InvitationData[] | ((prevState: InvitationData[]) => InvitationData[])) => void;
  setCursorId: (newCursorId: number | null) => void;
  searchInvitation: (keyword: string) => void;
  fetchMoreData: (keyword?: string) => void;
  isSearched: boolean;
}

const defaultValues: InviteValues = {
  invitationData: [],
  cursorId: null,
  setInvitationData: () => {},
  setCursorId: () => {},
  searchInvitation: () => {},
  fetchMoreData: () => {},
  isSearched: false,
};

const InviteContext = createContext<InviteValues>(defaultValues);

export const formatInviteData = (inviteList: Invitation[]) =>
  inviteList.map(({ id, inviter: { nickname }, dashboard: { title }, inviteAccepted }) => ({
    id,
    nickname,
    title,
    inviteAccepted,
  }));

export function InviteProvider({ children }: InviteProviderProps) {
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [invitationData, setInvitationData] = useState<InvitationData[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  /**
   * @TODO
   * -로딩 관련 처리?
   */

  const {
    fetchWithToken: getInvitations, // loading: getInvitatioLoading,
  } = useFetchWithToken();

  const fetchMoreData = async (keyword?: string) => {
    const query = isSearched ? `${cursorId}&title=${keyword}` : cursorId;
    try {
      const response = await getInvitations(`${INVITATIONS}?size=10&cursorId=${query}`);
      const newData: InvitationData[] = formatInviteData(response?.invitations);
      setCursorId(response?.cursorId);
      setInvitationData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.log(error);
      Toast.error('정보를 불러오는데 실패했어요.');
    }
  };

  const searchInvitation = async (keyword: string) => {
    if (keyword.trim() === '') {
      setIsSearched(false);

      try {
        const response = await getInvitations(`${INVITATIONS}?size=10`);
        setCursorId(response.cursorId);
        setInvitationData(formatInviteData(response?.invitations));
      } catch (error) {
        console.log(error);
        Toast.error('정보를 불러오는데 실패했어요.');
      }
      return;
    }

    try {
      setIsSearched(true);
      const response = await getInvitations(`${INVITATIONS}?size=10&title=${keyword}`);
      setCursorId(response.cursorId);
      setInvitationData(formatInviteData(response?.invitations));
    } catch (error) {
      console.log(error);
      Toast.error('정보를 불러오는데 실패했어요.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInvitations(`${INVITATIONS}?size=10`);
        if (response) {
          setCursorId(response.cursorId);
          setInvitationData(formatInviteData(response.invitations));
        }
      } catch (error) {
        console.log(error);
        Toast.error('정보를 불러오는데 실패했어요.');
      }
    };
    fetchData();
  }, []);

  const value = useMemo(
    () => ({
      invitationData,
      cursorId,
      setInvitationData,
      searchInvitation,
      setCursorId,
      fetchMoreData,
      isSearched,
    }),
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
