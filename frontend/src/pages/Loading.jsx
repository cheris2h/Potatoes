import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Layout from '../components/common/Layout';
import { createReport } from '../api/reportApi';

// 1. 의사 애니메이션
const doctorAnimation = keyframes`
  0%, 100% { background-image: url('/assets/loading/doctor_loading_1.png'); }
  33% { background-image: url('/assets/loading/doctor_loading_2.png'); }
  66% { background-image: url('/assets/loading/doctor_loading_3.png'); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff; /* 여기서 배경색을 흰색으로 변경했습니다 */
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

  useEffect(() => {
    const processDiagnosis = async () => {
      try {
        const responseData = await createReport(state?.reportRequest);
        navigate('/result', { state: { result: responseData } });
      } catch (error) {
        console.error("분석 오류:", error);
        alert("분석 중 오류가 발생했습니다.");
        navigate('/step3');
      }
    };

    if (state?.reportRequest) {
      processDiagnosis();
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