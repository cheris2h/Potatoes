import axios from 'axios';

// 💡 발표 직전 반드시 false 확인!
export const IS_MOCKING = false;

// 1. 주소 설정: 본인 컴퓨터에서 백엔드를 켜두었다면 'localhost'가 가장 정확합니다.
const BASE_URL = 'http://localhost:8080/api';

export const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * [리포트 생성 API]
 * Loading.js에서 이 함수를 호출합니다.
 */
export const createReport = async (reportData) => {
    if (IS_MOCKING) {
        console.log("⚠️ Mock 모드: 가짜 데이터를 반환합니다.");
        await new Promise(resolve => setTimeout(resolve, 1500));
        return {
            id: 999,
            bodyPartKorean: "허리",
            intensity: "3",
            aiDiagnosis: "가짜 데이터입니다. IS_MOCKING을 false로 바꾸세요."
        };
    }

    try {
        // 🔴 백엔드 DiagnosisController의 @RequestMapping("/api/reports")와 일치시킴
        const response = await client.post('/reports', reportData);
        console.log("서버 응답 데이터:", response.data);
        return response.data;
    } catch (error) {
        console.error("API 전송 에러:", error);
        throw error;
    }
};

console.log(`[API] ${IS_MOCKING ? "MOCK" : "REAL"} 모드 실행 중:`, BASE_URL);