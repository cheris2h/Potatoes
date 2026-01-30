import axios from 'axios';

// 1. 공통 설정
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // 백엔드 기본 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

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
};