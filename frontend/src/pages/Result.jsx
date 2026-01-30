import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { QRCodeCanvas } from 'qrcode.react';
import Layout from '../components/common/Layout';
import { BottomButton } from '../components/common/Button';
import { getReportDetail } from '../api/reportService';

// --- Styled Components ---
const Container = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`;

/* 🚦 사용자용: 건강 신호등 섹션 */
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
  transition: all 0.5s ease;
`;

const StatusIcon = styled.div` font-size: 64px; margin-bottom: 12px; `;
const StatusText = styled.h2`
  font-size: 26px; font-weight: 900; color: ${props => props.$color}; margin-bottom: 8px;
`;

/* 📄 의료진용: 리포트 카드 */
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
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. 상태 판별 로직 (신호등 색상 설정)
  const getStatus = (intensity) => {
    const val = parseInt(intensity) || 3;
    if (val <= 1) return { color: '#4ADE80', icon: '😊', msg: '천천히 쉬면 괜찮아질 거예요', doctor: '경증' };
    if (val <= 3) return { color: '#FACC15', icon: '😟', msg: '의사 선생님께 꼭 보여주세요', doctor: '관찰 요망' };
    return { color: '#F87171', icon: '🚑', msg: '지금 바로 도움이 필요해요!', doctor: '긴급 진료 권장' };
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const id = state?.reportId || 101; // 테스트용 ID
        const data = await getReportDetail(id);
        setResult(data);
      } catch (err) {
        console.error("데이터 로드 실패");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [state]);

  if (loading) return <Container>AI 분석 중...</Container>;

  const status = getStatus(result?.intensity);
  // 의사용 웹페이지 주소 (본인 IP로 수정 필요)
  const doctorLink = `http://192.168.0.XX:3000/doctor-view/${result?.id}`;

  return (
    <Layout title="나의 건강 신호등" showBack={false}>
      <Container>
        {/* 🚦 환자용 직관적 지표 */}
        <TrafficLightContainer $color={status.color}>
          <StatusIcon>{status.icon}</StatusIcon>
          <StatusText $color={status.color}>{status.msg}</StatusText>
          <p style={{color: '#718096', fontSize: '15px', fontWeight: '600'}}>
            내 몸이 보내는 신호예요
          </p>
        </TrafficLightContainer>

        {/* 📄 의사용 QR 리포트 */}
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
              <div className="value">{result?.bodyPartKorean}</div>
            </InfoItem>
            <InfoItem>
              <div className="label">아픈 정도</div>
              <div className="value">{result?.intensity}</div>
            </InfoItem>
          </InfoGrid>

          <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '15px', fontSize: '14px', color: '#475569' }}>
             <b>💡 환자 소통 팁:</b> {result?.communicationTip || "질문 후 대답까지 5초 이상 기다려주세요."}
          </div>
        </ReportCard>

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