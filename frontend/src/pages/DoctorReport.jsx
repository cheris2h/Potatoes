import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// --- 스타일 컴포넌트 ---
const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f7f9;
  min-height: 100vh;
  font-family: 'Pretendard', sans-serif;
`;

const ReportHeader = styled.header`
  background: #2d3748;
  color: white;
  padding: 24px;
  border-radius: 16px 16px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .patient-info h1 {
    font-size: 24px;
    margin-bottom: 4px;
  }

  .timestamp {
    font-size: 14px;
    opacity: 0.8;
  }
`;

const Section = styled.section`
  background: white;
  padding: 20px;
  margin-top: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 16px;
    color: #4a5568;
    margin-bottom: 12px;
    font-weight: 800;
    border-left: 4px solid #4db6ac;
    padding-left: 10px;
  }
`;

const AlertCard = styled.div`
  background: #fff5f5;
  border: 1px solid #feb2b2;
  color: #c53030;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AnalysisBox = styled.div`
  background: #ebf8ff;
  padding: 15px;
  border-radius: 10px;
  border-left: 4px solid #3182ce;
  line-height: 1.6;
  font-weight: 500;
  color: #2c5282;
`;

const Tag = styled.span`
  display: inline-block;
  background: #edf2f7;
  padding: 6px 12px;
  border-radius: 20px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
`;

const DoctorReport = () => {
  const { reportId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // 홍감자 환자 & 오른팔 통증 데이터
    const mockData = {
      userName: "홍감자",
      createdAt: new Date().toISOString(),
      allergy: "페니실린, 아스피린 계열 항생제",
      chronicDisease: "지적 장애, 어깨 관절염",
      currentMedication: "근이완제, 혈압약",
      communicationTags: ["큰소리_거부감", "구체적_지시필요", "신체접촉_사전동의필요"],
      bodyPartKorean: "우측 상완 및 어깨(오른팔)",
      symptomIcon: "💪",
      aiDiagnosis: "환자가 우측 팔을 들어 올릴 때 날카로운 통증을 호소하며, 관절 가동 범위(ROM)가 현저히 제한된 상태입니다. 야간 통증이 동반되는 것으로 보아 회전근개 파열 또는 상완이두근 건염의 가능성이 높습니다. 발달장애 특성상 통증 수치를 과소평가할 수 있으므로, 즉각적인 초음파 검사 및 MRI 촬영을 통한 구조적 손상 확인이 시급합니다."
    };

    const timer = setTimeout(() => {
      setData(mockData);
    }, 500);

    return () => clearTimeout(timer);
  }, [reportId]);

  if (!data) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', color: '#718096' }}>
        <h3>데이터를 분석 중입니다...</h3>
      </div>
    );
  }

  return (
    <PageContainer>
      <ReportHeader>
        <div className="patient-info">
          <h1>{data.userName} 환자 소견서</h1>
          <div className="timestamp">
            발행 일시: {new Date(data.createdAt).toLocaleString('ko-KR')}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ background: '#4db6ac', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
            의료진 전용
          </span>
        </div>
      </ReportHeader>

      <Section>
        <h2>⚠️ 필수 확인 (Medical Passport)</h2>
        <AlertCard>🚫 알레르기: {data.allergy}</AlertCard>
        <div style={{ padding: '5px', fontSize: '15px', color: '#2D3748' }}>
          <p style={{ marginBottom: '8px' }}><b>기왕력:</b> {data.chronicDisease}</p>
          <p><b>복용약:</b> {data.currentMedication}</p>
        </div>
      </Section>

      <Section>
        <h2>🤝 환자 맞춤 소통 가이드</h2>
        <div style={{ marginBottom: '10px' }}>
          {data.communicationTags.map(tag => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
        </div>
        <p style={{ fontSize: '14px', color: '#4A5568', lineHeight: '1.5', background: '#f8f9fa', padding: '10px', borderRadius: '8px' }}>
          * <b>전달 팁:</b> 진료 시 갑작스러운 신체 접촉은 불안을 유발할 수 있습니다. <b>"팔을 살짝 만져봐도 될까요?"</b>라고 먼저 물어봐 주시면 협조도가 높아집니다.
        </p>
      </Section>

      <Section>
        <h2>🔍 AI 임상 분석 리포트</h2>
        <div style={{ marginBottom: '12px', fontSize: '15px' }}>
          <b>의심 부위:</b> {data.bodyPartKorean} {data.symptomIcon}
        </div>
        <AnalysisBox>
          {data.aiDiagnosis}
        </AnalysisBox>
      </Section>

      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#A0AEC0', fontSize: '12px', paddingBottom: '20px' }}>
        <p>POTATOES Digital Health Bridge - Medical Assistant API v1.0</p>
        <p>© 2026 Potatoes. All rights reserved.</p>
      </footer>
    </PageContainer>
  );
};

export default DoctorReport;