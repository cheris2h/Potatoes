import axios from 'axios';

// 해커톤 꿀팁: true면 가짜 데이터 사용, false면 실제 백엔드 연결
const IS_MOCKING = true;

export const createReport = async (reportData) => {
  if (IS_MOCKING) {
    // 서버 요청 없이 1초 기다렸다가 가짜 데이터 반환 (백엔드 응답 DTO와 똑같은 형식)
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      id: 999,
      bodyPartKorean: reportData.bodyPart === "HEAD" ? "머리" : "어깨",
      intensity: reportData.intensity,
      aiDiagnosis: "AI 분석 결과: 거북목으로 인한 긴장성 두통이 의심됩니다. 스트레칭이 필요합니다.",
      createdAt: new Date().toISOString()
    };
  }

  // 실제 백엔드 연결 (서버 켜져 있을 때만 작동)
  const response = await axios.post('http://팀원IP주소:8080/api/reports', reportData);
  return response.data;
};