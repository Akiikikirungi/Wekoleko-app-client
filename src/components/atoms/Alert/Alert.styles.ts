import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

interface AlertContainerProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  position?: 'top' | 'bottom';
}

const getVariantStyles = (variant: AlertContainerProps['variant']) => {
  switch (variant) {
    case 'success':
      return css`
        background-color: ${props => props.theme.colors.success.main}20;
        color: ${props => props.theme.colors.success.main};
        border-color: ${props => props.theme.colors.success.main};
      `;
    case 'error':
      return css`
        background-color: ${props => props.theme.colors.error.main}20;
        color: ${props => props.theme.colors.error.main};
        border-color: ${props => props.theme.colors.error.main};
      `;
    case 'warning':
      return css`
        background-color: ${props => props.theme.colors.warning.main}20;
        color: ${props => props.theme.colors.warning.main};
        border-color: ${props => props.theme.colors.warning.main};
      `;
    case 'info':
      return css`
        background-color: ${props => props.theme.colors.primary.main}20;
        color: ${props => props.theme.colors.primary.main};
        border-color: ${props => props.theme.colors.primary.main};
      `;
  }
};

export const AlertContainer = styled(motion.div)<AlertContainerProps>`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: ${props => props.theme.shape.borderRadius};
  border-left: 4px solid;
  gap: 0.75rem;
  animation: ${slideIn} 0.3s ease-out;
  ${props => getVariantStyles(props.variant)}

  position: fixed;
  ${props => props.position === 'top' ? 'top: 1rem;' : 'bottom: 1rem;'}
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  min-width: 300px;
  max-width: 90vw;
  box-shadow: ${props => props.theme.shadows.lg};
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

export const MessageContainer = styled.div`
  flex-grow: 1;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

export const Title = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const Message = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`;