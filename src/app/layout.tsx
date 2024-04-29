import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import '@/styles/globals.scss';

export const metadata = {
  title: 'Taskify',
  description: '새로운 일정 관리, Taskify',
  icons: {
    icon: '/images/mainLogo.svg',
  },
  openGraph: {
    title: 'Taskify',
    description: '새로운 일정 관리, Taskify',
    locale: 'ko_KR',
    type: 'website',
    url: 'https://taskify-4-20.vercel.app/',
    images: {
      url: '/images/og.png',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <div id="modal-root" />
        <ToastContainer />
      </body>
    </html>
  );
}
