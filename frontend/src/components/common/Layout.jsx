import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// --- 스타일 컴포넌트 (디자인) ---

const OuterWrapper = styled.div`
  background-color: #e9ecef;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const MobileContainer = styled.div`
  width: 100%;
  max-width: 430px;
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background-color: white;
  border-bottom: 1px solid #f1f3f5;
  height: 60px;
`;

const BackButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  &:hover { background-color: #f8f9fa; }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 40px 20px;
`;

// $width 처럼 $를 붙이는 이유는 styled-components 전용 속성임을 명시하기 위함입니다.
const StyledInput = styled.input`
  width: ${(props) => props.$width}px;
  min-width: 30px;
  font-size: 32px;
  font-weight: 700;
  border: none;
  border-bottom: 2px solid #339af0;
  text-align: center;
  outline: none;
  color: #212529;
  background: transparent;
  &::placeholder { color: #adb5bd; }
`;

const AdditionalText = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #495057;
`;

const InputMirror = styled.div`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  font-size: 32px;
  font-weight: 700;
`;

// --- 컴포넌트 실체 ---

// 너비가 늘어나는 입력창 컴포넌트
export const AdjustInput = ({ value, placeholder, additionalText, onChange }) => {
  const [width, setWidth] = useState(0);
  const mirrorRef = useRef(null);

  useEffect(() => {
    if (mirrorRef.current) {
      // 글자 길이에 맞춰서 너비 계산
      setWidth(mirrorRef.current.offsetWidth + 10);
    }
  }, [value, placeholder]);

  return (
    <InputContainer>
      <StyledInput
        $width={width}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <AdditionalText>{additionalText}</AdditionalText>
      <InputMirror ref={mirrorRef} aria-hidden>
        {value || placeholder}
      </InputMirror>
    </InputContainer>
  );
};

// 전체 레이아웃 컴포넌트
const Layout = ({ children, showBack = true, title = "" }) => {
  const navigate = useNavigate();

  return (
    <OuterWrapper>
      <MobileContainer>
        <Header>
          <div style={{ width: 40 }}>
            {showBack && (
              <BackButton onClick={() => navigate(-1)}>
                <svg width="24" height="24" fill="none" stroke="#2D3436" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </BackButton>
            )}
          </div>
          <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>{title}</h1>
          <div style={{ width: 40 }}></div>
        </Header>
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
      </MobileContainer>
    </OuterWrapper>
  );
};

export default Layout;