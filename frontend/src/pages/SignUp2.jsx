import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import { BottomButton } from '../components/common/Button';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: calc(100vh - 200px);
`;

const ThickDivider = styled.div`
  width: 100%;
  height: 4px;
  background-color: #F1F2F6;
  margin: 0;
`;

const IconWrapper = styled.div`
  font-size: 80px;
  margin-bottom: 15px;
`;

/* ✅ Input 정의 추가 */
const Input = styled.input`
  width: 100%;
  max-width: 320px;
  padding: 14px;
  margin-bottom: 12px;
  border-radius: 12px;
  border: 1px solid #dfe6e9;
  font-size: 16px;
`;

const SignUp2 = () => {
  const navigate = useNavigate();

  /* ✅ state 정의 추가 */
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');

  return (
    <Layout title="회원가입" showBack={false}>
      <ThickDivider />

      <Container>
        <IconWrapper role="img" aria-label="hospital">
          🏥
        </IconWrapper>

        <Input
          placeholder="이름 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />

        <BottomButton onClick={() => navigate('/step1')}>
          진료 시작
        </BottomButton>
      </Container>
    </Layout>
  );
};

export default SignUp2;
