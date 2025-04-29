import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import FormTemplate from '../FormTemplate'; 

const Container = styled.div`
  background-color: #fff;
  padding: 0;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const Content = styled.div`
  padding: 10px;
  border-radius: 12px;
  flex: 1;
  overflow-y: auto;
`;

const EmployerAddMembers = () => {
  const location = useLocation();
  const inviteCode = location.state?.inviteCode || ''; // 없으면 빈 문자열
  
  return (
    <Container>
      <Title>매장 추가 추가</Title>
      <p>초대 코드: {inviteCode}</p>
      <Content>
        <FormTemplate mode="employee" />
      </Content>
    </Container>
  );
};

export default EmployerAddMembers;
