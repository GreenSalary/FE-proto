import React from 'react';
import styled from 'styled-components';
import {
  FaHome, FaClock, FaPlus, FaClipboardList,
  FaUser, FaSignOutAlt
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

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
  padding: 10px;
  border-radius: 12px;
  transition: all 0.2s;
  color: ${({ active }) =>
    active ? 'var(--color-primary)' : 'var(--color-text-bright)'};

  &:hover {
    color: var(--color-primary);
  }
`;

const iconMap = {
  home: { icon: <FaHome />, position: 'top', path: 'home' },
  clock: { icon: <FaClock />, position: 'top', path: 'clock' },
  members: { icon: <FaClipboardList />, position: 'top', path: 'members' },
  plus1: { icon: <FaPlus />, position: 'top', path: 'plus1' },
  plus2: { icon: <FaPlus />, position: 'top', path: 'plus2' },
  mypage: { icon: <FaUser />, position: 'bottom', path: 'mypage' },
  logout: { icon: <FaSignOutAlt />, position: 'bottom' },
};

const fullVisibleByRole = {
  employer: ['home', 'clock', 'members', 'plus2'],
  employee: ['home', 'clock'],
  store: ['clock'],
};

const NavbarLeft = ({ userType = 'employer', onPlusClick }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isListLikePage =
    pathname.endsWith('/list') ||
    pathname.includes('/addstore')

  const getActiveId = () => {
    const pathParts = pathname.split('/');
    const first = pathParts[1]; 
    const second = pathParts[2];
    const third = pathParts[3];

    if (first === 'store') return 'clock'; 
    if (second === 'addstore') return 'plus1';
    if (third === 'addmember') return 'plus2';
    if (third === 'plus') return 'plus2';
    if (third && ['home', 'clock', 'members', 'mypage'].includes(third)) return third;
    return second || 'home';
  };

  

  const activeId = getActiveId();

  const visibleTopIcons = isListLikePage
    ? ['plus1']
    : (fullVisibleByRole[userType]?.filter(id => iconMap[id].position === 'top') || []);

  const visibleBottomIcons =
    userType === 'store' ? ['logout'] : ['mypage', 'logout'];

  const handleNavigation = (id) => {
    if (id === 'plus1') {
      if (userType === 'employee') {
        onPlusClick?.();
      } else {
        // NavBar는 그대로, 오른쪽만 addstore로 이동
        navigate(`/${userType}/addstore`);
      }
    } else if (id === 'plus2') {
      const storeId = pathname.split('/')[2];
      navigate(`/${userType}/${storeId}/plus`);
    } else if (id === 'logout') {
      localStorage.removeItem('userType'); // 선택적으로 유저 타입 제거
      navigate('/');
    } else {
      const storeId = pathname.split('/')[2];
      if (storeId && storeId !== 'list') {
        navigate(`/${userType}/${storeId}/${iconMap[id].path}`);
      } else {
        navigate(`/${userType}/${iconMap[id].path}`);
      }
    }
  };
  
  return (
    <Sidebar>
      <TopIcons>
        {visibleTopIcons.map(id => (
          <IconButton
            key={id}
            active={activeId === id}
            onClick={() => handleNavigation(id)}
          >
            {iconMap[id]?.icon}
          </IconButton>
        ))}
      </TopIcons>

      <BottomIcons>
        {visibleBottomIcons.map(id => (
          <IconButton
            key={id}
            active={activeId === id}
            onClick={() => handleNavigation(id)}
          >
            {iconMap[id]?.icon}
          </IconButton>
        ))}
      </BottomIcons>
    </Sidebar>
  );
};

export default NavbarLeft;
