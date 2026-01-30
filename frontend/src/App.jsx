// frontend/src/App.jsx 예시
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Step1Body from './pages/Step1Body';
import Result from './pages/Result';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/step1" element={<Step1Body />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;