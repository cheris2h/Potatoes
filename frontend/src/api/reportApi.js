import axios from 'axios';

// 💡 true면 가짜 데이터(Mock), false면 실제 백엔드 연동
const IS_MOCKING = false;

// 실제 백엔드 서버 주소 (팀원 IP 확인 후 수정)
const BASE_URL = 'http://localhost:8080/api';
export const createReport = async (reportData) => {
  if (IS_MOCKING) {
    /**
     * [MOCK MODE]
     * 서버가 없어도 프론트 단독으로 테스트할 수 있게 가짜 데이터를 반환합니다.
     */
    console.log("⚠️ 현재 Mocking 모드입니다. 가짜 데이터를 반환합니다.");

    // 서버 통신 느낌을 주기 위한 1.5초 대기
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 백엔드 ReportResponse DTO 구조와 동일하게 설정
    return {
      id: 999,
      bodyPartKorean: getKoreanName(reportData.bodyPart), // Enum 명칭을 한글로 변환
      intensity: reportData.intensity, // "1" ~ "5"
      aiDiagnosis: "AI 분석 결과, 목 주변 근육의 긴장도가 높아진 상태입니다. \n\n[권고 사항]\n1. 1시간마다 목 스트레칭을 해주세요.\n2. 따뜻한 수건으로 찜질을 하면 도움이 됩니다.\n3. 통증이 계속되면 정형외과 방문을 추천드립니다.",
      createdAt: new Date().toISOString()
    };
  }

  /**
   * [REAL MODE]
   * 실제 백엔드 API와 통신합니다.
   */
  try {
    const response = await axios.post(`${BASE_URL}/reports`, reportData);
    return response.data; // 백엔드에서 ReportResponse가 돌아옴
  } catch (error) {
    console.error("API 전송 에러:", error);
    throw error;
  }
};

/**
 * 헬퍼 함수: 백엔드 Enum 명칭(HEAD, STOMACH 등)을
 * 프론트 테스트용 한글 명칭으로 바꿔줍니다.
 */
const getKoreanName = (part) => {
  const mapping = {
    HEAD: "머리",
    CHEST: "가슴",
    STOMACH: "배",
    BACK: "등",
    ARM_LEFT: "왼팔",
    ARM_RIGHT: "오른팔",
    LEG_LEFT: "왼다리",
    LEG_RIGHT: "오른다리",
    SHOULDER: "어깨",
    NECK: "목"
  };
  return mapping[part] || "전신";
};