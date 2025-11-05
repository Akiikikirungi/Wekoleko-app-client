// src/components/molecules/Modal/Modal.tsx

import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Typography from '../../atoms/Typography';
import { 
  MotionOverlay,
  MotionModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton 
} from './Modal.styles';
import { FaTimes } from 'react-icons/fa';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
  closeOnOverlayClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = '600px',
  closeOnOverlayClick = true
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleModalContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeOnOverlayClick ? onClose : undefined}
        >
          <MotionModalContainer
            onClick={handleModalContainerClick}
            style={{ maxWidth }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            {title && (
              <ModalHeader>
                <Typography variant="h4">{title}</Typography>
                <CloseButton onClick={onClose}>
                  <FaTimes />
                </CloseButton>
              </ModalHeader>
            )}
            
            <ModalBody>{children}</ModalBody>
            
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </MotionModalContainer>
        </MotionOverlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;