import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

// 페이지 컴포넌트 임포트
import Home from './pages/Home'; // <-- Home 컴포넌트 추가
import SignUp from './pages/SignUp';
import SignUp2 from './pages/SignUp2';
import MyPage from './pages/MyPage';
import Step1Body from './pages/Step1Body';
import Step2Level from './pages/Step2Level';
import Step3Detail from './pages/Step3Detail';
import Loading from './pages/Loading';
import Result from './pages/Result';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 1. 앱 실행 시 가장 먼저 보여줄 홈 화면 */}
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup2" element={<SignUp2 />} />
          <Route path="/mypage" element={<MyPage />} />

          {/* 2. 진료 시작 버튼 클릭 시 이동할 페이지 */}
          <Route path="/step1" element={<Step1Body />} />
          <Route path="/step2" element={<Step2Level />} />
          <Route path="/step3" element={<Step3Detail />} />

          {/* 데이터 전송 및 결과 페이지 */}
          <Route path="/loading" element={<Loading />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;