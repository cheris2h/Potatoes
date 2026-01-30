import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import ProgressBar from '../components/common/ProgressBar';
import { BottomButton } from '../components/common/Button';

// 부위별 증상 데이터
const SYMPTOM_OPTIONS = {
  "머리": ["띵하고 어지러워요", "콕콕 쑤셔요", "무겁고 답답해요", "지끈거려요", "속이 울렁거려요"],
  "가슴/배": ["속이 쓰려요", "콕콕 찔러요", "더부룩해요", "쥐어짜는 듯해요", "가스가 찬 것 같아요"],
  "팔": ["저릿저릿해요", "힘이 안 들어가요", "뻐근해요", "부어올랐어요", "근육이 떨려요"],
  "다리": ["걸을 때 아파요", "쥐가 나요", "당기는 느낌이에요", "무릎이 시려요", "발목이 시큰해요"],
  "몸체": ["담 걸린 것 같아요", "피부가 따가워요", "전신이 쑤셔요", "열이 나는 것 같아요"]
};

const Container = styled.div`
  flex: 1;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
`;

const SymptomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 40px;
`;

const PictogramButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  border-radius: 32px;
  background-color: ${props => props.$isSelected ? '#E0F2F1' : 'white'};
  border: 4px solid ${props => props.$isSelected ? '#4DB6AC' : '#F1F3F5'};
  transition: all 0.2s;
  cursor: pointer;

  .icon {
    font-size: 48px;
    margin-bottom: 12px;
  }

  span {
    font-size: 18px;
    font-weight: 800;
    word-break: keep-all;
    color: ${props => props.$isSelected ? '#00796B' : '#2D3436'};
  }
`;

const Step3Detail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  // Step1에서 넘어온 한글 부위명 (예: "몸체")
  const currentPart = state?.part || "몸체";
  const options = SYMPTOM_OPTIONS[currentPart] || SYMPTOM_OPTIONS["몸체"];

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleNext = () => {
    /**
     * ⚠️ [핵심 수정] 백엔드 Enum 매핑
     * 백엔드 로그 확인 결과: [HEAD, CHEST, BACK, LEG_LEFT, ARM_RIGHT, ARM_LEFT, LEG_RIGHT, NECK, SHOULDER, STOMACH] 만 허용됨
     */
    const partMapping = {
      "머리": "HEAD",
      "가슴/배": "STOMACH",
      "팔": "ARM_LEFT",
      "다리": "LEG_LEFT",
      "몸체": "BACK"        // "BODY" 대신 백엔드가 이해하는 "BACK"으로 전송
    };

    const reportRequest = {
      userId: 1,
      bodyPart: partMapping[currentPart] || "BACK",
      intensity: String(state?.level || "3"),
      symptomIcon: selectedSymptoms.join(", ")
    };

    console.log("전송 데이터 확인:", reportRequest);

    navigate('/loading', {
      state: {
        reportRequest: reportRequest
      }
    });
  };

  return (
    <Layout title="어떻게 아픈가요?" showBack={true}>
      <ProgressBar step={3} />
      <Container>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900' }}>어떻게 아파요?</h2>
          <p style={{ fontSize: '18px', color: '#636E72' }}>증상을 골라주세요. (여러 개 가능)</p>
        </div>

        <SymptomGrid>
          {options.map((label, index) => (
            <PictogramButton
              key={index}
              $isSelected={selectedSymptoms.includes(label)}
              onClick={() => toggleSymptom(label)}
            >
              <div className="icon">🤕</div>
              <span>{label}</span>
            </PictogramButton>
          ))}
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