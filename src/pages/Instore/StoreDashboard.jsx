import React, { useState } from 'react';
import styled from 'styled-components';
import NavbarLeft from '../../components/NavbarLeft';

import StoreClock from './StoreClock';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f9fafc;
`;

const MainArea = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 40px);
  padding: 20px;
  gap: 20px;
`;

const SidebarWrapper = styled.div`
  width: 70px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentArea = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  overflow-y: auto;
`;

const StoreDashboard = ({ userType }) => {
  const [activeNav, setActiveNav] = useState('clock'); 

  const handleNavChange = (navId) => {
    setActiveNav(navId);
  };

  const renderContent = () => {
    switch (activeNav) {
      case 'clock':
        return <StoreClock />;
      default:
        return <StoreClock />;
    }
  };

  return (
    <PageContainer>
      <MainArea>
        <SidebarWrapper>
          <NavbarLeft 
            userType={userType} 
            activeIcon={activeNav}
            onNavChange={handleNavChange}
          />
        </SidebarWrapper>
        <ContentArea>
          {renderContent()}
        </ContentArea>
      </MainArea>
    </PageContainer>
  );
};

export default StoreDashboard;
