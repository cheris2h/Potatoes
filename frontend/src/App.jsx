import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import Loading from './pages/Loading';


// 페이지 컴포넌트들 임포트
import Step1Body from './pages/Step1Body';
import Step2Level from './pages/Step2Level';
import Step3Detail from './pages/Step3Detail';
// Loading이나 Result 페이지도 만들면 아래처럼 추가하세요.
// import Loading from './pages/Loading';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 기본 경로를 Step1으로 설정하거나 Home을 따로 만드세요 */}
          <Route path="/" element={<Step1Body />} />
          <Route path="/step1" element={<Step1Body />} />
          <Route path="/step2" element={<Step2Level />} />
          <Route path="/step3" element={<Step3Detail />} />
          {/* <Route path="/loading" element={<Loading />} /> */}
       <Route path="/loading" element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;