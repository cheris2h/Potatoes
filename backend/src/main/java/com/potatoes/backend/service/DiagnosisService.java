package com.potatoes.backend.service;

import com.potatoes.backend.domain.Report;
import com.potatoes.backend.domain.User;
import com.potatoes.backend.dto.request.ReportRequest;
import com.potatoes.backend.repository.ReportRepository;
import com.potatoes.backend.repository.UserRepository;
import com.google.genai.Client; // 구글 공식 라이브러리
import com.google.genai.types.GenerateContentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DiagnosisService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    @Value("${google.genai.api-key}")
    private String apiKey;

    @Value("${google.genai.model}")
    private String model;

    @Transactional
    public Report saveReport(ReportRequest reportRequest) {
        User user = userRepository.findById(reportRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다. ID: " + reportRequest.getUserId()));

        String aiAnswer = callAi(reportRequest);

        int weight = extractWeight(aiAnswer);

        Report report = Report.builder()
                .user(user)
                .bodyPart(reportRequest.getBodyPart())
                .symptomIcon(reportRequest.getSymptomIcon())
                .intensity(reportRequest.getIntensity())
                .aiDiagnosis(aiAnswer)
                .weight(weight)
                .build();

        return reportRepository.save(report);
    }

    private String callAi(ReportRequest reportRequest) {
        try {
            Client client = Client.builder().apiKey(apiKey).build();

            String prompt = String.format(
                    "너는 노인 건강 전문의야. 아래 환자의 상태를 분석해서 어르신께 드리는 따뜻한 조언 3줄을 써줘.\n" +
                            "부위: %s, 강도: %s, 증상: %s\n\n" +
                            "--- 응답 규칙 (매우 중요) ---\n" +
                            "1. 조언을 모두 작성한 뒤 반드시 '이상입니다.'라는 문구로 끝낼 것.\n" +
                            "2. 그 바로 뒤에 위험도 점수(0~100 사이의 숫자)만 딱 하나 적을 것.\n" +
                            "예시: ~보셔요. 이상입니다. 75",
                    reportRequest.getBodyPart().getKoreanName(),
                    reportRequest.getIntensity(),
                    reportRequest.getSymptomIcon()
            );

            GenerateContentResponse response = client.models.generateContent(model, prompt, null);
            return response.text();

        } catch (Exception e) {
            return "어르신, 지금 시스템에 잠시 문제가 생겼어요. 곧 다시 도와드릴게요.";
        }
    }

    private int extractWeight(String aiResponse) {
        try {
            String numbers = aiResponse.replaceAll("[^0-9]", " "); // 숫자가 아니면 공백으로 바꿈
            String[] tokenized = numbers.trim().split("\\s+"); // 공백 기준으로 쪼갬

            if (tokenized.length > 0) {
                String lastNumber = tokenized[tokenized.length - 1];
                int weight = Integer.parseInt(lastNumber);

                return Math.min(Math.max(weight, 0), 100);
            }
        } catch (Exception e) {
            return 50;
        }
        return 50;
    }

    public List<Report> getReportsByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));
        return reportRepository.findByUserOrderByIdDesc(user);
    }
}