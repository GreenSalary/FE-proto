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

const EmployeeClock = () => {
  return (
    <Container>
      <Title>시계</Title>
      <Content>
        <p>여기는 직원 시계 화면입니다.</p>
        <p>근태 관리와 관련된 기능이 이곳에 구현될 예정입니다.</p>
      </Content>
    </Container>
  );
};

export default EmployeeClock;