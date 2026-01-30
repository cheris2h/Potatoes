import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // 서버 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUpUser = async (userData) => {
  try {
    const response = await api.post('/users/signup', userData);
    return response.data; // 성공 시 유저 ID(예: 2) 반환
  } catch (error) {
    console.error('회원가입 에러:', error);
    throw error;
  }
};