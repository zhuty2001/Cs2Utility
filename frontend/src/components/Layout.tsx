import React from 'react';
import { Container } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      {children}
    </Container>
  );
};

export default Layout; 