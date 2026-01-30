import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import { BottomButton } from '../components/common/Button';

const Container = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa; /* 조금 더 밝은 톤으로 변경 */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 모바일 화면에서 하단 버튼 공간 확보 */
  padding-bottom: 40px;
`;

const ReportCard = styled.div`
  width: 100%;
  max-width: 450px; /* 너무 퍼지지 않게 제한 */
  background: white;
  border-radius: 28px;
  padding: 32px 24px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.08);
  position: relative;
  border: 1px solid #edf2f7;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 10px;
    background: linear-gradient(90deg, #4DB6AC, #80CBC4);
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 28px;
  border-bottom: 2px dashed #e2e8f0;
  padding-bottom: 24px;

  h2 { font-size: 26px; font-weight: 900; color: #1a202c; margin-bottom: 10px; }
  p { color: #718096; font-size: 15px; font-weight: 500; }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 28px;
`;

const InfoItem = styled.div`
  background: #f7fafc;
  padding: 18px 12px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid #edf2f7;

  .label { font-size: 13px; color: #718096; margin-bottom: 6px; font-weight: 600; }
  .value { font-size: 20px; font-weight: 800; color: #2d3748; }
`;

const DiagnosisBox = styled.div`
  background: #f0fff4; /* 연한 초록색 배경으로 변경 (긍정적 신호) */
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 28px;
  border: 1px solid #c6f6d5;

  h3 { font-size: 17px; color: #2f855a; margin-bottom: 12px; font-weight: 800; }
  p { font-size: 19px; font-weight: 700; color: #276749; line-height: 1.6; word-break: keep-all; }
`;

const AdviceBox = styled.div`
  padding: 0 4px;
  h3 { font-size: 17px; color: #2d3748; margin-bottom: 16px; font-weight: 800; }
  .content {
    font-size: 16px;
    line-height: 1.8;
    color: #4a5568;
    white-space: pre-wrap;
    /* 리스트 스타일 가독성 높이기 */
    background: #ffffff;
    padding: 10px;
  }
`;

const Result = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // 백엔드 또는 가짜 데이터에서 result 추출
  const result = state?.result;

  if (!result) {
    return (
      <Layout title="알림">
        <Container>
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <span style={{ fontSize: '60px' }}>⚠️</span>
            <h2 style={{ marginTop: '20px', fontWeight: 800 }}>결과를 가져오지 못했어요</h2>
            <p style={{ color: '#718096', marginTop: '10px' }}>처음부터 다시 진행해주세요.</p>
          </div>
          <BottomButton onClick={() => navigate('/')} style={{ marginTop: '40px' }}>
            처음으로 돌아가기
          </BottomButton>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout title="내 진단 결과" showBack={false}>
      <Container>
        <ReportCard>
          <Header>
            <h2>AI 건강 소견서</h2>
            <p>{new Date(result.createdAt).toLocaleDateString()} 분석 완료</p>
          </Header>

          <InfoGrid>
            <InfoItem>
              <div className="label">아픈 부위</div>
              <div className="value">{result.bodyPartKorean}</div>
            </InfoItem>
            <InfoItem>
              <div className="label">통증 강도</div>
              <div className="value" style={{ color: result.intensity >= 4 ? '#e53e3e' : '#dd6b20' }}>
                {result.intensity} / 5
              </div>
            </InfoItem>
          </InfoGrid>

          <DiagnosisBox>
            <h3>🔍 AI 분석 내용</h3>
            <p>{result.aiDiagnosis || "분석 결과를 생성 중입니다."}</p>
          </DiagnosisBox>

          <AdviceBox>
            <h3>💡 이렇게 해보세요!</h3>
            <div className="content">
              • 무리한 움직임은 피하고 안정을 취하세요.<br />
              • 통증이 심해지면 즉시 병원을 방문하세요.<br />
              • 따뜻한 물을 마시고 푹 쉬는 것이 좋아요.
            </div>
          </AdviceBox>
        </ReportCard>

        <div style={{ marginTop: '30px', width: '100%', display: 'flex', gap: '12px' }}>
          <BottomButton
            style={{ flex: 1, backgroundColor: '#cbd5e0', color: '#4a5568' }}
            onClick={() => navigate('/home')}
          >
            다시 하기
          </BottomButton>
          <BottomButton
            style={{ flex: 2 }}
            onClick={() => alert('이미지로 저장 기능은 현재 준비 중입니다!')}
          >
            결과 저장하기
          </BottomButton>
        </div>
      </Container>
    </Layout>
  );
};

export default Result;