import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0 0 10px 0;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  overflow-y: auto;
`;

const StoreTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  position: relative;
  overflow: visible;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  border: solid 0.1px #D9D9D9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  min-height: 230px;
  overflow: visible;
`;

const CardContent = styled.div`
  padding: 20px;
  padding-bottom: 10px;
`;

const EmployeeName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const EmployeeDetail = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
  color: #666;
`;

const PayStatusButton = styled.button`
  width: 100%;
  background-color: #f0f0f0;
  border: none;
  border-radius: 0 0 12px 12px;
  padding: 12px 16px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  margin-top: auto;
  transition: background-color 0.2s;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgb(5, 186, 129);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const InviteCodeContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 8px 12px;
  margin-top: 12px;
  margin-bottom: 5px;
  justify-content: space-between;
`;

const InviteCodeText = styled.span`
  font-size: 14px;
  color: #444;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  color: #777;
  
  &:hover {
    color: #333;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const EmployeeCards = () => {
  const [copySuccess, setCopySuccess] = useState('');
  
  // 샘플 직원 데이터
  const employees = [
    { 
      name: '강훈', 
      payDay: '매월 10일', 
      hourlyRate: 11000, 
      inviteCode: '3YJ708' 
    },
    { 
      name: '유재석', 
      payDay: '매월 8일', 
      hourlyRate: 12000, 
      inviteCode: '4XK509' 
    },
    { 
      name: '양세찬', 
      payDay: '매월 9일', 
      hourlyRate: 11000, 
      inviteCode: '9LM612' 
    },
    { 
      name: '송지효', 
      payDay: '매월 25일', 
      hourlyRate: 10000, 
      inviteCode: '7JH403' 
    }
  ];

  // 초대 코드를 클립보드에 복사하는 함수
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(text);
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch(err => {
        console.error('클립보드 복사 실패: ', err);
      });
  };

  return (
    <Container>
      <StoreTitle>starbucks</StoreTitle>
      
      <CardGrid>
        {employees.map((employee, index) => (
          <Card key={index}>
            <CardContent>
              <EmployeeName>{employee.name}</EmployeeName>
              <EmployeeDetail>{employee.payDay}</EmployeeDetail>
              <EmployeeDetail>시급 : {employee.hourlyRate.toLocaleString()}원</EmployeeDetail>
              
              <InviteCodeContainer>
                <InviteCodeText>초대코드: {employee.inviteCode}</InviteCodeText>
                <CopyButton onClick={() => copyToClipboard(employee.inviteCode)}>
                  {copySuccess === employee.inviteCode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </CopyButton>
              </InviteCodeContainer>
            </CardContent>
            
            <PayStatusButton>
              수락 대기 중. . .
            </PayStatusButton>
          </Card>
        ))}
      </CardGrid>
      
      <AddButton>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </AddButton>
    </Container>
  );
};

export default EmployeeCards;