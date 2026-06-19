import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css'

const STATS = [
  { emoji: '👥', value: '12,847명', label: '이번 달 참여자' },
  { emoji: '⏳', value: '평균 2.8시간', label: '절약한 하루 스크린타임' },
  { emoji: '⭐', value: '4.9 / 5.0', label: '평균 만족도' },
  { emoji: '🌱', value: '78%', label: '2주 이상 꾸준히 실천' },
]

const REVIEWS = [
  {
    id: 1,
    name: '김민준',
    age: 28,
    job: '직장인',
    avatar: '👨‍💼',
    stars: 5,
    level: '챌린지',
    levelColor: '#ffa42b',
    text: '앱 사용 2시간 제한을 걸었더니 처음엔 너무 답답했는데, 2주 후에 독서를 다시 시작하게 됐어요. 하루가 진짜 길어진 느낌이에요.',
    days: 21,
  },
  {
    id: 2,
    name: '이서연',
    age: 24,
    job: '대학생',
    avatar: '👩‍🎓',
    stars: 5,
    level: '디톡서',
    levelColor: '#f3727f',
    text: '하루 폰 없이 살아보기 도전했는데... 처음 2시간은 진짜 불안했어요. 근데 오후가 되니까 마음이 너무 평온해졌어요. 꼭 해보세요.',
    days: 1,
  },
  {
    id: 3,
    name: '박도현',
    age: 35,
    job: '프리랜서 디자이너',
    avatar: '🧑‍🎨',
    stars: 5,
    level: '쉬움',
    levelColor: '#1ed760',
    text: '식사 중 폰 내려놓기부터 시작했어요. 아이와 밥 먹을 때 눈을 마주치기 시작했고, 아이가 먼저 말을 걸어왔어요. 소소한데 엄청난 변화였어요.',
    days: 45,
  },
  {
    id: 4,
    name: '최유나',
    age: 31,
    job: '간호사',
    avatar: '👩‍⚕️',
    stars: 5,
    level: '쉬움',
    levelColor: '#1ed760',
    text: '야간 근무 후 잠을 잘 못 잤는데, 취침 30분 전 폰 끄기 딱 하나만 지켰더니 수면의 질이 눈에 띄게 달라졌어요. 진짜예요.',
    days: 30,
  },
  {
    id: 5,
    name: '정현우',
    age: 19,
    job: '고등학생',
    avatar: '🧑‍🏫',
    stars: 4,
    level: '챌린지',
    levelColor: '#ffa42b',
    text: 'SNS 앱 7일 삭제했는데 공부 집중도가 확실히 올라갔어요. 성적도 조금 올랐고요. 근데 8일째 다시 깔았... 다음엔 2주 도전할게요 ㅋㅋ',
    days: 7,
  },
  {
    id: 6,
    name: '강수진',
    age: 42,
    job: '주부',
    avatar: '👩‍🍳',
    stars: 5,
    level: '쉬움',
    levelColor: '#1ed760',
    text: '흑백 모드 설정 하나로 스크린타임이 3시간에서 1.5시간으로 줄었어요. 너무 신기하죠? 그냥 칙칙해 보이니까 덜 보게 되더라고요.',
    days: 60,
  },
  {
    id: 7,
    name: '윤재원',
    age: 26,
    job: 'IT 개발자',
    avatar: '🧑‍💻',
    stars: 5,
    level: '디톡서',
    levelColor: '#f3727f',
    text: '개발자인 저도 폰 없이 하루 보내기 했는데, 업무 집중도가 200% 올라갔어요. 오히려 스마트폰이 생산성을 얼마나 갉아먹는지 깨달았죠.',
    days: 3,
  },
  {
    id: 8,
    name: '한지민',
    age: 29,
    job: '마케터',
    avatar: '👩‍💼',
    stars: 5,
    level: '챌린지',
    levelColor: '#ffa42b',
    text: '알림 무음 2시간을 처음엔 일 때문에 못 할 줄 알았는데, 오히려 클라이언트들도 더 빠른 답장을 받았어요. 집중해서 일하니까요!',
    days: 14,
  },
  {
    id: 9,
    name: '송민호',
    age: 22,
    job: '대학원생',
    avatar: '🧑‍🔬',
    stars: 5,
    level: '쉬움',
    levelColor: '#1ed760',
    text: '논문 쓰면서 식사 중 폰 안 보기 시작했어요. 밥 먹는 시간이 진짜 쉬는 시간이 되면서 오후 집중력이 살아났어요. 추천합니다.',
    days: 18,
  },
  {
    id: 10,
    name: '오세영',
    age: 38,
    job: '교사',
    avatar: '👨‍🏫',
    stars: 5,
    level: '챌린지',
    levelColor: '#ffa42b',
    text: '학생들에게 스마트폰 줄이라고 하면서 정작 저는 하루 6시간씩 쓰고 있었어요. 이 사이트 보고 충격받아서 바꿨습니다. 이제 3주째 2시간 이하예요.',
    days: 21,
  },
  {
    id: 11,
    name: '임나라',
    age: 33,
    job: '프리랜서 작가',
    avatar: '✍️',
    stars: 5,
    level: '디톡서',
    levelColor: '#f3727f',
    text: '작가인데 아이러니하게 SNS를 끊었더니 글이 더 잘 써졌어요. 7일 SNS 삭제 후 단편소설 하나 완성했어요. 창작에 방해가 됐던 거예요.',
    days: 7,
  },
  {
    id: 12,
    name: '권태양',
    age: 16,
    job: '중학생',
    avatar: '🧑‍🎒',
    stars: 4,
    level: '쉬움',
    levelColor: '#1ed760',
    text: '엄마가 보여줘서 봤는데 100년치 계산 보고 진짜 소름 돋았어요. 그날부터 취침 전 30분 폰 끄기 하고 있어요. 숙면하니까 아침이 달라요.',
    days: 10,
  },
]

