import React, { useState } from 'react';
import styled from 'styled-components';
import { MoreVertical } from 'lucide-react';

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
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const MoreIconWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  color: ${props => props.active ? '#3385FF' : '#aaa'};
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background-color: ${props => props.active ? '#F3FBFE' : 'transparent'};
  transition: all 0.2s;
  
  &:hover {
    color: ${props => props.active ? '#3385FF' : '#666'};
    background-color: ${props => props.active ? '#F3FBFE' : '#f5f5f5'};
  }
`;

const TerminationButton = styled.button`
  position: absolute;
  left: -80px;
  top: 10px;
  padding: 8px 12px;
  background-color: #4a4a4a;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  
  &:hover {
    background-color: #3a3a3a;
  }
`;


const EmployerMembers = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  
  const employees = [
    { name: '유재석', payDay: '매월 8일', hourlyRate: 12000, phone: '010 - 1234 - 1234' },
    { name: '양세찬', payDay: '매월 9일', hourlyRate: 11000, phone: '010 - 1234 - 1234' },
    { name: '송지효', payDay: '매월 25일', hourlyRate: 10000, phone: '010 - 1234 - 1234' },
    { name: '지석진', payDay: '매월 11일', hourlyRate: 11000, phone: '010 - 1234 - 1234' },
    { name: '김종국', payDay: '매월 10일', hourlyRate: 11000, phone: '010 - 1234 - 1234' },
    { name: '하하', payDay: '매월 21일', hourlyRate: 15000, phone: '010 - 1234 - 1234' },
    { name: '지예은', payDay: '매월 15일', hourlyRate: 13000, phone: '010 - 1234 - 1234' },
    { name: '유재석', payDay: '매월 8일', hourlyRate: 12000, phone: '010 - 1234 - 1234' },
    { name: '양세찬', payDay: '매월 9일', hourlyRate: 11000, phone: '010 - 1234 - 1234' },
    { name: '송지효', payDay: '매월 25일', hourlyRate: 10000, phone: '010 - 1234 - 1234' },
    { name: '지석진', payDay: '매월 11일', hourlyRate: 11000, phone: '010 - 1234 - 1234' },
    { name: '김종국', payDay: '매월 10일', hourlyRate: 11000, phone: '010 - 1234 - 1234' },
    { name: '하하', payDay: '매월 21일', hourlyRate: 15000, phone: '010 - 1234 - 1234' },
    { name: '유재석', payDay: '매월 8일', hourlyRate: 12000, phone: '010 - 1234 - 1234' },
    { name: '양세찬', payDay: '매월 9일', hourlyRate: 11000, phone: '010 - 1234 - 1234' },
    { name: '송지효', payDay: '매월 25일', hourlyRate: 10000, phone: '010 - 1234 - 1234' },
    { name: '지석진', payDay: '매월 11일', hourlyRate: 11000, phone: '010 - 1234 - 1234' },
    { name: '김종국', payDay: '매월 10일', hourlyRate: 11000, phone: '010 - 1234 - 1234' },
    { name: '하하', payDay: '매월 21일', hourlyRate: 15000, phone: '010 - 1234 - 1234' }
  ];

  const toggleDropdown = (index, e) => {
    e.stopPropagation();
    if (dropdownOpen === index) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(index);
    }
  };

  const handleClickOutside = () => {
    setDropdownOpen(null);
  };

  return (
    <Container onClick={handleClickOutside}>
      <StoreTitle>starbucks</StoreTitle>
      
      <CardGrid>
        {employees.map((employee, index) => (
          <Card key={index}>
            <MoreIconWrapper 
              onClick={(e) => toggleDropdown(index, e)}
              active={dropdownOpen === index}
            >
              <MoreVertical size={20} />
              
              {dropdownOpen === index && (
                <TerminationButton>고용해제</TerminationButton>
              )}
            </MoreIconWrapper>
            
            <CardContent>
              <EmployeeName>{employee.name}</EmployeeName>
              <EmployeeDetail>{employee.payDay}</EmployeeDetail>
              <EmployeeDetail>시급 : {employee.hourlyRate.toLocaleString()}원</EmployeeDetail>
              <EmployeeDetail>연락처<br />{employee.phone}</EmployeeDetail>
            </CardContent>
            
            <PayStatusButton>
              임금현황 보러가기 &gt;
            </PayStatusButton>
          </Card>
        ))}
      </CardGrid>
    </Container>
  );
};

export default EmployerMembers;