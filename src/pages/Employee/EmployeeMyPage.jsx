import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const Content = styled.div`
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EmployeeMyPage = () => {
  return (
    <Container>
      <Title>마이페이지</Title>
      <Content>
        <p>여기는 직원 마이페이지 화면입니다.</p>
        <p>개인 정보 및 설정을 관리할 수 있는 페이지입니다.</p>
      </Content>
    </Container>
  );
};

export default EmployeeMyPage;