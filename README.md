# 📵 스크린타임 충격 — 디지털 디톡스 웹앱

스마트폰 하루 사용 시간을 입력하면 일주일·10년·평생으로 환산해 시각화하고,  
디지털 디톡스 습관 체크리스트와 실제 후기를 제공하는 React 웹 애플리케이션입니다.

---

## 목차

1. [기술 스택](#1-기술-스택)
2. [프로젝트 폴더 구조](#2-프로젝트-폴더-구조)
3. [페이지별 기능 설명](#3-페이지별-기능-설명)
4. [앱 개발 프로세스 (학습용)](#4-앱-개발-프로세스-학습용)
5. [로컬 실행 방법](#5-로컬-실행-방법)
6. [Git 커밋 & 푸시 완전 가이드](#6-git-커밋--푸시-완전-가이드)

---

## 1. 기술 스택

| 분류 | 기술 | 역할 |
|------|------|------|
| 프레임워크 | React 19 | UI 컴포넌트 기반 개발 |
| 빌드 도구 | Vite 8 | 빠른 개발 서버 & 번들링 |
| 라우팅 | React Router DOM 7 | 페이지 간 이동 (SPA) |
| 애니메이션 | Framer Motion 12 | 부드러운 화면 전환 & 인터랙션 |
| 스타일링 | CSS Modules | 컴포넌트 단위 스타일 격리 |
| 린터 | ESLint 10 | 코드 품질 검사 |

---

## 2. 프로젝트 폴더 구조

```
MS/
├── public/                  # 정적 파일 (브라우저에 그대로 제공)
│   ├── favicon.svg          # 브라우저 탭 아이콘
│   └── icons.svg            # 앱에서 사용하는 SVG 아이콘 모음
│
├── src/                     # 실제 소스 코드 (핵심 개발 영역)
│   ├── assets/              # 이미지, SVG 등 정적 자원
│   │   ├── hero.png         # 히어로 섹션 이미지
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/          # 여러 페이지에서 공통으로 쓰는 컴포넌트
│   │   ├── Navbar.jsx       # 상단 네비게이션 바 (로고 + 메뉴 링크)
│   │   └── Navbar.module.css
│   │
│   ├── pages/               # 각 URL 경로에 대응하는 페이지 컴포넌트
│   │   ├── Landing.jsx      # "/" — 스크린타임 시각화 메인 페이지
│   │   ├── Landing.module.css
│   │   ├── Checklist.jsx    # "/checklist" — 디톡스 체크리스트 페이지
│   │   ├── Checklist.module.css
│   │   ├── Dashboard.jsx    # "/dashboard" — 통계 & 후기 페이지
│   │   └── Dashboard.module.css
│   │
│   ├── App.jsx              # 라우터 설정 + 전체 레이아웃 루트
│   ├── App.css              # 전역 공통 스타일 (버튼, 색상 변수 등)
│   ├── index.css            # body, font 등 기본 리셋 스타일
│   └── main.jsx             # React 앱의 진입점 (DOM에 마운트)
│
├── index.html               # Vite가 읽는 HTML 템플릿 (id="root" 포함)
├── vite.config.js           # Vite 설정 파일
├── eslint.config.js         # ESLint 규칙 설정
├── package.json             # 프로젝트 메타 정보 & 의존성 목록
└── package-lock.json        # 설치된 패키지의 정확한 버전 잠금 파일
```

> **핵심 원칙**: `components/`는 재사용 가능한 UI 조각, `pages/`는 URL 하나에 대응하는 전체 화면입니다.

---

## 3. 페이지별 기능 설명

### 📱 Landing 페이지 (`/`)
- 슬라이더 또는 숫자 입력으로 **하루 스크린타임(0.5~16시간)** 설정
- 입력값을 **오늘 / 1주일 / 10년 / 평생** 4단계로 자동 환산
- 각 단계는 스크롤하면 순서대로 등장하는 **StageCard** 컴포넌트로 구성
- Framer Motion의 `useInView`를 활용해 카드가 뷰포트에 들어올 때 애니메이션 실행

### ✅ Checklist 페이지 (`/checklist`)
- 난이도별(쉬움 / 챌린지 / 디톡서) **7가지 디톡스 습관 카드**
- 카드 체크 시 Framer Motion `AnimatePresence`로 **축하 모달** 팝업
- 진행률 표시 바 (체크한 개수 / 전체 개수)
- 전체 완료 시 특별 완료 배너 표시

### 📊 Dashboard 페이지 (`/dashboard`)
- 참여자 수, 절약 시간 등 **4개 통계 카드**
- 12명의 실제 스타일 **후기 카드 그리드**
- 각 후기 카드에 이름·나이·직업·별점·실천 일수 표시

---

## 4. 앱 개발 프로세스 (학습용)

실제 이 프로젝트가 만들어진 단계별 순서입니다.

### STEP 1 — 프로젝트 초기 세팅

```bash
# Vite + React 템플릿으로 프로젝트 생성
npm create vite@latest ms -- --template react

# 프로젝트 폴더로 이동
cd ms

# 기본 의존성 설치
npm install
```

> Vite는 Webpack보다 훨씬 빠른 개발 서버를 제공합니다.  
> `npm create vite`는 `index.html`, `src/main.jsx`, `src/App.jsx` 등 기본 파일을 자동 생성합니다.

---

### STEP 2 — 추가 라이브러리 설치

```bash
# 페이지 라우팅용
npm install react-router-dom

# 애니메이션용
npm install framer-motion
```

> `react-router-dom`: URL이 바뀌어도 페이지 새로고침 없이 컴포넌트만 교체하는 SPA 라우팅 구현  
> `framer-motion`: 선언적으로 애니메이션을 정의할 수 있는 React 전용 라이브러리

---

### STEP 3 — 라우터 설정 (`App.jsx`)

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Checklist from './pages/Checklist'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/"          element={<Landing />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
```

> `BrowserRouter`가 전체를 감싸고, `Routes` 안에서 URL 경로(path)와 페이지 컴포넌트를 1:1 매핑합니다.  
> `Navbar`는 모든 페이지에서 공통으로 보여야 하므로 `Routes` 밖에 위치합니다.

---

### STEP 4 — 공통 Navbar 컴포넌트 개발

```jsx
// NavLink는 현재 URL과 일치하면 자동으로 active 클래스를 붙여줍니다
<NavLink to="/" end className={({ isActive }) =>
  `${styles.link} ${isActive ? styles.active : ''}`
}>
  시각화
</NavLink>
```

> `end` 속성: `/checklist`에서도 `/`가 부분 일치로 active되는 것을 방지합니다.

---

### STEP 5 — Landing 페이지 (상태 관리 + 연산)

```jsx
// useState로 슬라이더 값 관리
const [hours, setHours] = useState(4)

// 스크린타임 환산 로직 (순수 계산)
const STAGES = [
  { id: 'today',   getUnit: (h) => `${h}시간` },
  { id: 'week',    getUnit: (h) => `${Math.round(h * 7 * 10) / 10}시간` },
  { id: 'decade',  getUnit: (h) => `${Math.round(h * 365 * 10).toLocaleString()}시간` },
  { id: 'century', getUnit: (h) => `${Math.round(h * 365 * 100).toLocaleString()}시간` },
]
```

> 상태(state)가 바뀌면 React가 자동으로 화면을 다시 렌더링합니다.  
> 연산 로직은 컴포넌트 밖 `STAGES` 배열로 분리해 컴포넌트를 깔끔하게 유지합니다.

---

### STEP 6 — Framer Motion으로 애니메이션 추가

```jsx
import { motion, useInView } from 'framer-motion'

// 스크롤해서 보일 때 카드 등장
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: '-80px' })

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 60 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
>
```

> `initial`: 시작 상태 (투명 + 아래 60px)  
> `animate`: 목표 상태 (불투명 + 제자리)  
> `transition`: 변화에 걸리는 시간과 방식

---

### STEP 7 — CSS Modules로 스타일 격리

```css
/* Landing.module.css */
.stageCard {
  background: var(--stage-bg);
  border: 1px solid var(--stage-color);
  border-radius: 16px;
  padding: 28px;
}
```

```jsx
import styles from './Landing.module.css'

// 클래스명 충돌 없이 안전하게 사용
<div className={styles.stageCard}>
```

> CSS Modules는 빌드 시 `.stageCard`를 `.Landing_stageCard__abc12` 같은 고유 이름으로 변환합니다.  
> 파일이 달라도 같은 클래스명을 써도 충돌하지 않습니다.

---

### STEP 8 — 개발 서버로 확인 & 반복

```bash
npm run dev
# → http://localhost:5173 에서 실시간 확인
```

> 파일을 저장하면 브라우저가 자동으로 새로고침됩니다 (HMR: Hot Module Replacement).  
> 기능을 하나 추가 → 브라우저 확인 → 수정 → 반복하는 흐름으로 개발합니다.

---

## 5. 로컬 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/Kevin-innovation/test.git
cd test

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속 후 앱을 확인합니다.

---

## 6. Git 커밋 & 푸시 완전 가이드

### Git이란?

코드의 변경 이력을 기록하고 관리하는 도구입니다.  
GitHub는 Git 저장소를 인터넷에 저장하고 공유하는 서비스입니다.

---

### 핵심 개념 3가지

| 개념 | 비유 | 설명 |
|------|------|------|
| `add` | 사진 찍을 준비 | 변경된 파일을 "기록 대기" 상태로 올리기 |
| `commit` | 사진 찍기 | 대기 중인 변경 사항을 이력으로 확정 저장 |
| `push` | 앨범에 업로드 | 로컬(내 PC) 기록을 GitHub(원격)에 올리기 |

---

### 처음 시작할 때 (최초 1회만)

```bash
# 1. Git 사용자 이름 설정 (GitHub 아이디와 동일하게)
git config --global user.name "본인GitHub아이디"

# 2. Git 이메일 설정 (GitHub 가입 이메일과 동일하게)
git config --global user.email "본인이메일@example.com"

# 3. 프로젝트 폴더에서 Git 초기화 (이미 clone 했다면 생략)
git init

# 4. 원격 저장소 연결 (이미 연결됐다면 생략)
git remote add origin https://github.com/본인아이디/저장소이름.git
```

---

### 매번 코드를 올릴 때 (이 순서를 따라하세요)

#### 1단계 — 현재 상태 확인

```bash
git status
```

- 빨간 글씨: 변경됐지만 아직 add 안 된 파일
- 초록 글씨: add 완료, commit 대기 중인 파일

---

#### 2단계 — 변경 파일 스테이징 (add)

```bash
# 방법 A: 특정 파일만 추가
git add src/pages/Landing.jsx

# 방법 B: 변경된 모든 파일 한꺼번에 추가
git add .
```

> `.`은 현재 폴더의 모든 변경 파일을 의미합니다.

---

#### 3단계 — 커밋 (commit)

```bash
git commit -m "커밋 메시지를 여기에 작성"
```

**좋은 커밋 메시지 예시:**
```bash
git commit -m "Landing 페이지 슬라이더 기능 추가"
git commit -m "Checklist 체크 애니메이션 버그 수정"
git commit -m "Navbar 반응형 스타일 개선"
```

> 커밋 메시지는 "무엇을 왜 했는지" 한 줄로 명확하게 씁니다.

---

#### 4단계 — 푸시 (push)

```bash
# 처음 푸시할 때 (브랜치 연결 포함)
git push -u origin main

# 이후 푸시할 때
git push
```

> `-u origin main`: "앞으로 push/pull 할 때 origin의 main 브랜치를 기본으로 써라"는 설정입니다.  
> 한 번 `-u`로 설정하면 다음부터는 `git push`만 입력해도 됩니다.

---

### 전체 흐름 한눈에 보기

```
[파일 수정]
    ↓
git status          ← 무엇이 바뀌었는지 확인
    ↓
git add .           ← 변경 파일을 스테이징 (기록 준비)
    ↓
git commit -m "설명" ← 변경 내용을 이력으로 확정
    ↓
git push            ← GitHub에 업로드
```

---

### 자주 쓰는 Git 명령어 모음

```bash
git status              # 현재 변경 상태 확인
git log --oneline       # 커밋 이력을 한 줄씩 요약해서 보기
git diff                # 수정한 내용의 세부 변경 사항 보기
git pull                # GitHub의 최신 내용을 내 PC로 내려받기
git add .               # 모든 변경 파일 스테이징
git commit -m "메시지"  # 커밋 생성
git push                # GitHub에 푸시
```

---

### 실전 예제 (처음부터 끝까지)

```bash
# 1. 파일을 수정한 후 상태 확인
git status

# 2. 변경 파일 전체 스테이징
git add .

# 3. 어떤 내용이 스테이징됐는지 다시 확인 (선택)
git status

# 4. 커밋 생성
git commit -m "디톡스 체크리스트 7번째 항목 추가"

# 5. GitHub에 푸시
git push

# 6. 완료 — GitHub 저장소 페이지에서 변경 사항 확인!
```

---

> 💡 **팁**: 기능 하나를 완성할 때마다 커밋하는 습관을 들이세요.  
> 나중에 문제가 생겼을 때 원하는 시점으로 되돌아갈 수 있습니다.
