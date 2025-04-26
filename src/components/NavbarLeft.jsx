import React, { useState, useEffect } from 'react';
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

// 메뉴 구성 정의
const iconMap = {
  home: { icon: <FaHome />, position: 'top' },
  clock: { icon: <FaClock />, position: 'top' },
  list: { icon: <FaClipboardList />, position: 'top' },
  plus: { icon: <FaPlus />, position: 'top' },
  user: { icon: <FaUser />, position: 'bottom' },
  logout: { icon: <FaSignOutAlt />, position: 'bottom' },
};

const visibleByRole = {
  employer: ['home', 'clock', 'list', 'plus', 'user', 'logout'],
  employee: ['home', 'clock', 'user', 'logout'],
  store: ['clock', 'logout'],
};

const NavbarLeft = ({ userType = 'employer' }) => {
  const visibleIcons = visibleByRole[userType] || [];

  const [activeIcon, setActiveIcon] = useState(visibleIcons[0] || '');

  useEffect(() => {
    if (visibleIcons.length > 0) {
      setActiveIcon(visibleIcons[0]);
    }
  }, [userType]);

  return (
    <Sidebar>
      <TopIcons>
        {visibleIcons
          .filter(id => iconMap[id].position === 'top')
          .map(id => (
            <IconButton
              key={id}
              active={activeIcon === id}
              onClick={() => setActiveIcon(id)}
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
                if (id === 'logout') {
                  alert('로그아웃');
                } else {
                  setActiveIcon(id);
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
