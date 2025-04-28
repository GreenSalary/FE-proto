import React, { useState } from 'react';
import styled from 'styled-components';
import NavbarLeft from '../../components/NavbarLeft';
import NavbarTop from '../../components/NavbarTop';

import EmployerHome from './EmployerHome';
import EmployerClock from './EmployerClock';
import EmployerMembers from './EmployerMembers';
import EmployerPlus from './EmployerPlus';
import EmployerMypage from './EmployerMypage';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f9fe;
`;

const MainArea = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 100px);
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

const EmployerDashboard = ({ userType }) => {
  const [activeNav, setActiveNav] = useState('home');

  const handleNavChange = (navId) => {
    setActiveNav(navId);
  };

  const renderContent = () => {
    switch(activeNav) {
      case 'home':
        return <EmployerHome />;
      case 'clock':
        return <EmployerClock />;
      case 'list':
        return <EmployerMembers />;
      case 'plus':
        return <EmployerPlus />;
      case 'mypage':
        return <EmployerMypage />;
      default:
        return <EmployerHome />;
    }
  };

  return (
    <PageContainer>
      <NavbarTop />
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

export default EmployerDashboard;
