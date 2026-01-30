import React from 'react';
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

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout title="홈" showBack={false}>
      {/* 1. 홈 글자 바로 아래에 오는 굵은 회색 선 */}
      <ThickDivider />

      <Container>
        {/* 2. 병원 이모티콘 */}
        <IconWrapper role="img" aria-label="hospital">
          🏥
        </IconWrapper>

        {/* 3. 모두닥 타이틀 */}
        <TitleSection>
          <h1>모두닥</h1>
          <p>
            간편한 자가 진단으로<br />
            나의 건강 상태를 확인하세요.
          </p>
        </TitleSection>

        {/* 4. 진료 시작 버튼 */}
        <BottomButton onClick={() => navigate('/step1')}>
          진료 시작
        </BottomButton>
      </Container>
    </Layout>
  );
};

export default Home;