import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { QRCodeCanvas } from 'qrcode.react';
import { FaQrcode } from 'react-icons/fa';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
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
  position: relative;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 80px;
`;

const TimeButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const TimeText = styled.div`
  font-size: 24px;
  text-align: center;
  color: #333;
`;

const QRButton = styled.button`
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

const EndButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: #d3d3d3;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #333;
  transition: background-color 0.3s;
  &:hover {
    background-color: #bfbfbf;
  }
`;

const QRWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ProgressCircle = styled.svg`
  margin: 0;
  transform: rotate(-90deg);
`;

const StoreClock = () => {
  const [isQRVisible, setIsQRVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(20);
  const [qrData, setQrData] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!isQRVisible) {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isQRVisible]);

  useEffect(() => {
    let timer;
    if (isQRVisible) {
      timer = setInterval(() => {
        setRemainingTime(prev => {
          if (prev === 1) {
            clearInterval(timer);
            setIsQRVisible(false);
            setRemainingTime(20);
            return 20;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isQRVisible]);

  const generateQR = () => {
    const storeId = 'starbucks'; // 임시 매장 ID (로그인 연동 예정)
    const timestamp = new Date().toISOString();
    const data = JSON.stringify({ storeId, timestamp });
    setQrData(data);
    setIsQRVisible(true);
  };

  const stopQR = () => {
    setIsQRVisible(false);
    setRemainingTime(20);
  };

  const formatTime = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const progress = (remainingTime / 20) * circumference;

  return (
    <PageWrapper>
      <TopBar>
        <StoreName>starbucks</StoreName>
      </TopBar>

      <MainContent>
        {isQRVisible ? (
          <QRWrapper>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' , marginTop: '60px' }}>
              <ProgressCircle width="40" height="40">
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  stroke="#000000" 
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - progress}
                />
              </ProgressCircle>
            </div>
            <QRCodeCanvas value={qrData} size={200} style={{ marginTop: '10px' }} />
            <EndButton onClick={stopQR}>QR 종료</EndButton>
          </QRWrapper>
        ) : (
          <ButtonWrapper>
            <TimeButtonWrapper>
              <TimeText>{formatTime(currentTime)}</TimeText>
              <QRButton onClick={generateQR}>
                <FaQrcode size={256} />
                QR 생성하기
              </QRButton>
            </TimeButtonWrapper>
          </ButtonWrapper>
        )}
      </MainContent>
    </PageWrapper>
  );
};

export default StoreClock;
