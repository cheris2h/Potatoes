package com.potatoes.backend.service;

import com.potatoes.backend.domain.Report;
import com.potatoes.backend.domain.BodyPart;
import com.potatoes.backend.domain.User;
import com.potatoes.backend.repository.ReportRepository;
import com.potatoes.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DiagnosisService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long saveReport(Long userId, BodyPart bodyPart, String symptomIcon, String intensity, String aiDiagnosis) {
        // 유저 존재 여부 확인 (안정성 확보)
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다. ID: " + userId));

        // 서비스 내부에서 직접 리포트 생성
        Report report = Report.builder()
                .user(user)
                .bodyPart(bodyPart)
                .symptomIcon(symptomIcon)
                .intensity(intensity)
                .aiDiagnosis(aiDiagnosis)
                .build();

        return reportRepository.save(report).getId();
    }

    @Transactional
    public void updateAiDiagnosis(Long reportId, String summary) {
        // 1. 리포트 찾기
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new IllegalArgumentException("해당 기록이 없습니다."));

        // 2. 값 업데이트 (이곳에 들어가는 인자가 하나여야 합니다!)
        report.updateAiDiagnosis(summary);
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }
}