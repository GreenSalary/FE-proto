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

const EmployerMembers = () => {
  return (
    <Container>
      <Title>리스트 화면</Title>
      <Content>
        여기는 고용주용 리스트 화면입니다.
      </Content>
    </Container>
  );
};

export default EmployerMembers;
