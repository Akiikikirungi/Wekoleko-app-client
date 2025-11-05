// src/components/templates/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutContainer, MainContent } from './Layout.styles';
import FloatingUserMenu from '../../molecules/FloatingUserMenu';

const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <MainContent>
        <Outlet />
      </MainContent>
      <FloatingUserMenu />
    </LayoutContainer>
  );
};

export default Layout;