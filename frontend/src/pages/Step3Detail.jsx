import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import ProgressBar from '../components/common/ProgressBar';
import { BottomButton } from '../components/common/Button';

// 부위별 가짜 데이터 (Mock Data)
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

const QuestionText = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: #2D3436;
  line-height: 1.4;
  margin-bottom: 8px;
`;

const SubText = styled.p`
  color: #636E72;
  font-size: 16px;
  margin-bottom: 32px;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
`;

const SymptomChip = styled.button`
  padding: 16px 24px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;

  /* 선택 상태에 따른 스타일 */
  background-color: ${props => props.$isSelected ? '#4DB6AC' : 'white'};
  color: ${props => props.$isSelected ? 'white' : '#495057'};
  border: 2px solid ${props => props.$isSelected ? '#4DB6AC' : '#EDF2F7'};
  box-shadow: ${props => props.$isSelected ? '0 8px 16px rgba(77,182,172,0.2)' : '0 2px 4px rgba(0,0,0,0.02)'};

  &:active {
    transform: scale(0.95);
  }
`;

const Step3Detail = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // { part: "머리", level: 3 }
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  // 이전 단계 데이터가 없을 경우를 대비한 방어 코드
  const currentPart = state?.part || "몸체";
  const options = SYMPTOM_OPTIONS[currentPart] || SYMPTOM_OPTIONS["몸체"];

  // 칩 클릭 핸들러 (중복 선택 가능)
  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleNext = () => {
    // 최종 데이터를 가지고 로딩 화면으로 이동
    navigate('/loading', {
      state: {
        ...state,
        symptoms: selectedSymptoms
      }
    });
  };

  return (
    <Layout title="상세 증상" showBack={true}>
      <ProgressBar step={3} />

      <Container>
        <QuestionText>
          {currentPart} 부위가<br />어떻게 아프신가요?
        </QuestionText>
        <SubText>가장 비슷한 증상을 모두 골라주세요.</SubText>

        <ChipContainer>
          {options.map((symptom, index) => (
            <SymptomChip
              key={index}
              $isSelected={selectedSymptoms.includes(symptom)}
              onClick={() => toggleSymptom(symptom)}
            >
              {symptom}
            </SymptomChip>
          ))}
        </ChipContainer>

        <BottomButton
          disabled={selectedSymptoms.length === 0}
          onClick={handleNext}
        >
          {selectedSymptoms.length > 0
            ? `${selectedSymptoms.length}개 선택함 · 진단 시작`
            : "증상을 선택해주세요"}
        </BottomButton>
      </Container>
    </Layout>
  );
};

export default Step3Detail;