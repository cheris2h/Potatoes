import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { QRCodeCanvas } from 'qrcode.react';
import Layout from '../components/common/Layout';
import { BottomButton } from '../components/common/Button';

// --- 스타일 컴포넌트 (기존 디자인 유지) ---
const Container = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`;

const TrafficLightContainer = styled.div`
  width: 100%;
  max-width: 480px;
  padding: 24px;
  background: white;
  border-radius: 32px;
  margin-bottom: 20px;
  text-align: center;
  border: 5px solid ${props => props.$color};
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
`;

const StatusIcon = styled.div` font-size: 64px; margin-bottom: 12px; `;
const StatusText = styled.h2`
  font-size: 26px; font-weight: 900; color: ${props => props.$color}; margin-bottom: 8px;
`;

const ReportCard = styled.div`
  width: 100%;
  max-width: 480px;
  background: white;
  border-radius: 32px;
  padding: 32px 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  border: 1px solid #edf2f7;
`;

const QRWrapper = styled.div`
  background: #f7fafc;
  padding: 20px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  border: 2px dashed #cbd5e0;
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

  // Loading 페이지에서 넘어온 데이터 (result 객체)
  const result = state?.result;

  // 데이터가 없을 경우 (예: 직접 주소 입력 진입 등)
  if (!result || typeof result === 'number') {
    return (
      <Layout title="알림" showBack={true}>
        <Container>
          <p style={{textAlign: 'center', marginTop: '50px'}}>
            분석 데이터를 불러오지 못했습니다.<br/>
            백엔드 컨트롤러가 객체를 리턴하는지 확인해주세요.
          </p>
          <BottomButton onClick={() => navigate('/')} style={{marginTop: '20px'}}>
            처음으로 이동
          </BottomButton>
        </Container>
      </Layout>
    );
  }

  // 1. 신호등 상태 로직
  const getStatus = (intensity) => {
    const val = parseInt(intensity) || 3;
    if (val <= 1) return { color: '#4ADE80', icon: '😊', msg: '천천히 쉬면 괜찮아질 거예요' };
    if (val <= 3) return { color: '#FACC15', icon: '😟', msg: '의사 선생님께 꼭 보여주세요' };
    return { color: '#F87171', icon: '🚑', msg: '지금 바로 도움이 필요해요!' };
  };

  const status = getStatus(result.intensity);

  // 2. 부위명 한글 변환 매퍼
  const partNameMap = {
    HEAD: "머리", CHEST: "가슴", STOMACH: "배",
    BACK: "몸체/등", ARM_LEFT: "왼팔", ARM_RIGHT: "오른팔",
    LEG_LEFT: "왼다리", LEG_RIGHT: "오른다리", NECK: "목", SHOULDER: "어깨"
  };

  // QR 코드에 담길 링크 (실제 배포 시 도메인 주소로 변경 필요)
  const doctorLink = `http://localhost:3000/doctor-view/${result.id}`;

  return (
    <Layout title="나의 건강 신호등" showBack={false}>
      <Container>
        {/* 🚦 환자용 신호등 표시 */}
        <TrafficLightContainer $color={status.color}>
          <StatusIcon>{status.icon}</StatusIcon>
          <StatusText $color={status.color}>{status.msg}</StatusText>
          <p style={{color: '#718096', fontSize: '15px', fontWeight: '600'}}>
            내 몸이 보내는 신호예요
          </p>
        </TrafficLightContainer>

        {/* 📄 의료진용 리포트 카드 */}
        <ReportCard>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '14px', color: '#4DB6AC', fontWeight: '900' }}>MEDICAL QR REPORT</span>
            <h3 style={{ fontSize: '20px', fontWeight: '900', marginTop: '5px' }}>의사 선생님 확인용</h3>
          </div>

          <QRWrapper>
            <QRCodeCanvas value={doctorLink} size={160} />
            <p>이 화면을 의사 선생님께 보여주세요</p>
          </QRWrapper>

          <InfoGrid>
            <InfoItem>
              <div className="label">아픈 곳</div>
              <div className="value">{partNameMap[result.bodyPart] || result.bodyPart}</div>
            </InfoItem>
            <InfoItem>
              <div className="label">아픈 정도</div>
              <div className="value">{result.intensity}단계</div>
            </InfoItem>
          </InfoGrid>

          {/* AI 진단 결과 섹션 */}
          <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '15px', fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
             <b style={{color: '#4DB6AC'}}>🤖 AI 분석 소견:</b><br/>
             {result.aiDiagnosis || "분석 결과를 불러오는 중입니다."}
          </div>
        </ReportCard>

        {/* 하단 제어 버튼 */}
        <div style={{ marginTop: '30px', width: '100%', display: 'flex', gap: '12px', maxWidth: '480px' }}>
          <BottomButton
            style={{ flex: 1, backgroundColor: '#CBD5E0', color: '#4A5568' }}
            onClick={() => navigate('/')}
          >다시 하기</BottomButton>
          <BottomButton
            style={{ flex: 2 }}
            onClick={() => alert('사진첩에 저장되었습니다!')}
          >사진으로 저장하기</BottomButton>
        </div>
      </Container>
    </Layout>
  );
};

export default Result;