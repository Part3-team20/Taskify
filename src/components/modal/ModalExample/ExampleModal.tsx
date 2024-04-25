'use client';

import React, { useState } from 'react';
<<<<<<< HEAD:src/components/modal/ModalExample/ExampleModal.tsx
import Modal from '../index';
=======
import Modal from '..';
>>>>>>> main:src/components/modal/modalExample/ExampleModal.tsx

// example
export default function ExampleModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        모달열기
      </button>
      <Modal isOpen={isOpen} onClose={handleCloseModal} style={{ width: '31.25rem', height: '56.25rem' }}>
        <div>modal내용</div>
      </Modal>
    </div>
  );
}
