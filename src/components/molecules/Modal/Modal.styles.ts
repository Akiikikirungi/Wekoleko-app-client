import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContainer = styled.div`
  background-color: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.shape.borderRadius};
  box-shadow: ${props => props.theme.shadows.xl};
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  width: 100%;
`;

export const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.text.secondary};
  transition: color 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    color: ${props => props.theme.colors.text.primary};
    background-color: ${props => props.theme.colors.border};
  }
`;

// Create motion-compatible versions of your styled components
export const MotionOverlay = motion(Overlay);
export const MotionModalContainer = motion(ModalContainer);