# 아프닥 - 생성형 AI를 활용한 건강 관리 서비스

<img width="160" height="116" alt="image" src="https://github.com/user-attachments/assets/cafc8035-8ab7-48b8-b63c-a5e23ef61c24" />

# 📌 목차

- #### [README]
- #### [🙋‍♂️ 기획 배경 & 소개]
- #### [🕰️ 개발 기간]
- #### [✨ 주요 기능]
- #### [📝 설계 문서]
- #### [🛠 개발 환경]
- #### [📂 파일 구조]
- #### [🐰 팀원 소개]
   
  <br>
  <br>

<details>
  <summary> <h2> 🙋‍♂️ 기획 배경 & 소개</h2></summary>

  - 의료 사각지대에 위치한 노년층과 발달·지체장애인과 같은 디지털 취약계층도 간편하게 의료 서비스를 받을 수 있도록 본 서비스를 기획하였습니다.<br>
  - Google Gemini를 활용하여 입력받은 환자 정보를 통해 의사 & 환자용 소견서를 생성하는 서비스로, 환자는 병원에 가지 않고 먹어야 할 약을 알 수 있고, 의사에게 설명하기 힘든 사람도 소견서를 통해 보다 원활한 치료를 받을 수 있습니다.<br>
  - 이를 통해 노년층 및 발달·지체 장애인의 신체적 건강 도모와 사회적 불편함을 해소하고자 합니다.<br>
</details>


## 🕰️ 개발 기간
  * 2026.01.30~2026.01.31
<details>
  <summary><h2>✨ 주요 기능</h2></summary>

  <h3>회원 가입</h3>
  <ul>
    <li>기기 고유부호를 통해 이용자 식별</li>
    <li>최초 앱 접속 시 회원 개인정보(이름, 나이, 성별, 보호자 연락처 등) 수집</li>
  </ul>

  <h3>정보 수집</h3>
  <ul>
    <li>사람, 사물 픽토그램과 감정 픽토그램을 이용</li>
    <li>이용자의 환부, 고통 정도, 고통의 종류 수집</li>
  </ul>

  <h3>AI 평가</h3>
  <ul>
    <li>AI API 연동</li>
    <li>입력받은 정보에 따른 AI 평가</li>
  </ul>

  <h3>결과 출력</h3>
  <ul>
    <li>AI 평가 소견서 출력</li>
    <li>환자용 & 의사용 구분</li>
    <li>소견서 저장 기능</li>
    <li>처음으로 이동 기능</li>
  </ul>

  <h3>마이페이지</h3>
  <ul>
    <li>AI소견서 저장</li>
    <li>선택하여 특정 소견서 출력</li>
    <li>요약본 출력</li>
  </ul>

</details>


## 📝 설계 문서
  - ERD

<img width="667" height="701" alt="image" src="https://github.com/user-attachments/assets/4c95d6fc-efa3-4c29-888c-f19929ee6ae0" />

  - 서비스 아키텍처

<img width="737" height="402" alt="image" src="https://github.com/user-attachments/assets/392b1b81-a3c8-4346-85ca-f4a9247bdbf9" />




## 🛠 개발 환경

