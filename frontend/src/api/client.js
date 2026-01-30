import axios from 'axios';

// 💡 true면 가짜 데이터(Mock), false면 실제 백엔드 연동
// 해커톤 발표 직전에 이것만 false로 바꾸면 됩니다!
export const IS_MOCKING = true;

// .env에 설정이 있으면 그걸 쓰고, 없으면 팀원 IP 주소를 씁니다.
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://192.168.0.XX:8080/api';

export const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log(`[API] ${IS_MOCKING ? "MOCK" : "REAL"} 모드 실행 중:`, BASE_URL);