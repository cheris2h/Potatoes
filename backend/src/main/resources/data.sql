-- users 테이블에 데이터 넣기
INSERT INTO users (device_id, name, birth, gender, emergency_contact)
VALUES ('test_device_001', '홍길동 어르신', '1955-05-05', 'MALE', '010-1234-5678');

-- reports 테이블에 데이터 넣기
INSERT INTO reports (user_id, body_part, symptom_icon, intensity, ai_diagnosis, created_at)
VALUES (1, 'ARM_LEFT', 'knee_icon', '6', '따뜻한 찜질을 권장합니다.', CURRENT_TIMESTAMP);