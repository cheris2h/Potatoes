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
const GenderRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const GenderButton = styled.button`
  width: 120px;
  height: 120px;
  border-radius: 20px;
  border: none;
  background: ${props =>
    props.selected
      ? 'linear-gradient(135deg, #4DB6AC, #26A69A)'
      : '#F8F9FA'};
  color: ${props => (props.selected ? 'white' : '#636E72')};
  font-size: 54px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${props =>
    props.selected
      ? '0 10px 20px rgba(77,182,172,0.3)'
      : '0 4px 8px rgba(0,0,0,0.08)'};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }

  &:active {
    transform: scale(0.96);
  }
`;


const SignUp2 = () => {
  const navigate = useNavigate();

  /* ✅ state 정의 추가 */
  const [emergencyContact, setEmergencyContact] = useState('');
   const [gender, setGender] = useState('');

  return (
    <Layout title="회원가입" showBack={false}>
      <ThickDivider />

      <Container>
        

       <GenderRow>
          <GenderButton
            selected={gender === 'female'}
            onClick={() => setGender('female')}
          >
            👩
          </GenderButton>

          <GenderButton
            selected={gender === 'male'}
            onClick={() => setGender('male')}
          >
            👨
          </GenderButton>
        </GenderRow>
        <Input
          placeholder="보호자 연락처를 입력해주세요.(선택사항)"
          value={emergencyContact}
          onChange={(e) => setEmergencyContact(e.target.value)}
        />

        <BottomButton onClick={() => navigate('/step1')}>
          진료 시작
        </BottomButton>
      </Container>
    </Layout>
  );
};

export default SignUp2;