import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 내가 만든 페이지들을 불러옵니다. (파일명/경로 확인 필수!)
import Step1Body from './pages/Step1Body';
import Step2Level from './pages/Step2Level';
// 아직 코드를 안 짰다면 임시로 글자만 띄우는 컴포넌트를 만들어두세요.
const TempPage = ({name}) => <div className="p-10">{name} 페이지 준비 중...</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* 첫 화면을 Step1으로 설정하거나, 별도의 Home이 있다면 연결하세요 */}
        <Route path="/" element={<Step1Body />} />
        <Route path="/step1" element={<Step1Body />} />
        <Route path="/step2" element={<Step2Level />} />

        {/* 아직 안 만든 페이지들은 이렇게 일단 이름만 나오게 해두면 안 끊겨요 */}
        <Route path="/step3" element={<TempPage name="Step3 세부증상" />} />
        <Route path="/result" element={<TempPage name="결과" />} />
      </Routes>
    </Router>
  );
}

export default App;