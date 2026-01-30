import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Layout from '../components/common/Layout';
import ProgressBar from '../components/common/ProgressBar';
import { BottomButton } from '../components/common/Button';

const ping = keyframes`
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
`;

const Container = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* 내부 요소들을 위아래로 분산 */
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h2 { font-size: 24px; font-weight: 800; color: #2D3436; margin: 0; }
  p { color: #636E72; margin-top: 8px; font-size: 16px; }
`;

const BodyCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 350px; /* 너무 퍼지지 않게 제한 */
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.04);
  border: 1px solid #edf2f7;
  aspect-ratio: 0.85; /* 비율 살짝 조정 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Marker = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #FF5252;
  border: 3px solid white;
  border-radius: 50%;
  z-index: 10;
  pointer-events: none;
  &::after {
    content: ''; position: absolute; width: 100%; height: 100%;
    background-color: #FF5252; border-radius: 50%;
    animation: ${ping} 1.2s infinite;
  }
`;

const Step1Body = () => {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState(null);
  const [markerPos, setMarkerPos] = useState({ x: 0, y: 0 });

  const handleBodyClick = (e, partName) => {
    // 부모 카드를 기준으로 좌표 계산
    const rect = e.currentTarget.closest('.body-card-ref').getBoundingClientRect();
    setMarkerPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setSelectedPart(partName);
  };

  return (
    <Layout title="자가 진단" showBack={false}>
      <ProgressBar step={1} />

      <Container>
        <HeaderSection>
          <h2>어디가 아파요?</h2>
          <p>아픈 부위를 콕 눌러주세요</p>
        </HeaderSection>

        <BodyCard className="body-card-ref" onClick={(e) => handleBodyClick(e, "몸체")}>
          <svg viewBox="0 0 200 400" style={{ width: '70%', height: '80%' }}>
            {/* 머리 */}
            <circle cx="100" cy="60" r="35" fill="#E0F2F1"
              onClick={(e) => {e.stopPropagation(); handleBodyClick(e, "머리")}}
              style={{ cursor: 'pointer' }}
            />
            {/* 상체 */}
            <rect x="60" y="105" width="80" height="120" rx="20" fill="#E0F2F1"
              onClick={(e) => {e.stopPropagation(); handleBodyClick(e, "가슴/배")}}
              style={{ cursor: 'pointer' }}
            />
            {/* 왼팔 */}
            <rect x="25" y="110" width="25" height="100" rx="12" fill="#E0F2F1"
              onClick={(e) => {e.stopPropagation(); handleBodyClick(e, "팔")}}
              style={{ cursor: 'pointer' }}
            />
            {/* 오른팔 */}
            <rect x="150" y="110" width="25" height="100" rx="12" fill="#E0F2F1"
              onClick={(e) => {e.stopPropagation(); handleBodyClick(e, "팔")}}
              style={{ cursor: 'pointer' }}
            />
          </svg>
          {selectedPart && <Marker style={{ left: markerPos.x, top: markerPos.y }} />}
        </BodyCard>

        <BottomButton
          disabled={!selectedPart}
          onClick={() => navigate('/step2', { state: { part: selectedPart } })}
        >
          {selectedPart ? `${selectedPart} 선택함 · 다음으로` : "부위를 선택해주세요"}
        </BottomButton>
      </Container>
    </Layout>
  );
};

export default Step1Body;