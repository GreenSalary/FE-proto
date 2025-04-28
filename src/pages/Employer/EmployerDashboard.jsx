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
  background-color: #F8F8F8;
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
  background-color: ${props => props.activeNav === 'clock' ? '#FFFFFF' : '#F8F9FE'};
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  overflow-y: ${props => props.activeNav === 'home' ? 'hidden' : 'auto'};
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
        <ContentArea activeNav={activeNav}>
          {renderContent()}
        </ContentArea>
      </MainArea>
    </PageContainer>
  );
};

export default EmployerDashboard;