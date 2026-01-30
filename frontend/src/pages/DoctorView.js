import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// --- 스타일 컴포넌트 (기존 동일) ---
const PageContainer = styled.div` max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f7f9; min-height: 100vh; font-family: 'Pretendard', sans-serif; `;
const ReportHeader = styled.header` background: #2d3748; color: white; padding: 24px; border-radius: 16px 16px 0 0; display: flex; justify-content: space-between; align-items: center; .patient-info h1 { font-size: 24px; margin-bottom: 4px; } .timestamp { font-size: 14px; opacity: 0.8; } `;
const Section = styled.section` background: white; padding: 20px; margin-top: 12px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); h2 { font-size: 16px; color: #4A5568; margin-bottom: 12px; font-weight: 800; border-left: 4px solid #4DB6AC; padding-left: 10px; } `;
const AlertCard = styled.div` background: #FFF5F5; border: 1px solid #FEB2B2; color: #C53030; padding: 15px; border-radius: 8px; margin-bottom: 10px; font-weight: 700; display: flex; align-items: center; gap: 10px; `;
const AnalysisBox = styled.div` background: #EBF8FF; padding: 15px; border-radius: 10px; border-left: 4px solid #3182CE; line-height: 1.6; font-weight: 500; color: #2C5282; `;
const Tag = styled.span` display: inline-block; background: #EDF2F7; padding: 6px 12px; border-radius: 20px; margin-right: 8px; margin-bottom: 8px; font-size: 14px; font-weight: 600; `;

const DoctorView = () => {
  const { reportId } = useParams();
  const [data, setData] = useState(null);

  // 💡 해커톤용 무적의 가짜 데이터
  const mockData = {
    userName: "김포테",
    createdAt: new Date().toISOString(),
    allergy: "페니실린 계열 항생제",
    chronicDisease: "뇌병변 장애, 고혈압",
    currentMedication: "아스피린, 혈압 조절제",
    communicationTags: ["신체접촉_민감", "그림설명_선호", "대답_대기시간필요"],
    bodyPartKorean: "우측 하복부",
    symptomIcon: "🚨",
    aiDiagnosis: "환자가 해당 부위에 박동성 통증과 작열감을 반복적으로 호소함. 급성 충수염(맹장염) 초기 증상과 유사한 양상을 보이며, 발달장애인의 경우 통증 표현이 제한적일 수 있으므로 즉각적인 촉진 및 혈액 검사를 권장합니다."
  };

  useEffect(() => {
    // 서버가 없어도 0.5초 뒤에 가짜 데이터를 보여줌
    const timer = setTimeout(() => {
      setData(mockData);
    }, 500);
    return () => clearTimeout(timer);
  }, [reportId]);

  if (!data) return <div style={{padding: '50px', textAlign: 'center'}}>리포트 분석 중...</div>;

  return (
    <PageContainer>
      <ReportHeader>
        <div className="patient-info">
          <h1>{data.userName} 환자</h1>
          <div className="timestamp">진단 일시: {new Date(data.createdAt).toLocaleString()}</div>
        </div>
        <div style={{textAlign: 'right'}}>
          <span style={{background: '#4DB6AC', padding: '4px 8px', borderRadius: '4px', fontSize: '12px'}}>신규 리포트</span>
        </div>
      </ReportHeader>

      <Section>
        <h2>⚠️ 필수 확인 (Medical Passport)</h2>
        <AlertCard>🚫 알레르기: {data.allergy}</AlertCard>
        <div style={{padding: '5px'}}>
          <p><b>기왕력:</b> {data.chronicDisease}</p>
          <p><b>복용약:</b> {data.currentMedication}</p>
        </div>
      </Section>

      <Section>
        <h2>🤝 환자 소통 가이드라인</h2>
        <div style={{marginBottom: '10px'}}>
          {data.communicationTags.map(tag => <Tag key={tag}>#{tag}</Tag>)}
        </div>
        <p style={{fontSize: '14px', color: '#718096'}}>
          * 환자가 좋아하는 <b>'뽀로로'</b> 캐릭터를 언급하면 불안 완화에 도움이 됩니다.
        </p>
      </Section>

      <Section>
        <h2>🔍 AI 임상 분석 (Clinical Insight)</h2>
        <div style={{marginBottom: '10px'}}>
            <b>입력 증상:</b> {data.bodyPartKorean} {data.symptomIcon}
        </div>
        <AnalysisBox>
          {data.aiDiagnosis}
        </AnalysisBox>
      </Section>

      <footer style={{textAlign: 'center', marginTop: '30px', color: '#A0AEC0', fontSize: '12px'}}>
        POTATOES Digital Health Bridge - Medical Assistant API v1.0
      </footer>
    </PageContainer>
  );
};

export default DoctorView;