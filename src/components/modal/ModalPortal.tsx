import React, { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Potal
function ModalPortal({ children }: { children: ReactElement }) {
  const [mounted, setMounted] = useState<boolean>(false);

  const el = document.getElementById('modal-root') as HTMLElement;

  // SSR에서 document에 접근하려고 하면 에러가 나므로, CSR을 마친 후 동작하도록 함
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === 'undefined') return <></>;

  return mounted ? createPortal(children, el) : <></>;
}

export default ModalPortal;
