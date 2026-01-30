import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
});

export const potatoApi = {
    // 유저 등록/로그인 (deviceId는 로컬스토리지 등에서 관리)
    login: async (userData) => {
        const response = await api.post('/api/login', userData);
        return response.data; // 여기서 반환되는 user.id를 저장해둬야 함
    },

    // 리포트 전송 (AI 진단 포함)
    sendReport: async (reportData) => {
        const response = await api.post('/api/report', reportData);
        return response.data; // 생성된 reportId 반환
    }
};