import axios from 'axios';

const api = axios.create({
    // .env의 VITE_API_URL을 가져오되, 없으면 로컬 8080을 기본으로 합니다.
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * 2. 진단 리포트 생성 함수
 * @param {Object} reportData - { userId, bodyPart, intensity, symptomIcon }
 */
export const createReport = async (reportData) => {
    try {
        const response = await api.post('/api/reports', reportData);

        // 성공 시 팀장님이 추출한 { clinicalImpression, weight, ... } 반환
        return response.data;
    } catch (error) {
        console.error("데이터 전송 실패:", error.response?.data || error.message);
        throw error;
    }
};

export default api;