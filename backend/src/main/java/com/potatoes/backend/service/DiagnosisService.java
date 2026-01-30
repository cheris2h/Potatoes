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
                    "아래 환자의 상태를 분석해서 의사나 간호사 분들이 보고 현재 환자의 상태를 잘 알수 있도록 자세하게 설명해줘\n" +
                            "전문 용어 같은거 들어가도 상관없으니까 최대한 환자의 상태를 잘 설명할 수 있도록 설명하면돼\n" +
                            "추가로 진단이 모두 끝나면 너가 한 진단과 환자의 상태를 고려해서 0~100점까지 위험 점수를 무조건 꼭! 매겨줘" +
                            "부위: %s, 강도: %s, 증상: %s\n\n",
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