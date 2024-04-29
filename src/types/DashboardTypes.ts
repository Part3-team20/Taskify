// types/DashboardTypes.ts
export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  createdByMe: boolean;
}

export interface Column {
  id: number;
  title: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
  cards?: CardObject[];
}

export interface CardObject {
  totalCount?: number;
  id?: number;
  title: string;
  description?: string;
  tags?: string[];
  dueDate?: string;
  assignee: {
    id?: number;
    nickname?: string;
    profileImageUrl?: string;
  };
  imageUrl?: string;
}

export interface CommentProps {
  id: number;
  content: string;
  createdAt: string;
  cardId: number;
  author: {
    id: number;
    nickname: string;
    profileImageUrl?: string | null;
  };
}
