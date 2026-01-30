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
  flex: 1; padding: 20px; display: flex; flex-direction: column; align-items: center;
`;

const HeaderSection = styled.div`
  text-align: center; margin-bottom: 20px;
  h2 { font-size: 22px; font-weight: 800; color: #2D3436; }
  p { color: #636E72; margin-top: 6px; font-size: 15px; }
`;

const ToggleContainer = styled.div`
  display: flex; background: #f1f3f5; padding: 4px; border-radius: 12px; margin-bottom: 20px;
`;

const ToggleBtn = styled.button`
  padding: 8px 24px; border-radius: 10px; border: none; font-weight: 700;
  cursor: pointer; background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#00b894' : '#999'};
  transition: all 0.2s;
`;

const BodyCard = styled.div`
  position: relative; width: 100%; max-width: 320px; aspect-ratio: 0.75;
  background: white; border-radius: 32px; border: 1px solid #edf2f7;
  display: flex; justify-content: center; align-items: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
`;

const Marker = styled.div`
  position: absolute; width: 24px; height: 24px; background-color: #FF5252;
  border: 4px solid white; border-radius: 50%; z-index: 10; pointer-events: none;
  transform: translate(-50%, -50%);
  &::after {
    content: ''; position: absolute; width: 100%; height: 100%;
    background-color: #FF5252; border-radius: 50%; animation: ${ping} 1.2s infinite;
    left: 0; top: 0;
  }
`;

const Step1Body = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('front');
  const [selected, setSelected] = useState({ label: '', code: '' });
  const [markerPos, setMarkerPos] = useState({ x: 0, y: 0 });

  const handlePartClick = (e, label, code) => {
    e.stopPropagation();
    const rect = e.currentTarget.closest('.body-card-ref').getBoundingClientRect();
    setMarkerPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setSelected({ label, code });
  };

  const normalColor = "#E0F2F1";
  const activeColor = "#00b894";

  return (
    <Layout title="자가 진단" showBack={false}>
      <ProgressBar step={1} />
      <Container>
        <HeaderSection>
          <h2>어디가 아픈가요?</h2>
          <p>아픈 부위를 직접 눌러보세요</p>
        </HeaderSection>

        <ToggleContainer>
          <ToggleBtn active={view === 'front'} onClick={() => {setView('front'); setSelected({label:'', code:''});}}>앞모습</ToggleBtn>
          <ToggleBtn active={view === 'back'} onClick={() => {setView('back'); setSelected({label:'', code:''});}}>뒷모습</ToggleBtn>
        </ToggleContainer>

        <BodyCard className="body-card-ref">
          <svg viewBox="0 0 200 400" style={{ width: '85%', height: '90%' }}>
            {/* 머리 */}
            <circle cx="100" cy="45" r="30" fill={selected.code === 'HEAD' ? activeColor : normalColor}
              onClick={(e) => handlePartClick(e, "머리", "HEAD")} style={{cursor:'pointer'}} />

            {view === 'front' && (
              <g style={{ pointerEvents: 'none' }}>
                <circle cx="90" cy="40" r="2.5" fill="#636E72" />
                <circle cx="110" cy="40" r="2.5" fill="#636E72" />
                {/* 웃는 입: 곡률을 더 크게 조정 */}
                <path d="M 88 55 Q 100 68 112 55" stroke="#636E72" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* 목 */}
            <rect x="90" y="78" width="20" height="12" rx="4" fill={selected.code === 'NECK' ? activeColor : normalColor}
              onClick={(e) => handlePartClick(e, "목", "NECK")} style={{cursor:'pointer'}} />

            {view === 'front' ? (
              <g>
                {/* 왼쪽 어깨 */}
                <rect x="50" y="95" width="42" height="22" rx="11" fill={selected.code === 'SHOULDER_LEFT' ? activeColor : normalColor}
                  onClick={(e) => handlePartClick(e, "왼쪽 어깨", "SHOULDER_LEFT")} style={{cursor:'pointer'}} />
                {/* 오른쪽 어깨 (간격 8px 확보) */}
                <rect x="108" y="95" width="42" height="22" rx="11" fill={selected.code === 'SHOULDER_RIGHT' ? activeColor : normalColor}
                  onClick={(e) => handlePartClick(e, "오른쪽 어깨", "SHOULDER_RIGHT")} style={{cursor:'pointer'}} />

                <rect x="65" y="122" width="70" height="42" rx="12" fill={selected.code === 'CHEST' ? activeColor : normalColor} onClick={(e) => handlePartClick(e, "가슴", "CHEST")} style={{cursor:'pointer'}} />
                <rect x="65" y="168" width="70" height="50" rx="12" fill={selected.code === 'STOMACH' ? activeColor : normalColor} onClick={(e) => handlePartClick(e, "배", "STOMACH")} style={{cursor:'pointer'}} />
              </g>
            ) : (
              <g>
                <rect x="60" y="95" width="80" height="120" rx="15" fill={selected.code === 'BACK' ? activeColor : normalColor} onClick={(e) => handlePartClick(e, "등", "BACK")} style={{cursor:'pointer'}} />
              </g>
            )}

            {/* 팔 (어깨와 겹치지 않게 y좌표를 조금 내림) */}
            <rect x="18" y="120" width="26" height="110" rx="13" fill={selected.code === 'ARM_LEFT' ? activeColor : normalColor} onClick={(e) => handlePartClick(e, "왼팔", "ARM_LEFT")} style={{cursor:'pointer'}} />
            <rect x="156" y="120" width="26" height="110" rx="13" fill={selected.code === 'ARM_RIGHT' ? activeColor : normalColor} onClick={(e) => handlePartClick(e, "오른팔", "ARM_RIGHT")} style={{cursor:'pointer'}} />

            {/* 다리 */}
            <rect x="65" y="235" width="32" height="140" rx="16" fill={selected.code === 'LEG_LEFT' ? activeColor : normalColor} onClick={(e) => handlePartClick(e, "왼다리", "LEG_LEFT")} style={{cursor:'pointer'}} />
            <rect x="103" y="235" width="32" height="140" rx="16" fill={selected.code === 'LEG_RIGHT' ? activeColor : normalColor} onClick={(e) => handlePartClick(e, "오른다리", "LEG_RIGHT")} style={{cursor:'pointer'}} />
          </svg>

          {selected.code && <Marker style={{ left: markerPos.x, top: markerPos.y }} />}
        </BodyCard>

        <BottomButton
          disabled={!selected.code}
          onClick={() => navigate('/step2', { state: { bodyPart: selected.code } })}
        >
          {selected.label ? `${selected.label}를 눌렀어요 · 다음으로` : "아픈 곳을 눌러주세요"}
        </BottomButton>
      </Container>
    </Layout>
  );
};

export default Step1Body;