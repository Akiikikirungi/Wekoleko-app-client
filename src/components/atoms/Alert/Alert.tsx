// components/Alert/Alert.tsx
import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
  AlertContainer,
  IconContainer,
  MessageContainer,
  CloseButton,
  Title,
  Message 
} from './Alert.styles';
import { 
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes 
} from 'react-icons/fa';

export interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  position?: 'top' | 'bottom';
  duration?: number;
  onClose?: () => void;
  isOpen: boolean;
}

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  message,
  position = 'top',
  duration = 5000,
  onClose,
  isOpen
}) => {
  useEffect(() => {
    if (isOpen && duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const getIcon = () => {
    switch (variant) {
      case 'success': return <FaCheckCircle />;
      case 'error': return <FaExclamationCircle />;
      case 'warning': return <FaExclamationTriangle />;
      case 'info': return <FaInfoCircle />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <AlertContainer
          variant={variant}
          position={position}
          initial={{ opacity: 0, y: position === 'top' ? -50 : 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === 'top' ? -50 : 50 }}
          transition={{ duration: 0.3 }}
        >
          <IconContainer>{getIcon()}</IconContainer>
          <MessageContainer>
            {title && <Title>{title}</Title>}
            <Message>{message}</Message>
          </MessageContainer>
          {onClose && (
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>
          )}
        </AlertContainer>
      )}
    </AnimatePresence>
  );
};

export default Alert;