### Backend
  - ![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
  - ![Spring](https://img.shields.io/badge/Springboot-6DB33F?style=for-the-badge&logo=spring&logoColor=green)
  - ![IntelliJ](https://img.shields.io/badge/intellijidea-000000.svg?&style=flat-square&logo=node.js&logoColor=white)
<br>

### Frontend
  - ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  - ![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?&style=flat-square&logo=node.js&logoColor=white)
  - ![HTML](https://img.shields.io/badge/html5-E34F26?&style=flat-square&logo=node.js&logoColor=white)
  - ![VSCODE](https://img.shields.io/badge/VisualStudioCode-007ACC?&style=flat-square&logo=node.js&logoColor=white")
<br>

### 협업 툴
  - ![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=black)
  - ![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=navy)
  - ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
  <br>


## 파일 구조

<details>
  <summary><h4>Backend</h4></summary>
  <div>
  

 ``` 📁 backend
├─ 📁 gradle
│  └─ 📁 wrapper
│      ├─ 📄 gradle-wrapper.jar
│      └─ 📄 gradle-wrapper.properties
├─ 📁 src
│  ├─ 📁 main
│  │  ├─ 📁 java
│  │  │  └─ 📁 com/potatoes/backend
│  │  │      ├─ 📁 config
│  │  │      │  └─ 📄 WebConfig.java
│  │  │      ├─ 📁 controller
│  │  │      │  ├─ 📄 DiagnosisController.java
│  │  │      │  └─ 📄 UserController.java
│  │  │      ├─ 📁 domain
│  │  │      │  ├─ 📄 BodyPart.java
│  │  │      │  ├─ 📄 Gender.java
│  │  │      │  ├─ 📄 Report.java
│  │  │      │  └─ 📄 User.java
│  │  │      ├─ 📁 dto
│  │  │      │  ├─ 📁 request
│  │  │      │  │  ├─ 📄 ReportRequest.java
│  │  │      │  │  └─ 📄 UserRequest.java
│  │  │      │  └─ 📁 response
│  │  │      │      ├─ 📄 ReportResponse.java
│  │  │      │      └─ 📄 UserResponse.java
│  │  │      ├─ 📁 repository
│  │  │      │  ├─ 📄 ReportRepository.java
│  │  │      │  └─ 📄 UserRepository.java
│  │  │      ├─ 📁 service
│  │  │      │  ├─ 📄 DiagnosisService.java
│  │  │      │  └─ 📄 UserService.java
│  │  │      └─ 📄 BackendApplication.java
│  │  └─ 📁 resources
│  │      ├─ 📄 application-api.yaml
│  │      ├─ 📄 application.yaml
│  │      └─ 📄 data.sql
│  └─ 📁 test
│      └─ 📁 java/com/potatoes/backend
│          └─ 📄 BackendApplicationTests.java
├─ 📄 .gitattributes
├─ 📄 .gitignore
├─ 📄 build.gradle
├─ 📄 gradlew
├─ 📄 gradlew.bat
└─ 📄 settings.gradle
```
  </div>
</details>

<details>
  <summary><h4>Frontend</h4></summary>
  <div>
    
 ``` 📁 frontend
├─ 📁 public
│  ├─ 📁 assets
│  │  ├─ 📁 loading
│  │  │  ├─ 📄 doctor_loading_1.png
│  │  │  ├─ 📄 doctor_loading_2.png
│  │  │  └─ 📄 doctor_loading_3.png
│  │  └─ 📁 pictograms
│  │      ├─ 📄 dizzy.png
│  │      ├─ 📄 fire.png
│  │      ├─ 📄 heavy.png
│  │      ├─ 📄 hit.png
│  │      └─ 📄 vite.svg
├─ 📁 src
│  ├─ 📁 api
│  │  ├─ 📄 axios.js
│  │  ├─ 📄 client.js
│  │  ├─ 📄 mockData.js
│  │  ├─ 📄 reportApi.js
│  │  ├─ 📄 reportService.js
│  │  ├─ 📄 service.js
│  │  ├─ 📄 symptomData.js
│  │  └─ 📄 userApi.js
│  ├─ 📁 assets
│  │  └─ 📄 react.svg
│  ├─ 📁 components
│  │  └─ 📁 common
│  │      ├─ 📄 Button.js
│  │      ├─ 📄 Layout.jsx
│  │      └─ 📄 ProgressBar.jsx
│  ├─ 📁 pages
│  │  ├─ 📄 Home.jsx
│  │  ├─ 📄 Loading.jsx
│  │  ├─ 📄 MyPage.jsx
│  │  ├─ 📄 Result.jsx
│  │  ├─ 📄 SignUp.jsx
│  │  ├─ 📄 SignUp2.jsx
│  │  ├─ 📄 Step1Body.jsx
│  │  ├─ 📄 Step2Level.jsx
│  │  └─ 📄 Step3Detail.jsx
│  ├─ 📁 styles
│  │  ├─ 📄 GlobalStyle.js
│  │  └─ 📄 theme.js
│  ├─ 📄 App.css
│  ├─ 📄 App.jsx
│  ├─ 📄 index.css
│  └─ 📄 main.jsx
├─ 📄 .env
├─ 📄 .gitignore
├─ 📄 README.md
├─ 📄 eslint.config.js
├─ 📄 index.html
├─ 📄 package-lock.json
├─ 📄 package.json
├─ 📄 tailwind.config.js
└─ 📄 vite.config.js
```
  </div>
</details>


## 🐰 팀원 소개

| 이름   | 역할                 |
| ------ | -------------------- |
| 신영재 | - Leader, AI, BE <br>    |
| 윤소연 | - FE <br>                 |
| 고서영 | - BE <br>            |
| 윤채린 | - BE, FE <br>            |
| 신지우 | - FE, Docs<br> |

<br>