function StarRating({ count }) {
  return (
    <div className={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < count ? '#ffa42b' : '#4d4d4d', fontSize: '14px' }}>
          ★
        </span>
      ))}
    </div>
  )
}

function ReviewCard({ review, index }) {
  return (
    <motion.div
      className={styles.reviewCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <div className={styles.reviewTop}>
        <div className={styles.reviewAvatar}>{review.avatar}</div>
        <div className={styles.reviewMeta}>
          <div className={styles.reviewName}>{review.name}</div>
          <div className={styles.reviewSub}>{review.age}세 · {review.job}</div>
        </div>
        <StarRating count={review.stars} />
      </div>

      <span
        className={styles.reviewLevel}
        style={{ color: review.levelColor, background: `${review.levelColor}15`, border: `1px solid ${review.levelColor}30` }}
      >
        {review.level} 달성
      </span>

      <p className={styles.reviewText}>"{review.text}"</p>

      <div className={styles.reviewDays}>🔥 {review.days}일째 실천 중</div>
    </motion.div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.badge}>실제 후기 모음</div>
        <h1 className={styles.title}>
          이미 변화를 시작한<br />
          <span className={styles.titleAccent}>사람들의 이야기</span>
        </h1>
        <p className={styles.desc}>
          작은 습관 하나가 삶을 얼마나 바꿀 수 있는지, 직접 읽어보세요.
        </p>
      </motion.div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            className={styles.statCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <span className={styles.statEmoji}>{s.emoji}</span>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className={styles.reviewsGrid}>
        {REVIEWS.map((review, i) => (
          <ReviewCard key={review.id} review={review} index={i} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className={styles.cta}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.ctaTitle}>다음 후기의 주인공이 되세요 🌟</h2>
        <p className={styles.ctaDesc}>
          지금 체크리스트를 시작하면, 당신도 며칠 후 이곳에 후기를 남길 수 있어요.
        </p>
        <div className={styles.ctaBtns}>
          <button className="btn-primary" onClick={() => navigate('/checklist')}>
            체크리스트 시작하기
          </button>
          <button className="btn-secondary" onClick={() => navigate('/')}>
            내 스크린타임 확인하기
          </button>
        </div>
      </motion.div>
    </div>
  )
}
