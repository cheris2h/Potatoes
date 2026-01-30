import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import ProgressBar from '../components/common/ProgressBar';
import { BottomButton } from '../components/common/Button';

// 1. 가짜 데이터 (Mock Data) - 별도 파일로 뽑아도 됩니다.
const MOCK_LEVELS = {
  1: { label: "조금 아파요", color: "#3498db", emoji: "🙂" }, // 파랑
  2: { label: "꽤 아파요", color: "#2ecc71", emoji: "😟" },   // 초록
  3: { label: "많이 아파요", color: "#f1c40f", emoji: "😫" }, // 노랑
  4: { label: "진짜 아파요", color: "#e67e22", emoji: "😭" }, // 주황
  5: { label: "참기 힘들어요", color: "#e74c3c", emoji: "🌋" }, // 빨강
};

const Container = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  /* 너무 길쭉해 보이지 않도록 중앙 정렬 요소 추가 */
  justify-content: center;
  max-height: 85vh; /* 헤더/프로그레스바 제외한 높이 제한 */
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px; /* 요소 간의 일정한 간격 */
`;

const MiniBodyCard = styled.div`
  width: 200px; /* 크기를 고정하여 길쭉함을 방지 */
  height: 200px;
  background: white;
  border-radius: 32px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid #f1f3f5;
`;

const SliderContainer = styled.div`
  width: 100%;
  max-width: 320px; /* 슬라이더 너비 제한 */
  text-align: center;
`;

const StyledSlider = styled.input`
  width: 100%;
  margin: 24px 0;
  appearance: none;
  height: 10px;
  border-radius: 10px;
  background: #edf2f7;
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${props => props.$color};
    border: 5px solid white;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
`;

const LevelDisplay = styled.div`
  .emoji { font-size: 56px; display: block; margin-bottom: 8px; }
  .label { font-size: 24px; font-weight: 800; color: ${props => props.$color}; }
`;
// ... 상단 import 및 스타일 코드는 동일 ...

const Step2Level = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Step 1에서 보낸 { bodyPart: "HEAD" } 등이 들어있음
  const [level, setLevel] = useState(3);

  // 1. Step 1에서 넘겨준 데이터 확인 (없을 경우를 대비해 기본값 설정)
  const selectedPart = state?.bodyPart || "BODY";
  const current = MOCK_LEVELS[level];

  // 2. 하이라이트 표시를 위한 매핑 (영문 Enum 값에 대응)
  const getHighlight = (part) => {
    switch(part) {
      case "HEAD": return { cx: 100, cy: 70, r: 50 };
      case "CHEST": return { cx: 100, cy: 165, r: 60 };
      case "ARM": return { cx: 150, cy: 150, r: 50 };
      case "LEG": return { cx: 100, cy: 300, r: 70 };
      default: return { cx: 100, cy: 165, r: 80 };
    }
  };

  const highlight = getHighlight(selectedPart);

  return (
    <Layout title="상태 확인" showBack={true}>
      <ProgressBar step={2} />
      <Container>
        <ContentWrapper>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#2d3436' }}>얼마나 아픈가요?</h2>
            <p style={{ color: '#636e72', fontSize: '15px' }}>슬라이더를 밀어 통증을 표현해주세요</p>
          </div>

          <MiniBodyCard>
            <svg viewBox="0 0 200 400" style={{ width: '120px', height: '160px', opacity: 0.15 }}>
              <circle cx="100" cy="60" r="35" fill="#2d3436" />
              <rect x="60" y="105" width="80" height="120" rx="20" fill="#2d3436" />
              <rect x="25" y="110" width="25" height="100" rx="12" fill="#2d3436" />
              <rect x="150" y="110" width="25" height="100" rx="12" fill="#2d3436" />
              <rect x="65" y="235" width="30" height="130" rx="15" fill="#2d3436" />
              <rect x="105" y="235" width="30" height="130" rx="15" fill="#2d3436" />
            </svg>

            <svg viewBox="0 0 200 400" style={{ position: 'absolute', width: '120px', height: '160px' }}>
              <circle
                cx={highlight.cx} cy={highlight.cy} r={highlight.r}
                fill={current.color} fillOpacity="0.5"
                stroke={current.color} strokeWidth="4"
              />
            </svg>
          </MiniBodyCard>

          <SliderContainer>
            <LevelDisplay $color={current.color}>
              <span className="emoji">{current.emoji}</span>
              <div className="label">{current.label}</div>
            </LevelDisplay>

            <StyledSlider
              type="range" min="1" max="5" step="1"
              value={level} $color={current.color}
              onChange={(e) => setLevel(parseInt(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#adb5bd', fontSize: '13px', fontWeight: '600' }}>
              <span>약함</span>
              <span>강함</span>
            </div>
          </SliderContainer>
        </ContentWrapper>

        <div style={{ marginTop: 'auto', width: '100%' }}>
          {/* 3. 다음 단계로 넘길 때 기존 state와 새로운 level(intensity)을 합침 */}
          <BottomButton onClick={() => navigate('/step3', {
            state: {
              ...state,
              intensity: String(level) // 백엔드 DTO가 String이면 변환해서 전송
            }
          })}>
            선택 완료
          </BottomButton>
        </div>
      </Container>
    </Layout>
  );
};

export default Step2Level;