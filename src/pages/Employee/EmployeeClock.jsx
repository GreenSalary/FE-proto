import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const StoreName = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #333;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px; /*버튼 위치 조정*/
  gap: 10px;
`;

const CurrentTime = styled.div`
  font-size: 24px;
  color: #333;
  text-align: center;
`;

const AttendanceButton = styled.button`
  background-color: #7D89F9;
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 30px 0;
  width: 400px;
  height: 250px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #5f6ad4;
  }
`;

const EmployeeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
  };

  return (
    <PageWrapper>
      <TopBar>
        <StoreName>starbucks</StoreName>
      </TopBar>

      <MainContent>
        <CurrentTime>{formatTime(currentTime)}</CurrentTime>
        <AttendanceButton>
          <FaCamera size={128} />
          출석하기
        </AttendanceButton>
      </MainContent>
    </PageWrapper>
  );
};

export default EmployeeClock;
