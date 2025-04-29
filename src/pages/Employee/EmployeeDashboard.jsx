import React, { useState } from 'react'; // 🔥 useState 추가
import styled from 'styled-components';
import NavbarLeft from '../../components/NavbarLeft';
import NavbarTop from '../../components/NavbarTop';
import { Outlet, useLocation } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f9fafc;
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
    if (pathname.includes('/clock') || pathname.includes('/addstore')) return '#FFFFFF';
    return '#F8F9FE';
  }};
  border-radius: 15px;
  box-shadow: ${({ pathname }) =>
    pathname.includes('/list') ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.05)'};
  padding: 20px;
  overflow-y: auto;
`;

const EmployeeDashboard = ({ userType }) => {
  const { pathname } = useLocation();
  const [showModal, setShowModal] = useState(false); // 🔥 모달 상태 추가

  return (
    <PageContainer>
      <NavbarTop />
      <MainArea>
        <SidebarWrapper>
          <NavbarLeft 
            userType={userType} 
            onPlusClick={() => setShowModal(true)} // 🔥 Plus 눌렀을 때 모달 열기
          />
        </SidebarWrapper>

        <ContentArea pathname={pathname}>
          <Outlet context={{ showModal, setShowModal }} /> 
          {/* 🔥 Outlet에 context로 넘겨줄 수도 있음 (더 깔끔) */}
        </ContentArea>
      </MainArea>
    </PageContainer>
  );
};

export default EmployeeDashboard;
