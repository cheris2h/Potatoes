import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    // 버튼 클릭 시 Step1Body 페이지로 이동
    navigate('/step1');
  };

  return (
    <Container>
      {/* 중앙 상단 아이콘 영역 */}
      <IconWrapper>
        <div className="main-icon">
          {/* 실제 아이콘 이미지나 SVG를 넣으시면 됩니다 */}
          <i className="ri-hospital-line"></i> 
        </div>
      </IconWrapper>

      {/* 진료 시작 버튼 (가로로 넓은 직사각형) */}
      <StartButton onClick={handleStart}>
        진료 시작
      </StartButton>
    </Container>
  );
};

export default Home;

// --- Styled Components (앱 감성 레이아웃) ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px;
  background-color: #ffffff;
`;

const IconWrapper = styled.div`
  margin-bottom: 40px;
  .main-icon {
    font-size: 80px;
    color: #3B82F6; /* 포인트 컬러 */
  }
`;

const StartButton = styled.button`
  width: 100%;           /* 가로로 넓은 직사각형 */
  max-width: 500px;      /* 태블릿 이상의 화면에서 너무 넓어지지 않게 제한 */
  height: 60px;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 12px;   /* 살짝 둥근 모서리로 앱 느낌 강조 */
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:active {
    background-color: #2563EB; /* 클릭 시 색상 변화로 피드백 제공 */
    transform: scale(0.98);    /* 누르는 듯한 효과 */
  }
`;