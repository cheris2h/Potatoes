import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Layout from '../components/common/Layout';
import { BottomButton } from '../components/common/Button';
import DatePicker, { registerLocale } from 'react-datepicker'; // registerLocale 추가
import ko from 'date-fns/locale/ko'; // 한국어 데이터 가져오기
import 'react-datepicker/dist/react-datepicker.css';

// 달력을 한국어로 설정
registerLocale('ko', ko);

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 20px; transform: translateY(-40px);
`;

const BrandSection = styled.div`
  display: flex; flex-direction: column; align-items: center; margin-bottom: 70px;
`;

const Brand = styled.div`
  font-size: 42px; font-weight: 900; color: #2ed8b6; letter-spacing: -0.5px;
  opacity: 0; animation: ${fadeUp} 1.3s ease-out forwards;
`;

const Subtitle = styled.p`
  margin-top: 14px; font-size: 17px; color: #636e72; text-align: center; line-height: 1.6;
  opacity: 0; animation: ${fadeUp} 1.3s ease-out forwards; animation-delay: 0.7s;
`;

const FormWrapper = styled.div`
  width: 100%; max-width: 360px; display: flex; flex-direction: column; align-items: center;
  opacity: 0; animation: ${fadeUp} 1.3s ease-out forwards; animation-delay: 1.6s;
`;

const Input = styled.input`
  width: 100%; height: 48px; border-radius: 12px; border: 1px solid #dfe6e9;
  padding: 0 12px; font-size: 16px; margin-bottom: 14px;
`;

const DatePickerWrapper = styled.div`
  width: 100%; margin-bottom: 14px;
  .react-datepicker-wrapper { width: 100%; }
  .react-datepicker__input-container input {
    width: 100%; height: 48px; border-radius: 12px; border: 1px solid #dfe6e9;
    padding: 0 12px; font-size: 16px;
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [birth, setBirth] = useState(null);

  // 2003년 1월 1일 기본 위치값
  const defaultDate = new Date(2003, 0, 1);

  const handleNext = () => {
    if (!name || !birth) {
      alert("이름과 생년월일을 입력해주세요.");
      return;
    }

    const formattedBirth = birth.toISOString().split('T')[0];

    navigate('/SignUp2', {
      state: { name, birth: formattedBirth }
    });
  };

  return (
    <Layout title="회원가입" showBack={false}>
      <Container>
        <BrandSection>
          <Brand>아프닥</Brand>
          <Subtitle>누구나 쉽게, 차별 없이<br />건강을 확인하세요.</Subtitle>
        </BrandSection>

        <FormWrapper>
          <Input
            placeholder="이름 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <DatePickerWrapper>
            <DatePicker
              locale="ko" // 이 부분이 핵심입니다! 한국어로 변경
              selected={birth}
              onChange={(date) => setBirth(date)}
              placeholderText="생년월일 선택"
              dateFormat="yyyy년 MM월 dd일" // 보여지는 형식도 한국식으로 수정
              showPopperArrow={false}
              maxDate={new Date()}
              openToDate={defaultDate}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
            />
          </DatePickerWrapper>

          <BottomButton onClick={handleNext}>다음 단계로</BottomButton>
        </FormWrapper>
      </Container>
    </Layout>
  );
};

export default SignUp;