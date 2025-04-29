import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { storeId } = useParams();

  useEffect(() => {
    const handlePopState = () => {
      navigate(`/employer/${storeId}/plus`);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, storeId]);


  return (
    <Container>
      <Title>근로자 추가</Title>
      <Content>
        <FormTemplate mode="employer" />
      </Content>
    </Container>
  );
};

export default EmployerAddMembers;
