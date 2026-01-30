import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Layout from '../components/common/Layout';
import { BottomButton } from '../components/common/Button';

const Container = styled.div`
  flex: 1; display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 20px; min-height: calc(100vh - 200px);
`;

const ThickDivider = styled.div`
  width: 100%; height: 4px; background-color: #F1F2F6; margin: 0;
`;

const Input = styled.input`
  width: 100%; max-width: 320px; padding: 14px; margin-bottom: 12px;
  border-radius: 12px; border: 1px solid #dfe6e9; font-size: 16px;
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px; /* 간격 살짝 조정 */
`;

const Brand = styled.div`
  font-size: 42px;
  font-weight: 900;
  color: #2ed8b6;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  margin-top: 14px;
  font-size: 17px;
  color: #636e72;
  text-align: center;
  line-height: 1.6;
`;

const GenderRow = styled.div`
  display: flex; gap: 20px; margin-bottom: 20px;
`;

const GenderButton = styled.button`
  width: 120px; height: 120px; border-radius: 20px; border: none;
  background: ${props => props.selected ? 'linear-gradient(135deg, #4DB6AC, #26A69A)' : '#F8F9FA'};
  color: ${props => (props.selected ? 'white' : '#636E72')};
  font-size: 54px; cursor: pointer; transition: all 0.25s ease;
  box-shadow: ${props => props.selected ? '0 10px 20px rgba(77,182,172,0.3)' : '0 4px 8px rgba(0,0,0,0.08)'};

  &:hover { transform: translateY(-4px); }
`;

const SignUp2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // SignUp1에서 넘어온 데이터 받기 (name, birth)
  const prevData = location.state || {};

  const [emergencyContact, setEmergencyContact] = useState('');
  const [gender, setGender] = useState(''); // 'female' or 'male'

  const handleSignUp = async () => {
    if (!gender) {
      alert("성별을 선택해주세요.");
      return;
    }

    const requestBody = {
      deviceId: "1234",
      name: prevData.name,
      birth: prevData.birth,
      gender: gender === 'male' ? "남자" : "여자",
      emergencyContact: emergencyContact || "보호자 존재 X"
    };

    try {
      // API 주소는 환경에 맞게 수정 필요 (예: http://192.168.0.XX:8080/api/users/signup)
      const response = await axios.post('http://localhost:8080/api/users/signup', requestBody);

      if (response.status === 200) {
        const userId = response.data.id;
        if (userId) {
          localStorage.setItem('userId', userId);
          alert("회원가입이 완료되었습니다!");
          navigate('/step1');
        }
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      alert("서버 연결에 실패했습니다.");
    }
  };

  return (
    <Layout title="회원가입" showBack={true}>
      <ThickDivider />
      <Container>
        {/* 브랜드 섹션 (로고) */}
        <BrandSection>
          <Brand>아프닥</Brand>
          <Subtitle>
            누구나 쉽게, 차별 없이<br />
            건강을 확인하세요.
          </Subtitle>
        </BrandSection>

        {/* 성별 선택 섹션 */}
        <GenderRow>
          <GenderButton
            selected={gender === 'female'}
            onClick={() => setGender('female')}
          >👩</GenderButton>
          <GenderButton
            selected={gender === 'male'}
            onClick={() => setGender('male')}
          >👨</GenderButton>
        </GenderRow>

        <Input
          placeholder="보호자 연락처 (선택사항)"
          value={emergencyContact}
          onChange={(e) => setEmergencyContact(e.target.value)}
        />

        <BottomButton onClick={handleSignUp}>
          진료 시작
        </BottomButton>
      </Container>
    </Layout>
  );
};

export default SignUp2;