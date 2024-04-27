'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (router && accessToken) {
      router.push('/mydashboard');
    }
  }, []);

  return <div>{children}</div>;
}
