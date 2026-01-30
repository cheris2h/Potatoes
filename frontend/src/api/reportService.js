<<<<<<< HEAD
import axios from 'axios';
=======
// src/api/reportService.js
import { createReport as sendToBackend } from './reportApi'; // 1. 통신 함수 불러오기

export const IS_MOCKING = false; // 2. 실제 백엔드 연동을 위해 false로 변경
>>>>>>> 01db8b52f528de6ba16333ef894f0ac1a1a8c68a

// 1. 공통 설정
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // 백엔드 기본 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

<<<<<<< HEAD
// 2. 기능별 함수 정리
export const potatoApi = {
  // 회원가입/로그인 (UserController 연동)
  signUpUser: async (userData) => {
    try {
      const response = await api.post('/users/signup', userData);
      return response.data; // 성공 시 유저 ID 반환
    } catch (error) {
      console.error('회원가입 에러:', error);
      throw error;
    }
  },

  // 리포트 저장 및 AI 진단 (DiagnosisController 연동)
  sendReport: async (reportData) => {
    try {
      // 🔴 중요: 백엔드 컨트롤러 경로 /api/reports 와 일치해야 함
      const response = await api.post('/reports', reportData);
      console.log("서버 응답(객체):", response.data);
      return response.data; // {id, bodyPartKorean, intensity, aiDiagnosis...}
    } catch (error) {
      console.error('리포트 전송 에러:', error);
      throw error;
    }
  }
=======
// 1. 리포트 생성 (전송)
export const createReport = async (reportData) => {
  console.log("📤 데이터 전송 시도:", reportData);

  if (IS_MOCKING) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return 101;
  }

  // 3. 💡 핵심: 이제 가짜 ID를 주는 대신, 진짜 백엔드 API를 호출합니다!
  const responseData = await sendToBackend(reportData);
  return responseData.id; // 백엔드에서 생성된 진짜 Report ID를 반환
};

// 2. 리포트 상세 조회 (결과창)
export const getReportDetail = async (id) => {
  // 💡 상세 조회도 실제 백엔드 API 함수가 있다면 그걸 호출하도록 바꿔야 하지만,
  // 일단 생성(POST)부터 성공시키고 확인합시다!
  await new Promise(resolve => setTimeout(resolve, 800));
  return getMockReport(id);
>>>>>>> 01db8b52f528de6ba16333ef894f0ac1a1a8c68a
};