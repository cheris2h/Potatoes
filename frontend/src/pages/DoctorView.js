import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getReportDetail } from '../api/reportService';

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

  .patient-info h1 { font-size: 24px; margin-bottom: 4px; }
  .timestamp { font-size: 14px; opacity: 0.8; }
`;

const Section = styled.section`
  background: white;
  padding: 20px;
  margin-top: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  h2 { font-size: 16px; color: #4A5568; margin-bottom: 12px; font-weight: 800; border-left: 4px solid #4DB6AC; padding-left: 10px; }
`;

const AlertCard = styled.div`
  background: #FFF5F5;
  border: 1px solid #FEB2B2;
  color: #C53030;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AnalysisBox = styled.div`
  background: #EBF8FF;
  padding: 15px;
  border-radius: 10px;
  border-left: 4px solid #3182CE;
  line-height: 1.6;
  font-weight: 500;
  color: #2C5282;
`;

const Tag = styled.span`
  display: inline-block;
  background: #EDF2F7;
  padding: 6px 12px;
  border-radius: 20px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
`;

const DoctorView = () => {
  const { reportId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchFullData = async () => {
      // 실제 구현 시 유저 정보와 리포트 정보를 Join해서 가져와야 함
      const report = await getReportDetail(reportId);
      setData(report);
    };
    fetchFullData();
  }, [reportId]);

  if (!data) return <p>리포트를 불러오는 중입니다...</p>;

  return (
    <PageContainer>
      <ReportHeader>
        <div className="patient-info">
          <h1>{data.userName || "김포테"} 환자</h1>
          <div className="timestamp">진료 일시: {new Date(data.createdAt).toLocaleString()}</div>
        </div>
        <div style={{textAlign: 'right'}}>
          <span style={{background: '#4DB6AC', padding: '4px 8px', borderRadius: '4px', fontSize: '12px'}}>신규 리포트</span>
        </div>
      </ReportHeader>

      {/* 1. 안전 경고 (알레르기, 복용 약 등) */}
      <Section>
        <h2>⚠️ 필수 확인 (Medical Passport)</h2>
        <AlertCard>🚫 알레르기: {data.allergy || "없음"}</AlertCard>
        <div style={{padding: '5px'}}>
          <p><b>기왕력:</b> {data.chronicDisease || "당뇨, 고혈압"}</p>
          <p><b>복용약:</b> {data.currentMedication || "아스피린"}</p>
        </div>
      </Section>

      {/* 2. 환자 소통 가이드 (발달장애인 특화) */}
      <Section>
        <h2>🤝 환자 소통 가이드라인</h2>
        <div style={{marginBottom: '10px'}}>
          {data.communicationTags?.map(tag => <Tag key={tag}>#{tag}</Tag>) || (
            <>
              <Tag>#신체접촉_민감</Tag>
              <Tag>#그림설명_선호</Tag>
              <Tag>#대답_대기시간필요</Tag>
            </>
          )}
        </div>
        <p style={{fontSize: '14px', color: '#718096'}}>
          * 환자가 좋아하는 <b>'뽀로로'</b> 캐릭터를 언급하면 불안 완화에 도움이 됩니다.
        </p>
      </Section>

      {/* 3. AI 전문 분석 (AAC 번역 결과) */}
      <Section>
        <h2>🔍 AI 임상 분석 (Clinical Insight)</h2>
        <div style={{marginBottom: '10px'}}>
            <b>입력 증상:</b> {data.bodyPartKorean} ({data.symptomIcon})
        </div>
        <AnalysisBox>
          {data.aiDiagnosis || "환자가 우하복부에 박동성 통증과 작열감을 호소함. 급성 충수염 가능성을 시사하므로 촉진 및 혈액 검사 권장함."}
        </AnalysisBox>
      </Section>

      <footer style={{textAlign: 'center', marginTop: '30px', color: '#A0AEC0', fontSize: '12px'}}>
        POTATOES Digital Health Bridge - Medical Assistant API v1.0
      </footer>
    </PageContainer>
  );
};

export default DoctorView;