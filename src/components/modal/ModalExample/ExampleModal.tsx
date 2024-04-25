'use client';

import React, { useState } from 'react';
import Modal from '../index';

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
