import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import '@/styles/globals.scss';

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
