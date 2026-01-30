import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Layout from '../components/common/Layout';
import { BottomButton } from '../components/common/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/* ================= 애니메이션 ================= */
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ================= 스타일 ================= */

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transform: translateY(-40px);
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 70px;
`;

const Brand = styled.div`
  font-size: 42px;
  font-weight: 900;
  color: #2ed8b6;
  letter-spacing: -0.5px;

  opacity: 0;
  animation: ${fadeUp} 1.3s ease-out forwards;
`;

const Subtitle = styled.p`
  margin-top: 14px;
  font-size: 17px;
  color: #636e72;
  text-align: center;
  line-height: 1.6;

  opacity: 0;
  animation: ${fadeUp} 1.3s ease-out forwards;
  animation-delay: 0.7s;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;

  opacity: 0;
  animation: ${fadeUp} 1.3s ease-out forwards;
  animation-delay: 1.6s;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #dfe6e9;
  padding: 0 12px;
  font-size: 16px;
  margin-bottom: 14px;
`;

/* 🔥 DatePicker를 Input처럼 보이게 감싸는 래퍼 */
const DatePickerWrapper = styled.div`
  width: 100%;
  margin-bottom: 14px;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    height: 48px;
    border-radius: 12px;
    border: 1px solid #dfe6e9;
    padding: 0 12px;
    font-size: 16px;
  }
`;

/* ================= 컴포넌트 ================= */

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [birth, setBirth] = useState(null);

  return (
    <Layout title="회원가입" showBack={false}>
      <Container>
        <BrandSection>
          <Brand>아프닥</Brand>
          <Subtitle>
            누구나 쉽게, 차별 없이<br />
            건강을 확인하세요.
          </Subtitle>
        </BrandSection>

        <FormWrapper>
          <Input
            placeholder="이름 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* ✅ 오늘 / 삭제 없는 커스텀 날짜 입력 */}
          <DatePickerWrapper>
            <DatePicker
              selected={birth}
              onChange={(date) => setBirth(date)}
              placeholderText="생년월일 선택"
              dateFormat="yyyy-MM-dd"
              showPopperArrow={false}
              maxDate={new Date()}
            />
          </DatePickerWrapper>

          <BottomButton onClick={() => navigate('/SignUp2')}>
            다음 단계로
          </BottomButton>
        </FormWrapper>
      </Container>
    </Layout>
  );
};

export default SignUp;
