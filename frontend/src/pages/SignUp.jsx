import React,{useState} from 'react';
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
  /* 하단 버튼 위치를 고려하여 중앙을 잡아줍니다 */
  min-height: calc(100vh - 200px);
`;

// ProgressBar와 동일한 굵기(4px)와 느낌을 주는 회색 선
const ThickDivider = styled.div`
  width: 100%;
  height: 4px;             /* 선의 굵기를 Step1 ProgressBar와 맞춤 */
  background-color: #F1F2F6; /* 부드러운 회색 */
  margin: 0;               /* 레이아웃 바닥에 딱 붙게 설정 */
`;

const IconWrapper = styled.div`
  font-size: 80px;
  margin-bottom: 15px;
`;
const Input = styled.input`
  width: 100%;
  max-width: 360px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #dfe6e9;
  padding: 0 12px;
  font-size: 16px;
  margin-bottom: 14px;
`;
const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 60px;

  h1 {
    font-size: 32px;
    font-weight: 800;
    color: #2D3436;
    margin: 0;
  }
  p {
    color: #636E72;
    margin-top: 12px;
    font-size: 16px;
    line-height: 1.6;
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [name,setName]=useState('');
  const[birth,setBirth]=useState('');
  return (
    <Layout title="회원가입" showBack={false}>
      {/* 1. 홈 글자 바로 아래에 오는 굵은 회색 선 */}
      <ThickDivider />

      <Container>
        
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

       
       
        {/* 4. 진료 시작 버튼 */}
        <BottomButton onClick={() => navigate('/SignUp2')}>
          →
        </BottomButton>
        
      </Container>
    </Layout>
  );
};

export default SignUp;