package com.potatoes.backend.domain;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Table(name = "reports")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 다 대 일 관계 + 리포트 목록만 확인 시켜주고 필요할때만 유저 정보를 가져옴(성능 최적화)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private BodyPart bodyPart;

    // 픽토그램
    private String symptomIcon;

    // 강도
    private String intensity;

    // 글이 길어질 수도 있으므로 VARCHAR가 아닌 TEXT로 선언
    @Column(columnDefinition = "TEXT")
    private String aiDiagnosis;

    @Column(updatable = false) // 생성 시간은 수정 불가능
    private LocalDateTime createdAt;

    @Builder
    public Report(User user, BodyPart bodyPart, String symptomIcon, String intensity, String aiDiagnosis) {
        this.user = user;
        this.bodyPart = bodyPart;
        this.symptomIcon = symptomIcon;
        this.intensity = intensity;
        this.aiDiagnosis = aiDiagnosis;
        this.createdAt = LocalDateTime.now(); // 생성 시점 자동 기록
    }
}
