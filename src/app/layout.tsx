import React from 'react';
import '@/styles/globals.scss';

export const metadata = {
  title: 'Tasify',
  description: 'Tasify 할일 관리',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
