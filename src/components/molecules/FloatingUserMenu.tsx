// src/components/molecules/FloatingUserMenu.tsx
import React, { useState } from 'react';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaTimes } from 'react-icons/fa';
// Import all styled components from the dedicated file
import { 
  FloatingContainer, 
  FloatingButton, 
  ExpandedMenu, 
  MobileOverlay, 
  UserInfo, 
  UserName, 
  UserEmail, 
  MenuButton, 
  LoginPrompt, 
  LoginText, 
  LoginButton, 
  CloseButton,
  DesktopHoverArea
} from './FloatingUserMenu.styles';
import { useAuth } from '../../context/AuthContext';


// Component
const FloatingUserMenu: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get user initials
  const getInitials = () => {
    if (!user) return <FaUser />;
    
    if (user.name) {
      const nameParts = user.name.trim().split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return user.name.substring(0, 2).toUpperCase();
    }
    
    if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    
    return <FaUser />;
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  // Desktop: hover behavior, Mobile: click behavior
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      <MobileOverlay $isVisible={isExpanded && isMobile} onClick={handleClose} />
      
      <FloatingContainer>
        {/* The DesktopHoverArea correctly handles the hover logic and acts as the anchor */}
        <DesktopHoverArea
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ExpandedMenu $isVisible={isExpanded}>
            <CloseButton onClick={handleClose}>
              <FaTimes />
            </CloseButton>
            
            {isAuthenticated && user ? (
              <>
                <UserInfo>
                  <UserName>{user.name || 'User'}</UserName>
                  <UserEmail>{user.email}</UserEmail>
                </UserInfo>
                
                <MenuButton onClick={handleLogout} className="logout">
                  <FaSignOutAlt />
                  Logout
                </MenuButton>
              </>
            ) : (
              <LoginPrompt>
                <LoginText>Not logged in</LoginText>
                <LoginButton to="/login" onClick={handleClose}>
                  <FaSignInAlt />
                  Sign In
                </LoginButton>
              </LoginPrompt>
            )}
          </ExpandedMenu>

          <FloatingButton 
            $isExpanded={isExpanded}
            onClick={isMobile ? handleToggle : undefined}
            aria-label={isAuthenticated ? 'User menu' : 'Login'}
          >
            {getInitials()}
          </FloatingButton>
        </DesktopHoverArea>
      </FloatingContainer>
    </>
  );
};

export default FloatingUserMenu;