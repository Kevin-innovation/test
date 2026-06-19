import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import styles from './Checklist.module.css'

const ITEMS = [
  {
    id: 1,
    level: 'easy',
    levelLabel: '쉬움',
    emoji: '🍽️',
    title: '식사 중 폰 내려놓기',
    desc: '밥 먹는 동안만큼은 스마트폰을 테이블 밖에 두세요. 식사 시간은 평균 20분, 그게 전부예요.',
    tip: '하루 3끼 × 20분 = 1시간 절약',
  },
  {
    id: 2,
    level: 'easy',
    levelLabel: '쉬움',
    emoji: '🌙',
    title: '취침 30분 전 폰 끄기',
    desc: '블루라이트가 수면 호르몬을 억제해요. 잠자리에 들기 30분 전에 폰을 충전기에 꽂아두세요.',
    tip: '수면 질이 크게 달라져요',
  },
  {
    id: 3,
    level: 'easy',
    levelLabel: '쉬움',
    emoji: '🔕',
    title: '알림 무음 시간 설정',
    desc: '집중 시간 2시간 동안 알림을 끄세요. 모든 알림은 나중에 한 번에 확인해도 늦지 않아요.',
    tip: '집중력이 2배로 올라가요',
  },
  {
    id: 4,
    level: 'easy',
    levelLabel: '쉬움',
    emoji: '⬛',
    title: '화면 흑백 모드 켜기',
    desc: '컬러풀한 앱 아이콘은 클릭 욕구를 자극해요. 흑백 설정만으로 스크린타임이 평균 30% 줄어요.',
    tip: '설정 → 손쉬운 사용 → 색상 필터',
  },
  {
    id: 5,
    level: 'challenge',
    levelLabel: '챌린지',
    emoji: '⏱️',
    title: '하루 앱 사용 2시간 제한',
    desc: '스마트폰 내 스크린타임 기능으로 하루 총 사용을 2시간으로 제한하세요. 초과 시 PIN을 물어봐요.',
    tip: '설정 → 스크린 타임 → 앱 제한',
  },
  {
    id: 6,
    level: 'challenge',
    levelLabel: '챌린지',
    emoji: '🗑️',
    title: 'SNS 앱 7일 삭제 도전',
    desc: '인스타그램, 틱톡, 유튜브 앱을 7일간 삭제해보세요. 금단 증상은 3일 후 사라지고 자유가 찾아와요.',
    tip: '계정은 유지돼요, 앱만 삭제하면 돼요',
  },
  {
    id: 7,
    level: 'detoxer',
    levelLabel: '디톡서',
    emoji: '🌿',
    title: '하루 스마트폰 없이 살아보기',
    desc: '스마트폰을 서랍 속에 넣고 하루를 보내세요. 처음엔 불안하지만, 저녁이 되면 놀라운 고요함을 느껴요.',
    tip: '당신은 이미 스마트폰 없이 살았던 사람이에요',
  },
]

const LEVEL_ORDER = ['easy', 'challenge', 'detoxer']
const LEVEL_CONFIG = {
  easy: { color: '#1ed760', bg: 'rgba(30, 215, 96, 0.08)', border: 'rgba(30, 215, 96, 0.25)' },
  challenge: { color: '#ffa42b', bg: 'rgba(255, 164, 43, 0.08)', border: 'rgba(255, 164, 43, 0.25)' },
  detoxer: { color: '#f3727f', bg: 'rgba(243, 114, 127, 0.08)', border: 'rgba(243, 114, 127, 0.25)' },
}

