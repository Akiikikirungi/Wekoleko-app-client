// src/components/molecules/FloatingUserMenu.styles.ts
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// NEW: This wrapper defines the area where the mouse can hover 
// (encompassing both the button and the menu) to prevent premature menu closure.
export const DesktopHoverArea = styled.div`
  /* Use relative position always to serve as anchor for children (button and menu) */
  position: relative;
  width: 56px; /* Default width (button size) */
  height: 56px; /* Default height (button size) */
  
  /* Only apply expanded hover area on desktop */
  @media (min-width: 769px) {
    /* Expand the clickable/hover area upwards to cover the menu */
    position: absolute; 
    bottom: 0;
    left: 0;
    /* Set dimensions large enough to cover the button and the expanded menu */
    width: 260px; /* Min-width of ExpandedMenu */
    height: 300px; /* Sufficient height to cover the menu area above the button */
  }
`;

export const FloatingContainer = styled.div`
  /* FIX: 'position: fixed' ensures it stays in the bottom-left of the viewport */
  position: fixed; 
  bottom: 24px;
  left: 24px;
  z-index: 999;
  
  @media (max-width: 768px) {
    bottom: 90px; /* Above mobile bottom nav if you add one later */
    left: 16px;
  }
`;

export const FloatingButton = styled.button<{ $isExpanded: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 18px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* FIX: Position the button absolutely at the bottom-left of the DesktopHoverArea */
  position: absolute;
  bottom: 0;
  left: 0;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4), 0 3px 6px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    width: 52px;
    height: 52px;
    
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

export const ExpandedMenu = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 70px;
  left: 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);
  padding: 16px;
  min-width: 260px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)'};
  pointer-events: ${props => props.$isVisible ? 'all' : 'none'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    min-width: 240px;
    bottom: 65px;
    left: 0;
  }
`;

export const MobileOverlay = styled.div<{ $isVisible: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    opacity: ${props => props.$isVisible ? 1 : 0};
    pointer-events: ${props => props.$isVisible ? 'all' : 'none'};
    transition: opacity 0.3s ease;
    z-index: 998;
  }
`;

export const UserInfo = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 12px;
`;

export const UserName = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #0f172a;
  margin-bottom: 4px;
  word-break: break-word;
`;

export const UserEmail = styled.div`
  font-size: 13px;
  color: #64748b;
  word-break: break-word;
`;

export const MenuButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  transition: all 0.2s;
  
  &:hover {
    background: #f8fafc;
    color: #0f172a;
  }

  &.logout {
    color: #dc2626;
    
    &:hover {
      background: #fef2f2;
    }
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const LoginPrompt = styled.div`
  text-align: center;
  padding: 8px 0;
`;

export const LoginText = styled.div`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 12px;
`;

export const LoginButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const CloseButton = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    border: none;
    background: #f8fafc;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #64748b;
    transition: all 0.2s;
    
    &:hover {
      background: #f1f5f9;
      color: #0f172a;
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;