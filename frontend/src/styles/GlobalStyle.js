import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Pretendard', -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* 모바일에서 클릭 시 생기는 파란 하이라이트 제거 */
  * {
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
  }
`;