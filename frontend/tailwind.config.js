/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4DB6AC', // 메인 민트색
          light: '#E0F2F1',   // 연한 배경용
        },
        danger: {
          DEFAULT: '#FF5252', // 응급/진료중 빨간색
          soft: '#FFEBEE',    // 부드러운 경고 배경
        },
        gray: {
          bg: '#F8F9FA',      // 앱 전체 배경
          text: '#2D3436',    // 메인 글자색
          sub: '#636E72',     // 보조 설명색
        }
      },
      borderRadius: {
        '3xl': '24px',        // 취약계층을 위한 부드러운 라운딩
      },
      // 애니메이션 추가 (마커 찍을 때 효과용)
      animation: {
        'ping-once': 'ping 1s cubic-bezier(0, 0, 0.2, 1) 1',
      }
    },
  },
  plugins: [],
}