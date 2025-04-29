import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import NavbarLeft from '../../components/NavbarLeft';
import NavbarTop from '../../components/NavbarTop';
import { Outlet } from 'react-router-dom';

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
  background-color: ${({ pathname }) => {
    if (pathname.includes('/list')) return 'transparent'; 
    if (pathname.includes('/clock') || pathname.includes('/addmember')) return '#FFFFFF';
    return '#F8F9FE';
  }};
  border-radius: 15px;
  box-shadow: ${({ pathname }) =>
    pathname.includes('/list') ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.05)'};
  padding: 20px;
  overflow-y: ${({ pathname }) =>
    pathname.endsWith('/home') || pathname.endsWith('/employer') ? 'hidden' : 'auto'};
`;

const EmployerDashboard = ({ userType }) => {
  const { pathname } = useLocation();

  return (
    <PageContainer>
      <NavbarTop />
      <MainArea>
        <SidebarWrapper>
          <NavbarLeft userType={userType} />
        </SidebarWrapper>

        <ContentArea pathname={pathname}>
          <Outlet /> {/* 여기에 하위 페이지가 자동 렌더링됨 */}
        </ContentArea>
      </MainArea>
    </PageContainer>
  );
};

export default EmployerDashboard;
