import React, { useState } from 'react';
import Modal from './Modal';

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
      <Modal isOpen={isOpen} onClose={handleCloseModal} style={{ width: '500px', height: '900px' }}>
        <div>modal내용</div>
      </Modal>
    </div>
  );
}
