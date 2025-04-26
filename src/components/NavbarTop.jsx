// components/NavbarTop.jsx
import React from 'react';
import styled from 'styled-components';
import { FaBell } from 'react-icons/fa';

const Topbar = styled.div`
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #eee;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Bell = styled.div`
  margin-right: 15px;
  font-size: 18px;
  color: #888;
`;

const User = styled.span`
  font-weight: bold;
`;

const NavbarTop = () => {
  return (
    <Topbar>
      <Title>
        <img
          src="/logo2.svg"
          alt="Green Salary Logo"
        />
      </Title>
      <UserInfo>
        <Bell><FaBell /></Bell>
        <User>사장님</User>
      </UserInfo>
    </Topbar>
  );
};

export default NavbarTop;
