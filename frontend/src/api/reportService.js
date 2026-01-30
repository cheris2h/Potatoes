// src/api/reportService.js
import { createReport as sendToBackend } from './reportApi'; // 1. 통신 함수 불러오기

export const IS_MOCKING = false; // 2. 실제 백엔드 연동을 위해 false로 변경

/**
 * [가짜 데이터 생성 함수]
 * 백엔드 ReportResponse DTO 구조와 100% 일치시켰습니다.
 */
const getMockReport = (id, part = "머리", level = "3단계") => ({
  id: id || 999,
  bodyPartKorean: part,
  intensity: level,
  aiDiagnosis: `어르신, 선택하신 ${part} 부위의 통증은 무리한 활동으로 인한 일시적인 현상일 수 있습니다. \n\n[AI 권고 사항]\n1. 무거운 물건은 들지 마세요.\n2. 따뜻한 물로 해당 부위를 찜질해주세요.\n3. 충분한 수면이 가장 좋은 약입니다.`,
  createdAt: new Date().toISOString()
});

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
};