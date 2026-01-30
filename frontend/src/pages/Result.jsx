import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { QRCodeCanvas } from 'qrcode.react';
import Layout from '../components/common/Layout';
import { BottomButton } from '../components/common/Button';

// --- 스타일 컴포넌트 ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  padding: 20px;
  background-color: #f8f9fa;
  box-sizing: border-box;
`;

// 🚦 상단 신호등 섹션 (비중 확대)
const HighPrioritySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.$bgColor};
  border: 4px solid ${props => props.$color};
  border-radius: 32px;
  padding: 30px 20px;
  margin-bottom: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  flex-shrink: 0;

  .status-icon {
    font-size: 80px; /* 이모지 대폭 확대 */
    margin-bottom: 12px;
  }
  h2 {
    font-size: 32px; /* 문구 확대 */
    font-weight: 900;
    color: ${props => props.$color};
    margin: 0;
  }
  p {
    font-size: 16px;
    color: #718096;
    margin-top: 8px;
    font-weight: 600;
  }
`;

const MiddleGrid = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 16px;
  margin-bottom: 20px;
  flex-shrink: 0;
`;

const QRBox = styled.div`
  background: white;
  padding: 12px;
  border-radius: 20px;
  border: 1px solid #edf2f7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DataStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const InfoBar = styled.div`
  background: white;
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid #edf2f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .label { font-size: 12px; color: #718096; font-weight: 700; }
  .value { font-size: 16px; font-weight: 900; color: #2d3748; }
`;

// 📝 소견 박스 (절반 수준으로 축소 및 고정)
const SmallDiagnosis = styled.div`
  flex: 1; /* 남은 공간을 쓰되, 상단 섹션이 커져서 자연스럽게 줄어듦 */
  background: #f1f5f9;
  border-radius: 20px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  min-height: 120px; /* 너무 작아지지 않게 최소 높이 지정 */
  margin-bottom: 20px;

  b {
    color: #4DB6AC;
    font-size: 14px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .content {
    font-size: 14px;
    line-height: 1.6;
    color: #475569;
    overflow-y: auto;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0;
  padding-bottom: 10px;
`;

// --- 컴포넌트 본체 ---

const Result = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const result = state?.result;

  if (!result) return null;

  const getStatus = (intensity) => {
    const val = parseInt(intensity) || 0;
    if (val <= 2) return { color: '#4ADE80', bg: '#F0FDF4', icon: '😊', msg: '안심하셔도 돼요' };
    if (val <= 4) return { color: '#FACC15', bg: '#FFFBEB', icon: '😟', msg: '주의가 필요해요' };
    return { color: '#F87171', bg: '#FEF2F2', icon: '🚑', msg: '병원을 가야 해요' };
  };

  const status = getStatus(result.intensity);

  return (
    <Layout title="나의 건강 신호등" showBack={false}>
      <Container>
        {/* 1. 커진 신호등 섹션 */}
        <HighPrioritySection $bgColor={status.bg} $color={status.color}>
          <div className="status-icon">{status.icon}</div>
          <h2>{status.msg}</h2>
          <p>진단 번호: #{result.id || '001'}</p>
        </HighPrioritySection>

        {/* 2. 중간 정보 섹션 */}
        <MiddleGrid>
          <QRBox>
            <QRCodeCanvas
              value={`https://fuzzy-apes-make.loca.lt/doctor-view/${result.id}`}
              size={96}
            />
          </QRBox>
          <DataStack>
            <InfoBar>
              <span className="label">아픈 부위</span>
              <span className="value">{result.bodyPartKorean || "분석중"}</span>
            </InfoBar>
            <InfoBar>
              <span className="label">아픈 정도</span>
              <span className="value">{result.intensity}단계</span>
            </InfoBar>
          </DataStack>
        </MiddleGrid>

        {/* 3. 작아진 AI 소견 박스 */}
        <SmallDiagnosis>
          <b>🤖 AI 분석 소견</b>
          <div className="content">
            {result.aiDiagnosis || "분석 결과를 불러오는 중입니다."}
          </div>
        </SmallDiagnosis>

        {/* 4. 하단 버튼 */}
<ButtonGroup>
  <BottomButton
    style={{
      flex: 1,
      backgroundColor: '#CBD5E0',
      color: '#4A5568'
    }}
    onClick={() => {
      // 1. 보통 Home.jsx는 '/' 경로에 연결되어 있습니다.
      // 2. replace: true를 쓰면 '결과 페이지' 기록을 지워서 뒤로가기 해도 안 돌아오게 만듭니다. (더 깔끔함!)
      navigate('/home', { replace: true });
    }}
  >
    다시 하기
  </BottomButton>

  <BottomButton
    style={{ flex: 1.8 }}
    onClick={() => window.print()}
  >
    리포트 저장
  </BottomButton>
</ButtonGroup>
      </Container>
    </Layout>
  );
};

export default Result;