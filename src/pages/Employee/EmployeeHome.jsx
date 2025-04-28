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

const EmployeeHome = () => {
  return (
    <Container>
      <Title>홈</Title>
      <Content>
        <p>여기는 직원 홈 화면입니다.</p>
        <p>네비게이션이 제대로 작동하는지 확인하기 위한 간단한 컴포넌트입니다.</p>
      </Content>
    </Container>
  );
};

export default EmployeeHome;