import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { QRCodeCanvas } from 'qrcode.react';
import Layout from '../components/common/Layout';
import { BottomButton } from '../components/common/Button';

// --- 스타일 컴포넌트 ---
const Container = styled.div`
  flex: 1; padding: 20px; background-color: #f8f9fa;
  display: flex; flex-direction: column; align-items: center; padding-bottom: 60px;
`;

const TrafficLightContainer = styled.div`
  width: 100%; max-width: 480px; padding: 24px; background: white; border-radius: 32px;
  margin-bottom: 20px; text-align: center;
  border: 5px solid ${props => props.$color};
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
`;

const StatusIcon = styled.div` font-size: 64px; margin-bottom: 12px; `;

const StatusText = styled.h2`
  font-size: 26px; font-weight: 900; color: ${props => props.$color}; margin-bottom: 8px;
`;

const ReportCard = styled.div`
  width: 100%; max-width: 480px; background: white; border-radius: 32px;
  padding: 32px 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 1px solid #edf2f7;
`;

const QRWrapper = styled.div`
  background: #f7fafc; padding: 20px; border-radius: 24px;
  display: flex; flex-direction: column; align-items: center;
  margin-bottom: 24px; border: 2px dashed #cbd5e0;
  p { font-size: 14px; font-weight: 800; color: #4A5568; margin-top: 12px; }
`;

const InfoGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;
`;

const InfoItem = styled.div`
  background: #f8fafc; padding: 15px; border-radius: 20px; text-align: center;
  .label { font-size: 13px; color: #718096; margin-bottom: 4px; font-weight: 700; }
  .value { font-size: 18px; font-weight: 900; color: #2d3748; }
`;

const Result = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Loading에서 넘어온 실제 서버 데이터 (state.result가 메인 데이터)
  const result = state?.result;

  // 데이터가 없을 때의 예외 처리
  if (!result) {
    return (
      <Layout title="알림">
        <Container style={{ justifyContent: 'center' }}>
          <StatusIcon>⚠️</StatusIcon>
          <p style={{ textAlign: 'center', color: '#636e72', lineHeight: '1.6' }}>
            진단 정보를 찾을 수 없습니다.<br/>다시 처음부터 시도해주세요.
          </p>
          <BottomButton onClick={() => navigate('/')}>처음으로 이동</BottomButton>
        </Container>
      </Layout>
    );
  }

  // 통증 강도(intensity)에 따른 신호등 로직
  const getStatus = (intensity) => {
    const val = parseInt(intensity) || 0;
    if (val <= 2) return { color: '#4ADE80', icon: '😊', msg: '안심하셔도 좋습니다' };
    if (val <= 4) return { color: '#FACC15', icon: '😟', msg: '주의가 필요합니다' };
    return { color: '#F87171', icon: '🚑', msg: '빠른 진료가 필요합니다' };
  };

  const status = getStatus(result.intensity);

  return (
    <Layout title="나의 건강 신호등" showBack={false}>
      <Container>
        {/* 1. 신호등 섹션 */}
        <TrafficLightContainer $color={status.color}>
          <StatusIcon>{status.icon}</StatusIcon>
          <StatusText $color={status.color}>{status.msg}</StatusText>
          <p style={{ color: '#718096', fontSize: '14px', fontWeight: '600' }}>
            진단 번호: {result.id || 'N/A'}
          </p>
        </TrafficLightContainer>

        {/* 2. 상세 리포트 카드 */}
        <ReportCard>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', color: '#4DB6AC', fontWeight: '900', letterSpacing: '1px' }}>
              MEDICAL QR REPORT
            </span>
          </div>

          <QRWrapper>
            {/* 결과 상세 조회를 위한 QR 코드 */}
<QRCodeCanvas
  // 찍었을 때 이동할 주소: 도메인/doctor-view/리포트ID
  value={`${window.location.origin}/doctor-view/${result.id}`}
  size={160}
  level={"H"} // 인식률을 높이기 위한 설정
/>
            <p>담당 의사 확인용 QR 코드</p>
          </QRWrapper>

<InfoGrid>
  <InfoItem>
    <div className="label">아픈 부위</div>
    {/* result.bodyPart가 "3"으로 찍힌다면,
       우선 순위를 bodyPartKorean(서버가 준 한글)으로 두어 해결합니다.
    */}
    <div className="value">
      {result.bodyPartKorean || (result.bodyPart !== result.intensity ? result.bodyPart : "분석중")}
    </div>
  </InfoItem>
  <InfoItem>
    <div className="label">통증 강도</div>
    <div className="value">{result.intensity}단계</div>
  </InfoItem>
</InfoGrid>

          {/* AI 진단 결과 소견 */}
          <div style={{ background: '#f1f5f9', padding: '18px', borderRadius: '20px', fontSize: '14px', lineHeight: '1.6' }}>
             <b style={{ color: '#4DB6AC' }}>🤖 AI 분석 소견:</b><br/>
             {result.aiDiagnosis || "분석 결과를 불러오는 중입니다."}
          </div>
        </ReportCard>

        {/* 3. 하단 버튼 영역 */}
        <div style={{ marginTop: '30px', width: '100%', display: 'flex', gap: '12px', maxWidth: '480px' }}>
          <BottomButton
            style={{ flex: 1, backgroundColor: '#CBD5E0', color: '#4A5568' }}
            onClick={() => navigate('/')}
          >
            다시 하기
          </BottomButton>
          <BottomButton
            style={{ flex: 2 }}
            onClick={() => window.print()}
          >
            리포트 저장
          </BottomButton>
        </div>
      </Container>
    </Layout>
  );
};

export default Result;