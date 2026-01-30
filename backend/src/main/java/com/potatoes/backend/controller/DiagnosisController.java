package com.potatoes.backend.controller;

import com.potatoes.backend.domain.Report;
import com.potatoes.backend.dto.request.ReportRequest;
import com.potatoes.backend.service.DiagnosisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class DiagnosisController {

    private final DiagnosisService diagnosisService;

    /**
     * [진단서 저장 및 AI 분석 API]
     * 프론트엔드에서 보낸 데이터를 서비스로 전달하여 저장하고 AI 분석 결과를 생성합니다.
     */
    @PostMapping
    public ResponseEntity<Long> saveReport(@RequestBody ReportRequest reportRequest) {
        Long reportId = diagnosisService.saveReport(reportRequest);

        return ResponseEntity.ok(reportId);
    }

    @GetMapping
    public ResponseEntity<List<Report>> getReportsByUserId(@RequestParam Long userId) {
        List<Report> reports = diagnosisService.getReportsByUserId(userId);
        return ResponseEntity.ok(reports);
    }
}