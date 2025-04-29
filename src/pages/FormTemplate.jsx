import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 40px;
  flex: 1;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const FullWidthItem = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 16px;
  background-color: #007BFF;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const FormTemplate = ({ mode, onNavChange, inviteCode, navigate }) => {

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'employer') {
      onNavChange('plus'); // employer는 plus로 이동
    } else if (mode === 'employee') {
      // 🔥 지금은 임시 storeId로 고정 이동
      const fakeStoreId = 'store123'; // 나중에 백에서 오는 진짜 storeId로 교체 예정
      navigate(`/employee/${fakeStoreId}/home`);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FormGrid>
        {/* 왼쪽 1열 */}
        <FormItem>
          <Label>근로자명</Label>
          <Input placeholder="이름을 입력하세요" />
        </FormItem>

        {/* 오른쪽 2열 */}
        <FormItem>
          <Label>전화번호</Label>
          <Input placeholder="전화번호 입력" />
        </FormItem>

        {/* 근무 시작 시간 */}
        <FormItem>
          <Label>근무 시작 시간</Label>
          <Input placeholder="ex) 09:00" />
        </FormItem>

        {/* 월급 지급일 */}
        <FormItem>
          <Label>월급 지급일</Label>
          <Input placeholder="ex) 매월 5일" />
        </FormItem>

        {/* 시급 */}
        <FormItem>
          <Label>시급</Label>
          <Input placeholder="시급을 입력하세요" />
        </FormItem>

        {/* 예치 알림 설정일 */}
        <FormItem>
          <Label>예치 알림 설정일</Label>
          <Input placeholder="ex) 매월 25일" />
        </FormItem>

        {/* 지갑 주소 (Full Width) */}
        <FullWidthItem>
          <Label>지갑 주소</Label>
          <Input placeholder="지갑 주소 입력" />
        </FullWidthItem>
      </FormGrid>

      {/* 제출 버튼 */}
      <SubmitButton type="submit">
      {mode === 'employer' ? '추가하기' : '수락하기'}
      </SubmitButton>
    </FormWrapper>
  );
};

export default FormTemplate;