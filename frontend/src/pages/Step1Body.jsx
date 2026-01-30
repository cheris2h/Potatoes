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
  justify-content: space-between;
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
  max-width: 350px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.04);
  border: 1px solid #edf2f7;
  aspect-ratio: 0.85;
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
  const [selectedPart, setSelectedPart] = useState(null); // 화면 표시용 (한글)
  const [backendPart, setBackendPart] = useState(null);   // 백엔드 전송용 (영문)
  const [markerPos, setMarkerPos] = useState({ x: 0, y: 0 });

// 수정 (백엔드 로그에 찍힌 허용 값으로 매칭)
const partMap = {
  "머리": "HEAD",
  "가슴/배": "STOMACH", // 또는 CHEST
  "팔": "ARM_LEFT",    // 백엔드 리스트에 있는 ARM_LEFT 또는 ARM_RIGHT 사용
  "다리": "LEG_LEFT",   // 백엔드 리스트에 있는 LEG_LEFT 또는 LEG_RIGHT 사용
  "몸체": "CHEST"      // 임시로 CHEST로 매칭
};

  const handleBodyClick = (e, partName) => {
    const rect = e.currentTarget.closest('.body-card-ref').getBoundingClientRect();
    setMarkerPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    setSelectedPart(partName);
    setBackendPart(partMap[partName] || "BODY");
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
            <circle cx="100" cy="60" r="35" fill="#E0F2F1"
              onClick={(e) => {e.stopPropagation(); handleBodyClick(e, "머리")}}
              style={{ cursor: 'pointer' }}
            />
            <rect x="60" y="105" width="80" height="120" rx="20" fill="#E0F2F1"
              onClick={(e) => {e.stopPropagation(); handleBodyClick(e, "가슴/배")}}
              style={{ cursor: 'pointer' }}
            />
            <rect x="25" y="110" width="25" height="100" rx="12" fill="#E0F2F1"
              onClick={(e) => {e.stopPropagation(); handleBodyClick(e, "팔")}}
              style={{ cursor: 'pointer' }}
            />
            <rect x="150" y="110" width="25" height="100" rx="12" fill="#E0F2F1"
              onClick={(e) => {e.stopPropagation(); handleBodyClick(e, "팔")}}
              style={{ cursor: 'pointer' }}
            />
            <rect x="65" y="235" width="30" height="130" rx="15" fill="#E0F2F1"
              onClick={(e) => {e.stopPropagation(); handleBodyClick(e, "다리")}}
              style={{ cursor: 'pointer' }}
            />
            <rect x="105" y="235" width="30" height="130" rx="15" fill="#E0F2F1"
              onClick={(e) => {e.stopPropagation(); handleBodyClick(e, "다리")}}
              style={{ cursor: 'pointer' }}
            />
          </svg>
          {selectedPart && <Marker style={{ left: markerPos.x, top: markerPos.y }} />}
        </BodyCard>

        <BottomButton
          disabled={!selectedPart}
          onClick={() => navigate('/step2', { state: { bodyPart: backendPart } })}
        >
          {selectedPart ? `${selectedPart} 선택함 · 다음으로` : "부위를 선택해주세요"}
        </BottomButton>
      </Container>
    </Layout>
  ); // 여기서 return문 끝
}; // 여기서 Step1Body 함수 끝

export default Step1Body; // 함수 밖에서 export!