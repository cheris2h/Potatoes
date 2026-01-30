import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import ProgressBar from '../components/common/ProgressBar';
import { BottomButton } from '../components/common/Button';

// 부위별 증상 가짜 데이터 (백엔드 전송 및 화면 표시용)
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

  /* 픽토그램 이미지 대신 임시로 이모지나 아이콘을 크게 쓸 수도 있습니다 */
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
  const { state } = useLocation(); // step1(part), step2(level) 데이터
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
    // 1. 백엔드 BodyPart Enum 명칭으로 변환 (백엔드 도메인과 일치)
    const partMapping = {
      "머리": "HEAD",
      "가슴/배": "CHEST",
      "팔": "ARM",
      "다리": "LEG",
      "몸체": "BODY"
    };

    // 2. 백엔드 ReportRequest 형식에 맞게 데이터 포장
    const reportRequest = {
      // 로그인 시 저장된 ID를 사용하거나 없으면 테스트용 1번 사용
      userId: Number(localStorage.getItem('userId')) || 1,
      bodyPart: partMapping[currentPart] || "BODY",
      intensity: `${state?.level || 3}단계`,
      symptomIcon: selectedSymptoms.join(", ") // 선택한 모든 증상을 텍스트로 합쳐서 전달
    };

    // 3. 로딩 페이지로 이동하면서 백엔드에 보낼 '데이터'를 통째로 넘겨줌
    navigate('/loading', {
      state: {
        reportRequest: reportRequest,
        originalData: state // 이전 단계 데이터 백업
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
              {/* 이미지 경로가 아직 없다면 임시 아이콘 사용 */}
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