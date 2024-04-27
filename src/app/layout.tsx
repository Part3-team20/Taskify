import React from 'react';
import '@/styles/globals.scss';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'Taskify',
  description: 'Taskify 할일 관리',
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
