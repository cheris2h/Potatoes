import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import ProgressBar from '../components/common/ProgressBar';
import { BottomButton } from '../components/common/Button';

// 1. 증상 데이터 구성 (ARM_RIGHT 문구 수정)
const SYMPTOM_OPTIONS = {
  "HEAD": ["띵하고 어지러워요", "콕콕 쑤셔요", "무겁고 답답해요", "지끈거려요", "속이 울렁거려요"],
  "CHEST": ["숨이 차요", "가슴이 답답해요", "콕콕 찔러요", "두근거려요"],
  "STOMACH": ["속이 쓰려요", "더부룩해요", "쥐어짜는 듯해요", "가스가 찬 것 같아요"],
  "BACK": ["담 걸린 것 같아요", "허리가 뻐근해요", "전신이 쑤셔요", "똑바로 눕기 힘들어요"],
  "ARM_LEFT": ["왼팔이 저려요", "힘이 안 들어가요", "뻐근해요", "부어올랐어요"],
  "ARM_RIGHT": [
    "찌릿찌릿 전기가 와요",
    "욱신욱신 쑤셔요",
    "퉁퉁 붓고 뜨거워요",
    "힘이 없고 덜덜 떨려요"
  ],
  "LEG_LEFT": ["왼다리가 아파요", "쥐가 나요", "당기는 느낌이에요", "무릎이 시려요"],
  "LEG_RIGHT": ["오른다리가 아파요", "쥐가 나요", "당기는 느낌이에요", "무릎이 시려요"],
  "SHOULDER_LEFT": ["왼쪽 어깨가 결려요", "팔을 들기 힘들어요", "뭉친 것 같아요"],
  "SHOULDER_RIGHT": ["오른쪽 어깨가 결려요", "팔을 들기 힘들어요", "뭉친 것 같아요"],
  "NECK": ["목이 뻣뻣해요", "돌릴 때 아파요", "침 삼킬 때 아파요"]
};

// 2. 증상별 아이콘 매핑 (매핑되지 않은 경우 기본값 사용)
const SYMPTOM_ICONS = {
  "찌릿찌릿 전기가 와요": "⚡",
  "욱신욱신 쑤셔요": "💥",
  "퉁퉁 붓고 뜨거워요": "🔥",
  "힘이 없고 덜덜 떨려요": "🫨",
  "default": "🤕"
};

// 화면 표시용 한글 변환
const PART_KOREAN = {
  "HEAD": "머리", "CHEST": "가슴", "STOMACH": "배", "BACK": "등",
  "ARM_LEFT": "왼팔", "ARM_RIGHT": "오른팔", "LEG_LEFT": "왼다리", "LEG_RIGHT": "오른다리",
  "SHOULDER_LEFT": "왼쪽 어깨", "SHOULDER_RIGHT": "오른쪽 어깨", "NECK": "목"
};

const Container = styled.div`
  flex: 1; padding: 24px 20px; display: flex; flex-direction: column;
`;

const SymptomGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 40px;
`;

const PictogramButton = styled.button`
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 24px 16px; border-radius: 32px;
  background-color: ${props => props.$isSelected ? '#E0F2F1' : 'white'};
  border: 4px solid ${props => props.$isSelected ? '#00b894' : '#F1F3F5'};
  transition: all 0.2s; cursor: pointer;

  .icon {
    font-size: 48px;
    margin-bottom: 12px;
    transition: transform 0.2s;
  }

  span {
    font-size: 18px;
    font-weight: 800;
    word-break: keep-all;
    color: ${props => props.$isSelected ? '#00796B' : '#2D3436'};
  }

  /* 선택 시 시각적 피드백 강화 */
  &:active {
    transform: scale(0.98);
  }

  ${props => props.$isSelected && `
    .icon {
      transform: scale(1.2);
    }
  `}
`;

const Step3Detail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const currentPartCode = state?.bodyPart || "HEAD";
  const currentIntensity = state?.intensity || "3";
  const userId = localStorage.getItem('userId') || 1;

  const options = SYMPTOM_OPTIONS[currentPartCode] || SYMPTOM_OPTIONS["HEAD"];

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleNext = () => {
    const reportRequest = {
      userId: Number(userId),
      bodyPart: currentPartCode,
      intensity: String(currentIntensity),
      symptomIcon: selectedSymptoms.join(", "),
      forcedInstruction: "이상입니다."
    };

    console.log("🚀 전송 데이터 확인:", reportRequest);

    navigate('/loading', {
      state: { reportRequest: reportRequest }
    });
  };

  return (
    <Layout title="어떻게 아픈가요?" showBack={true}>
      <ProgressBar step={3} />
      <Container>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900' }}>
            {PART_KOREAN[currentPartCode]}(이)가 <br/>어떻게 아파요?
          </h2>
          <p style={{ fontSize: '18px', color: '#636E72', marginTop: '8px' }}>
            아래 그림 중에서 골라주세요.
          </p>
        </div>

        <SymptomGrid>
          {options.map((label, index) => {
            // SYMPTOM_ICONS에서 해당 라벨의 아이콘을 찾고 없으면 default 사용
            const icon = SYMPTOM_ICONS[label] || SYMPTOM_ICONS["default"];

            return (
              <PictogramButton
                key={index}
                $isSelected={selectedSymptoms.includes(label)}
                onClick={() => toggleSymptom(label)}
              >
                <div className="icon">{icon}</div>
                <span>{label}</span>
              </PictogramButton>
            );
          })}
        </SymptomGrid>

        <BottomButton
          disabled={selectedSymptoms.length === 0}
          onClick={handleNext}
        >
          진단 시작하기
        </BottomButton>
      </Container>
    </Layout>
  );
};

export default Step3Detail;