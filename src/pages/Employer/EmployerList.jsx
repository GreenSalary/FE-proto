import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 0;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.2s;
  
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

const WorkerCount = styled.span`
  font-size: 14px;
  color: #333;
`;

const EmployerList = () => {
  const navigate = useNavigate();

  // 임시 매장 리스트 (mock)
  const stores = [
    { id: 'store123', brand: 'starbucks', branch: '숙대입구역점', workerCount: 6 },
    { id: 'store456', brand: 'starbucks', branch: '숙명여대점', workerCount: 4 },
  ];

  const handleStoreClick = (storeId) => {
    navigate(`/employer/${storeId}/home`);
  };

  return (
    <Container>
      {stores.map((store) => (
        <Card key={store.id} onClick={() => handleStoreClick(store.id)}>
          <StoreInfo>
            <StoreName>{store.brand}</StoreName>
            <BranchName>{store.branch}</BranchName>
          </StoreInfo>
          <WorkerCount>근무자 : {store.workerCount}명</WorkerCount>
        </Card>
      ))}
    </Container>
  );
};

export default EmployerList;
