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
    public ResponseEntity<Long> saveReport(@RequestBody ReportRequest requestDto) {
        // 서비스 코드가 변경되었으므로, 이제 requestDto를 통째로 넘겨줍니다.
        // 서비스 내부에서 AI 호출(callAi)까지 한 번에 처리됩니다.
        Long reportId = diagnosisService.saveReport(requestDto);

        return ResponseEntity.ok(reportId);
    }

    /**
     * [전체 진단 기록 조회 API]
     */
    @GetMapping
    public ResponseEntity<List<Report>> getAllReports() {
        List<Report> reports = diagnosisService.getAllReports();
        return ResponseEntity.ok(reports);
    }
}