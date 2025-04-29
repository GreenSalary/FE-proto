import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom'; // 🔥 context 사용

const Container = styled.div`
  padding: 0;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StoreName = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const BranchName = styled.span`
  font-size: 16px;
  color: #666;
  margin-top: 5px;
`;

// -------- 모달 ------------------------------------------------------------
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  font-size: 18px;
  padding: 10px;
  width: 250px;
  margin-top: 20px;
  margin-bottom: 30px;
  text-align: center;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #00cba4;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 30px;
  width: 150px;
  cursor: pointer;
`;

const EmployeeList = () => {
  const navigate = useNavigate();
  const { showModal, setShowModal } = useOutletContext(); // 🔥 받기
  const [inviteCode, setInviteCode] = useState('');

  const stores = [
    { id: 'store123', brand: 'starbucks', branch: '숙대입구역점' },
    { id: 'store456', brand: '빨봉', branch: '숙명여대점' }
  ];

  const handleSubmit = () => {
    if (inviteCode.trim()) {
      navigate('/employee/addstore', { state: { inviteCode } }); // 🔥 초대코드 함께 전달
      setShowModal(false); // 모달 닫기
    } else {
      alert('초대 코드를 입력하세요.');
    }
  };

  const handleStoreClick = (storeId) => {
    navigate(`/employee/${storeId}/home`);
  };

  return (
    <Container>
      {stores.map((store) => (
        <Card key={store.id} onClick={() => handleStoreClick(store.id)}>
          <StoreInfo>
            <StoreName>{store.brand}</StoreName>
            <BranchName>{store.branch}</BranchName>
          </StoreInfo>
        </Card>
      ))}

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <h3>초대 코드 입력</h3>
            <Input
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="초대 코드"
            />
            <SubmitButton onClick={handleSubmit}>submit</SubmitButton>
          </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default EmployeeList;
