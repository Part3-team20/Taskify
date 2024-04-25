import React, { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function ModalPortal({ children }: { children: ReactElement | null }) {
  const [mounted, setMounted] = useState<boolean>(false);

  // SSR에서 document에 접근하려고 하면 에러가 나므로, CSR을 마친 후 동작하도록 함
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (typeof window === 'undefined') return <></>;

<<<<<<< HEAD
  // eslint-disable-next-line react/jsx-no-useless-fragment
=======
  const el = document.getElementById('modal-root') as HTMLElement;

>>>>>>> main
  return mounted ? createPortal(children, el) : <></>;
}

export default ModalPortal;
