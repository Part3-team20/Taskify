'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserProvider } from '@/contexts/userContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (router && accessToken) {
      router.push('/mydashboard');
    }
  }, []);

  return (
    <UserProvider>
      <div>{children}</div>
    </UserProvider>
  );
}
