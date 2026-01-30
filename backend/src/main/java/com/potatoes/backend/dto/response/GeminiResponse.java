package com.potatoes.backend.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

/// {
///   "candidates": [        // 1. 후보군 리스트 (보통 1개)
///     {
///       "content": {       // 2. 그중 채택된 내용
///         "parts": [       // 3. 내용 안의 파트들 (글자, 이미지 등)
///           {
///             "text": "AI 분석 결과입니다..." // 4. 최종 결과(텍스트)
///           }
///         ]
///       }
///     }
///   ]
/// }

@Getter
@NoArgsConstructor
public class GeminiResponse {
    private List<Candidate> candidates;

    @Getter
    @NoArgsConstructor
    public static class Candidate {
        private Content content;
    }

    @Getter
    @NoArgsConstructor
    public static class Content {
        private List<Part> parts;
    }

    @Getter
    @NoArgsConstructor
    public static class Part {
        private String text;
    }

    public String getFirstText() {
        if (candidates != null && !candidates.isEmpty() &&
                candidates.get(0).getContent() != null &&
                !candidates.get(0).getContent().getParts().isEmpty()) {
            return candidates.get(0).getContent().getParts().get(0).getText();
        }
        return "분석 내용을 생성할 수 없습니다.";
    }
}