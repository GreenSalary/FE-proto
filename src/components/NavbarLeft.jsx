import React from 'react';
import styled from 'styled-components';
import {
  FaHome, FaClock, FaPlus, FaClipboardList,
  FaUser, FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = styled.div`
  width: 70px;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-radius: 20px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
`;

const TopIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BottomIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  margin: 5px 0;
  font-size: 24px;
  cursor: pointer;
  color: ${({ active }) => (active ? 'var(--color-primary)' : 'var(--color-background-bright)')};
  padding: 10px;
  border-radius: 12px;
  transition: all 0.2s;
  
  &:hover {
    color: #00cba4;
  }
`;

const iconMap = {
  home: { icon: <FaHome />, position: 'top' },
  clock: { icon: <FaClock />, position: 'top' },
  list: { icon: <FaClipboardList />, position: 'top' },
  plus: { icon: <FaPlus />, position: 'top' },
  mypage: { icon: <FaUser />, position: 'bottom' },
  logout: { icon: <FaSignOutAlt />, position: 'bottom' },
};

const visibleByRole = {
  employer: ['home', 'clock', 'list', 'plus', 'mypage', 'logout'],
  employee: ['home', 'clock', 'mypage', 'logout'],
  store: ['clock', 'logout'],
};

const NavbarLeft = ({ userType = 'employer', activeIcon, onNavChange }) => {
  const visibleIcons = visibleByRole[userType] || [];

  return (
    <Sidebar>
      <TopIcons>
        {visibleIcons
          .filter(id => iconMap[id].position === 'top')
          .map(id => (
            <IconButton
              key={id}
              active={activeIcon === id}
              onClick={() => {
                if (id !== 'logout') {
                  onNavChange(id);
                } else {
                  alert('로그아웃');
                  // 여기에 로그아웃 로직 추가
                }
              }}
            >
              {iconMap[id].icon}
            </IconButton>
          ))}
      </TopIcons>
      
      <BottomIcons>
        {visibleIcons
          .filter(id => iconMap[id].position === 'bottom')
          .map(id => (
            <IconButton
              key={id}
              active={activeIcon === id}
              onClick={() => {
                if (id !== 'logout') {
                  onNavChange(id);
                } else {
                  alert('로그아웃');
                  // 여기에 로그아웃 로직 추가
                }
              }}
            >
              {iconMap[id].icon}
            </IconButton>
          ))}
      </BottomIcons>
    </Sidebar>
  );
};

export default NavbarLeft;