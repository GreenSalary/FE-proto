import React from 'react';
import styled from 'styled-components';
import NavbarLeft from '../../components/NavbarLeft';
import NavbarTop from '../../components/NavbarTop';

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
  overflow-y: auto; /* 스크롤 */
`;

const StoreDashboard = ({userType}) => {
  return (
    <PageContainer>
      <MainArea>
        <SidebarWrapper>
          <NavbarLeft userType={userType} />
        </SidebarWrapper>
        <ContentArea>
          <h2>매장 qr 자리</h2>

        </ContentArea>
      </MainArea>
    </PageContainer>
  );
};

export default StoreDashboard;
