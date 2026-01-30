import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Layout from '../components/common/Layout';
import { createReport } from '../api/reportApi';

// --- 애니메이션 정의 ---
const doctorAnimation = keyframes`
  0%, 100% { background-image: url('/assets/loading/doctor_loading_1.png'); }
  33% { background-image: url('/assets/loading/doctor_loading_2.png'); }
  66% { background-image: url('/assets/loading/doctor_loading_3.png'); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// --- 스타일 컴포넌트 ---
const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
`;

const DoctorImage = styled.div`
  width: 250px;
  height: 250px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  animation: ${doctorAnimation} 1.5s infinite steps(1);
  margin-bottom: -40px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #4DB6AC;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

const LoadingText = styled.h2`
  font-weight: 800;
  font-size: 22px;
  color: #2d3436;
  text-align: center;
`;

const Loading = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const hasRequested = useRef(false); // StrictMode로 인한 중복 요청 방지

  useEffect(() => {
    const processDiagnosis = async () => {
      // 이미 요청을 보냈다면 중단 (중복 인서트 방지)
      if (hasRequested.current) return;
      hasRequested.current = true;

      try {
        console.log("1. 서버로 보내는 데이터:", state?.reportRequest);

        // API 호출 (백엔드에서 리포트 객체 또는 ID를 리턴함)
        const responseData = await createReport(state?.reportRequest);

        console.log("2. 서버에서 받은 응답:", responseData);

        if (!responseData) {
          throw new Error("서버 응답 데이터가 없습니다.");
        }

        /**
         * 💡 중요 로직
         * 백엔드가 ID(숫자)만 주는지, 객체 전체를 주는지에 따라
         * Result 페이지에서 다르게 처리할 수 있도록 그대로 넘겨줍니다.
         */
        navigate('/result', {
          state: {
            result: responseData, // 데이터 전체
            reportId: typeof responseData === 'number' ? responseData : responseData.id
          },
          replace: true // 뒤로가기로 로딩창 다시 진입 방지
        });

      } catch (error) {
        console.error("분석 오류 상세:", error);
        alert("분석 중 오류가 발생했습니다. 다시 시도해 주세요.");
        navigate('/step3');
      }
    };

    if (state?.reportRequest) {
      processDiagnosis();
    } else {
      console.warn("전송할 데이터(reportRequest)가 없어 Step3로 되돌아갑니다.");
      navigate('/step3');
    }
  }, [state, navigate]);

  return (
    <Layout showBack={false}>
      <LoadingContainer>
        <DoctorImage />
        <Spinner />
        <LoadingText>AI 소견서를 작성하고 있어요</LoadingText>
        <p style={{ color: '#636e72', marginTop: '10px' }}>잠시만 기다려주세요!</p>
      </LoadingContainer>
    </Layout>
  );
};

export default Loading;