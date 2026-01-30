import styled from 'styled-components';

export const BottomButton = styled.button`
  width: 100%;
  height: 58px; /* 높이를 고정하면 더 깔끔합니다 */
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  transition: all 0.2s;
  background-color: ${props => props.disabled ? '#DFE6E9' : '#4DB6AC'};
  color: white;
  box-shadow: ${props => props.disabled ? 'none' : '0 8px 15px rgba(77,182,172,0.2)'};

  &:active {
    transform: ${props => props.disabled ? 'none' : 'scale(0.98)'};
  }
`;