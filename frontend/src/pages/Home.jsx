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

const GrayButton = styled(BottomButton)`
  background-color: #dfe6e9;
  color: #2d3436;
  margin-top: 12px;

  &:hover {
    background-color: #b2bec3;
  }
`;

/* ✅ 버튼을 아래로 내리기 위한 래퍼 */
const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout title="홈" showBack={false}>
      <ThickDivider />

      <Container>
        <IconWrapper role="img" aria-label="hospital">
          🏥
        </IconWrapper>

        <TitleSection>
          <h1>아프닥</h1>
          <p>
            간편한 자가 진단으로<br />
            나의 건강 상태를 확인하세요.
          </p>
        </TitleSection>

        <ButtonGroup>
          <BottomButton onClick={() => navigate('/step1')}>
            진료 시작
          </BottomButton>

          <GrayButton onClick={() => navigate('/mypage')}>
            마이페이지
          </GrayButton>
        </ButtonGroup>
      </Container>
    </Layout>
  );
};

export default Home;