function FeedbackModal({ item, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 18, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalEmoji}>🎉</div>
          <h3 className={styles.modalTitle}>잘했어요!</h3>
          <p className={styles.modalItem}>{item.emoji} {item.title}</p>
          <p className={styles.modalMsg}>
            이 작은 결심이 당신의 하루를 조금 더 온전하게 만들어줄 거예요.
            <br />오늘부터 시작해보세요!
          </p>
          <div className={styles.modalTip}>💡 {item.tip}</div>
          <button className={`btn-primary ${styles.modalBtn}`} onClick={onClose}>
            계속 도전하기
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function CheckCard({ item, checked, onToggle }) {
  const cfg = LEVEL_CONFIG[item.level]
  return (
    <motion.div
      className={`${styles.card} ${checked ? styles.cardChecked : ''}`}
      style={{
        '--card-color': cfg.color,
        '--card-bg': cfg.bg,
        '--card-border': cfg.border,
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className={styles.cardTop}>
        <span
          className={styles.levelBadge}
          style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
        >
          {item.levelLabel}
        </span>
        <motion.button
          className={`${styles.checkBtn} ${checked ? styles.checkBtnActive : ''}`}
          onClick={() => onToggle(item)}
          whileTap={{ scale: 0.85 }}
        >
          {checked ? '✓' : ''}
        </motion.button>
      </div>

      <div className={styles.cardEmoji}>{item.emoji}</div>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardDesc}>{item.desc}</p>

      {checked && (
        <motion.div
          className={styles.cardDone}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✅ 도전 중!
        </motion.div>
      )}
    </motion.div>
  )
}

export default function Checklist() {
  const [checked, setChecked] = useState(new Set())
  const [feedback, setFeedback] = useState(null)
  const navigate = useNavigate()

  const handleToggle = (item) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(item.id)) {
        next.delete(item.id)
      } else {
        next.add(item.id)
        setFeedback(item)
      }
      return next
    })
  }

  const progress = Math.round((checked.size / ITEMS.length) * 100)

  return (
    <div className={styles.page}>
      {feedback && (
        <FeedbackModal item={feedback} onClose={() => setFeedback(null)} />
      )}

      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.badge}>디지털 디톡스 체크리스트</div>
        <h1 className={styles.title}>
          지금 당장 실천할 수 있는<br />
          <span className={styles.titleAccent}>7가지 습관</span>
        </h1>
        <p className={styles.desc}>
          쉬운 것부터 시작하세요. 체크할수록 당신의 시간이 돌아와요.
        </p>

        {/* Progress */}
        <div className={styles.progressArea}>
          <div className={styles.progressInfo}>
            <span className={styles.progressLabel}>진행률</span>
            <span className={styles.progressCount}>{checked.size} / {ITEMS.length}</span>
          </div>
          <div className={styles.progressBar}>
            <motion.div
              className={styles.progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Level Legend */}
      <div className={styles.legend}>
        {LEVEL_ORDER.map((lvl) => {
          const cfg = LEVEL_CONFIG[lvl]
          const label = { easy: '쉬움 (4)', challenge: '챌린지 (2)', detoxer: '디톡서 (1)' }[lvl]
          return (
            <div key={lvl} className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: cfg.color }} />
              <span className={styles.legendLabel}>{label}</span>
            </div>
          )
        })}
        <div className={styles.legendArrow}>← 난이도 →</div>
      </div>

      {/* Cards Grid */}
      <div className={styles.grid}>
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <CheckCard
              item={item}
              checked={checked.has(item.id)}
              onToggle={handleToggle}
            />
          </motion.div>
        ))}
      </div>

      {/* All Done CTA */}
      {checked.size === ITEMS.length && (
        <motion.div
          className={styles.allDone}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <div className={styles.allDoneEmoji}>🏆</div>
          <h2 className={styles.allDoneTitle}>완벽해요! 디톡서 달성!</h2>
          <p className={styles.allDoneDesc}>
            7개 습관을 모두 선택하셨네요. 실천하면 당신의 삶이 달라질 거예요.
          </p>
          <button className="btn-primary" onClick={() => navigate('/dashboard')}>
            다른 분들의 후기 보기
          </button>
        </motion.div>
      )}
    </div>
  )
}
