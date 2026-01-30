import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';

// 홈/상세 페이지와 통일감을 주는 스타일 정의
const ThickDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #E5E7EB;
  margin: 0;
`;

const Container = styled.div`
  flex: 1;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  background-color: #F8F9FA;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 20px;
  background-color: white;
`;

const UserName = styled.h2`
  font-size: 22px;
  font-weight: 800;
  color: #2D3436;
  margin: 0;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 800;
  color: #2D3436;
  margin: 24px 0 16px 0;
`;

const RecordGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const RecordCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border-radius: 24px;
  background-color: white;
  border: 2px solid #EDF2F7;
  transition: all 0.2s;
  cursor: pointer;
  text-align: left;

  &:active {
    transform: scale(0.96);
    border-color: #4DB6AC;
    background-color: #E0F2F1;
  }

  .icon {
    font-size: 28px;
    margin-bottom: 12px;
  }

  .title {
    font-size: 16px;
    font-weight: 800;
    color: #2D3436;
    margin-bottom: 4px;
  }

  .date {
    font-size: 13px;
    color: #A0AEC0;
  }
`;

const HomeButton = styled.button`
  width: 100%;
  margin-top: 60px;
  padding: 16px;
  border-radius: 16px;
  border: none;
  background-color: #4DB6AC;
  color: white;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;

  &:active {
    transform: scale(0.97);
  }
`;
const MyPage = () => {
  const navigate = useNavigate();

  // 오늘 날짜 가져오기 (YYYY.MM.DD 형식)
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\s/g, '').slice(0, -1);

  const reportHistory = [
    { id: 1, part: '오른팔', date: today, icon: '💪' },
    { id: 2, part: '머리', date: '2024.03.12', icon: '🧠' },
    { id: 3, part: '가슴/배', date: '2023.12.05', icon: '🫁' },
    { id: 4, part: '다리', date: '2023.11.28', icon: '🦵' },
  ];

  return (
    <Layout title="마이페이지" showBack={false}>
      <ThickDivider />

      <ProfileSection>
        <UserName>감자 님</UserName>
        <p style={{ color: '#636E72', marginTop: '4px', fontSize: '14px' }}>
          건강한 하루 되세요!
        </p>
      </ProfileSection>

      <ThickDivider />

      <Container>
        <SectionTitle>최근 소견서 목록</SectionTitle>

        <RecordGrid>
          {reportHistory.map((report) => (
            <RecordCard
              key={report.id}
              onClick={() => {
                // 오른팔(id: 1)이든 뭐든 클릭하면 리포트 상세 페이지(DoctorReport)로 이동
                // App.js에 등록된 경로가 '/report/:reportId'라고 가정합니다.
                navigate(`/report/${report.id}`);
              }}
            >
              <div className="icon">{report.icon}</div>
              <div className="title">{report.part} 소견서</div>
              <div className="date">{report.date}</div>
            </RecordCard>
          ))}
        </RecordGrid>

        <HomeButton onClick={() => navigate('/')}>
          홈으로 돌아가기
        </HomeButton>
      </Container>
    </Layout>
  );
};

export default MyPage;