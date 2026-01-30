import styled from 'styled-components';

const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: #f1f3f5;
`;

const Bar = styled.div`
  width: ${(props) => (props.step / 3) * 100}%;
  height: 100%;
  background-color: #4db6ac;
  transition: width 0.3s ease;
`;

const ProgressBar = ({ step }) => (
  <ProgressContainer>
    <Bar step={step} />
  </ProgressContainer>
);

export default ProgressBar;