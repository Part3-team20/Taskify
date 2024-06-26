import useFetchWithToken from '@/hooks/useFetchToken';
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Toast from '@/util/Toast';
import { DASHBOARDS } from '@/constants/ApiUrl';
import { Dashboard } from '@/types/DashboardTypes';
import { useParams } from 'next/navigation';

interface DashboardContextProps {
  children: ReactNode;
}

interface DashboardState {
  dashboards: Dashboard[];
  totalCount: number;
  page: number;
}

interface DashboardValues {
  dashboardId: number | null;
  myDashboards: DashboardState;
  setMyDashboards: (newData: DashboardState | ((prevState: DashboardState) => DashboardState)) => void;
  sideDashboards: DashboardState;
  setSideDashboards: (newData: DashboardState | ((prevState: DashboardState) => DashboardState)) => void;
  getDashboardsData: (size: number, setter: React.Dispatch<React.SetStateAction<DashboardState>>, page: number) => void;
  reloadDashboard: (myDashboardsPage: number, sideDashboardsPage: number) => void;
}

const defaultValues: DashboardValues = {
  dashboardId: null,
  myDashboards: { dashboards: [], totalCount: 0, page: 1 },
  setMyDashboards: () => {},
  sideDashboards: { dashboards: [], totalCount: 0, page: 1 },
  setSideDashboards: () => {},
  getDashboardsData: () => {},
  reloadDashboard: () => {},
};

const dashboardContext = createContext<DashboardValues>(defaultValues);

export function DashboardProvider({ children }: DashboardContextProps) {
  const initialDashboards = { dashboards: [], totalCount: 0, page: 1 };
  const [sideDashboards, setSideDashboards] = useState<DashboardState>(initialDashboards);
  const [myDashboards, setMyDashboards] = useState<DashboardState>(initialDashboards);
  const [dashboardId, setDashboardId] = useState<number | null>(null);

  const params = useParams();

  const { fetchWithToken: getDashboards } = useFetchWithToken();

  const getDashboardsData = useCallback(
    async (size: number, setter: React.Dispatch<React.SetStateAction<DashboardState>>, page: number = 1) => {
      try {
        const response = await getDashboards(`${DASHBOARDS}?navigationMethod=pagination&page=${page}&size=${size}`);
        if (response) {
          setter({
            dashboards: response.dashboards,
            totalCount: response.totalCount,
            page,
          });
        }
      } catch (error) {
        console.log(error);
        Toast.error('대시보드 정보를 불러오는데 실패했어요.');
      }
    },
    []
  );

  const reloadDashboard = async (myDashboardsPage: number, sideDashboardsPage: number) => {
    await getDashboardsData(5, setMyDashboards, myDashboardsPage);
    await getDashboardsData(10, setSideDashboards, sideDashboardsPage);
  };

  // 초기 데이터 불러오기
  useEffect(() => {
    getDashboardsData(5, setMyDashboards);
    getDashboardsData(10, setSideDashboards);
  }, []);

  useEffect(() => {
    if (params) {
      setDashboardId(Number(params.boardId));
    }
  }, [params]);

  const value = useMemo(
    () => ({
      dashboardId,
      myDashboards,
      setMyDashboards,
      sideDashboards,
      setSideDashboards,
      getDashboardsData,
      reloadDashboard,
    }),
    [myDashboards.dashboards, sideDashboards.dashboards, dashboardId]
  );

  return <dashboardContext.Provider value={value}>{children}</dashboardContext.Provider>;
}

export const useDashboard = () => {
  const context = useContext(dashboardContext);

  if (!context) {
    throw new Error('useDashboard는 DashboardProvider 내부에서 사용되어야 합니다.');
  }

  return context;
};
