import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import ProgressBar from '../components/common/ProgressBar';

const Container = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

const LevelCard = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 24px;
  margin-bottom: 12px;
  border-radius: 24px;
  border: 3px solid ${props => props.isSelected ? '#4DB6AC' : 'white'};
  background-color: white;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);

  &:active { transform: scale(0.97); }
`;

const EmojiBox = styled.div`
  font-size: 40px;
  margin-right: 20px;
`;

const LabelBox = styled.div`
  text-align: left;
  .title { font-size: 20px; font-weight: 700; color: #2d3436; }
  .desc { font-size: 14px; color: #636e72; }
`;

const Step2Level = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selectedLevel, setSelectedLevel] = useState(null);

  const levels = [
    { id: 1, label: "조금 아파요", desc: "일상생활이 가능해요", emoji: "🙂" },
    { id: 2, label: "꽤 아파요", desc: "신경이 계속 쓰여요", emoji: "😟" },
    { id: 3, label: "많이 아파요", desc: "약을 먹어야 할 것 같아요", emoji: "😫" },
    { id: 4, label: "진짜 아파요", desc: "움직이기 힘들 정도예요", emoji: "😭" },
    { id: 5, label: "참기 힘들어요", desc: "당장 병원에 가야겠어요", emoji: "🌋" },
  ];

  return (
    <Layout title="상태 확인">
      <ProgressBar step={2} />
      <Container>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>얼마나 아파요?</h1>
        <p style={{ color: '#636e72', marginBottom: '24px' }}>{state?.part} 부위의 통증 정도를 알려주세요.</p>

        {levels.map((lvl) => (
          <LevelCard
            key={lvl.id}
            isSelected={selectedLevel?.id === lvl.id}
            onClick={() => setSelectedLevel(lvl)}
          >
            <EmojiBox>{lvl.emoji}</EmojiBox>
            <LabelBox>
              <div className="title">{lvl.label}</div>
              <div className="desc">{lvl.desc}</div>
            </LabelBox>
          </LevelCard>
        ))}

        <button
          disabled={!selectedLevel}
          onClick={() => navigate('/step3', { state: { ...state, level: selectedLevel.label } })}
          style={{
            marginTop: 'auto', padding: '20px', borderRadius: '24px', border: 'none',
            fontSize: '20px', fontWeight: '700', transition: 'all 0.2s',
            backgroundColor: selectedLevel ? '#4DB6AC' : '#dfe6e9',
            color: selectedLevel ? 'white' : '#b2bec3'
          }}
        >
          다음으로 넘어가기
        </button>
      </Container>
    </Layout>
  );
};

export default Step2Level;