import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import ProgressBar from '../components/common/ProgressBar';
import { BottomButton } from '../components/common/Button';

// 부위별 증상 가짜 데이터
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
  padding: 14px 22px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  word-break: keep-all;

  /* 선택 여부에 따른 스타일 분기 */
  background-color: ${props => props.$isSelected ? '#4DB6AC' : 'white'};
  color: ${props => props.$isSelected ? 'white' : '#495057'};
  border: 2px solid ${props => props.$isSelected ? '#4DB6AC' : '#EDF2F7'};
  box-shadow: ${props => props.$isSelected ? '0 8px 16px rgba(77,182,172,0.15)' : 'none'};

  &:active { transform: scale(0.96); }
`;

const SymptomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2열로 크게 배치 */
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

  img {
    width: 80px;  /* 픽토그램을 크게 보여줌 */
    height: 80px;
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
    // 모든 데이터를 합쳐서 Loading 페이지로 이동
    navigate('/loading', {
      state: {
        ...state,
        symptoms: selectedSymptoms
      }
    });
  };

  return (
      <Layout title="어떻게 아픈가요?" showBack={true}>
        <ProgressBar step={3} />
        <Container>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '900' }}>어떻게 아파요?</h2>
            <p style={{ fontSize: '18px', color: '#636E72' }}>그림을 보고 골라보세요.</p>
          </div>

          <SymptomGrid>
            {options.map((item) => (
              <PictogramButton
                key={item.id}
                $isSelected={selectedSymptoms.includes(item.label)}
                onClick={() => toggleSymptom(item.label)}
              >
                <img src={item.img} alt={item.label} />
                <span>{item.label}</span>
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