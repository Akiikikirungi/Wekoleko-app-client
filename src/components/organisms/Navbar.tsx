import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../atoms/Button';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.primary.main};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: white;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserIcon = styled(FaUserCircle)`
  font-size: 1.5rem;
`;

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <NavbarContainer>
      <Logo to="/">Wekoleko</Logo>
      <NavLinks>
        {isAuthenticated ? (
          <>
            <Button
              as={Link}
              to="/dashboard"
              variant="ghost"
              size="medium"
            >
              Dashboard
            </Button>
            <Button
              as={Link}
              to="/new"
              variant="ghost"
              size="medium"
            >
              New Ticket
            </Button>
            <ProfileSection>
              <UserIcon />
              <span>{user?.email}</span>
              <Button
                variant="secondary"
                size="small"
                onClick={handleLogout}
                startIcon={<FaSignOutAlt />}
              >
                Logout
              </Button>
            </ProfileSection>
          </>
        ) : (
          <>
            <Button as={Link} to="/login" variant="secondary" size="medium">
              Login
            </Button>
            <Button as={Link} to="/register" variant="primary" size="medium">
              Register
            </Button>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;