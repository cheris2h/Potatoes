import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import { BottomButton } from '../components/common/Button';

const Container = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f1f3f5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReportCard = styled.div`
  width: 100%;
  background: white;
  border-radius: 24px;
  padding: 30px 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;

  /* 종이 문서 느낌의 상단 장식 */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 8px;
    background: #4DB6AC;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
  border-bottom: 2px dashed #edf2f7;
  padding-bottom: 20px;

  h2 { font-size: 24px; font-weight: 900; color: #2d3436; margin-bottom: 8px; }
  p { color: #636e72; font-size: 14px; }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
`;

const InfoItem = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 16px;
  text-align: center;

  .label { font-size: 12px; color: #a0aec0; margin-bottom: 4px; }
  .value { font-size: 18px; font-weight: 700; color: #2d3436; }
`;

const DiagnosisBox = styled.div`
  background: #e0f2f1;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid #b2dfdb;

  h3 { font-size: 16px; color: #00796b; margin-bottom: 10px; display: flex; align-items: center; }
  p { font-size: 18px; font-weight: 700; color: #2d3436; line-height: 1.5; }
`;

const AdviceBox = styled.div`
  h3 { font-size: 16px; color: #2d3436; margin-bottom: 12px; }
  .content {
    font-size: 16px;
    line-height: 1.6;
    color: #4a5568;
    white-space: pre-wrap; /* 줄바꿈 허용 */
  }
`;

const Result = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // 백엔드 ReportResponse 데이터 추출
  const result = state?.result;

  // 데이터가 없을 경우 예외 처리
  if (!result) {
    return (
      <Layout title="오류">
        <Container>
          <p>진단 결과를 찾을 수 없습니다.</p>
          <BottomButton onClick={() => navigate('/')}>처음으로 돌아가기</BottomButton>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout title="진단 결과" showBack={false}>
      <Container>
        <ReportCard>
          <Header>
            <h2>AI 건강 소견서</h2>
            <p>{new Date(result.createdAt).toLocaleString()} 분석 완료</p>
          </Header>

          <InfoGrid>
            <InfoItem>
              <div className="label">아픈 부위</div>
              <div className="value">{result.bodyPartKorean}</div>
            </InfoItem>
            <InfoItem>
              <div className="label">통증 강도</div>
              <div className="value" style={{ color: '#e74c3c' }}>{result.intensity} / 5</div>
            </InfoItem>
          </InfoGrid>

          <DiagnosisBox>
            <h3>🔍 AI 분석 결과</h3>
            <p>{result.aiDiagnosis || "분석 결과를 생성 중입니다."}</p>
          </DiagnosisBox>

          <AdviceBox>
            <h3>💡 관리 가이드</h3>
            <div className="content">
              1. 무리한 움직임은 피하고 안정을 취하세요.<br />
              2. 통증이 심해지면 즉시 가까운 병원을 방문하세요.<br />
              3. 충분한 수분을 섭취하고 환부를 따뜻하게 해주세요.
            </div>
          </AdviceBox>
        </ReportCard>

        <div style={{ marginTop: 'auto', width: '100%', display: 'flex', gap: '10px' }}>
          <BottomButton
            style={{ flex: 1, backgroundColor: '#b2bec3' }}
            onClick={() => navigate('/')}
          >
            홈으로
          </BottomButton>
          <BottomButton
            style={{ flex: 2 }}
            onClick={() => window.print()} // 나중에 결과 공유 기능을 넣어도 좋습니다.
          >
            결과 저장하기
          </BottomButton>
        </div>
      </Container>
    </Layout>
  );
};

export default Result;