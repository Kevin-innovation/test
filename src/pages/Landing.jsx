import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import styles from './Landing.module.css'

const STAGES = [
  {
    id: 'today',
    label: '오늘 하루',
    color: '#1ed760',
    emoji: '📱',
    getHours: (h) => h,
    getUnit: (h) => `${h}시간`,
    getCompare: (h) => {
      const movies = Math.round((h * 60) / 110)
      return movies >= 1
        ? `영화 ${movies}편을 볼 수 있는 시간`
        : `${Math.round(h * 60)}분을 화면만 바라봤어요`
    },
    getBg: '#1a2a1a',
  },
  {
    id: 'week',
    label: '이번 한 주',
    color: '#ffa42b',
    emoji: '📅',
    getHours: (h) => Math.round(h * 7 * 10) / 10,
    getUnit: (h) => `${Math.round(h * 7 * 10) / 10}시간`,
    getCompare: (h) => {
      const days = Math.round((h * 7) / 24 * 10) / 10
      return `꼬박 ${days}일을 스마트폰만 본 셈이에요`
    },
    getBg: '#2a2010',
  },
  {
    id: 'decade',
    label: '10년 후',
    color: '#f3727f',
    emoji: '🗓️',
    getHours: (h) => Math.round(h * 365 * 10),
    getUnit: (h) => `${Math.round(h * 365 * 10).toLocaleString()}시간`,
    getCompare: (h) => {
      const years = Math.round((h * 365 * 10) / 8760 * 10) / 10
      const books = Math.round(h * 365 * 10 / 8)
      return `인생 ${years}년치 시간, 책 ${books.toLocaleString()}권 분량`
    },
    getBg: '#2a1015',
  },
  {
    id: 'century',
    label: '평생 (100년)',
    color: '#ff4d6d',
    emoji: '💀',
    getHours: (h) => Math.round(h * 365 * 100),
    getUnit: (h) => `${Math.round(h * 365 * 100).toLocaleString()}시간`,
    getCompare: (h) => {
      const years = Math.round((h * 365 * 100) / 8760)
      const earthRounds = Math.round((h * 365 * 100 * 850) / 40075)
      return `무려 ${years}년! 지구를 ${earthRounds}바퀴 걸어서 돌 수 있는 시간`
    },
    getBg: '#1a0a0a',
  },
]

function StageCard({ stage, hours, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={styles.stageCard}
      style={{ '--stage-color': stage.color, '--stage-bg': stage.getBg }}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className={styles.stageHeader}>
        <span className={styles.stageEmoji}>{stage.emoji}</span>
        <span className={styles.stageLabel}>{stage.label}</span>
        <span className={styles.stageIndex}>STAGE {index + 1}</span>
      </div>
      <motion.div
        className={styles.stageHours}
        key={hours}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {stage.getUnit(hours)}
      </motion.div>
      <div className={styles.stageCompare}>{stage.getCompare(hours)}</div>
      {index === 3 && (
        <div className={styles.stageFinal}>
          😱 이 시간에 무엇을 할 수 있었을까요?
        </div>
      )}
    </motion.div>
  )
}

export default function Landing() {
  const [hours, setHours] = useState(4)
  const [inputVal, setInputVal] = useState('4')
  const navigate = useNavigate()
  const stagesRef = useRef(null)

  const handleSlider = (e) => {
    const val = Number(e.target.value)
    setHours(val)
    setInputVal(String(val))
  }

  const handleInput = (e) => {
    const raw = e.target.value
    setInputVal(raw)
    const num = parseFloat(raw)
    if (!isNaN(num) && num >= 0.5 && num <= 16) {
      setHours(num)
    }
  }

  const handleInputBlur = () => {
    const num = parseFloat(inputVal)
    if (isNaN(num) || num < 0.5) {
      setHours(0.5)
      setInputVal('0.5')
    } else if (num > 16) {
      setHours(16)
      setInputVal('16')
    } else {
      setHours(num)
      setInputVal(String(num))
    }
  }

  const scrollToStages = () => {
    stagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.badge}>당신의 시간을 직면하세요</div>
          <h1 className={styles.heroTitle}>
            스마트폰에<br />
            <span className={styles.heroAccent}>얼마나 많은 시간</span>을<br />
            쓰고 있나요?
          </h1>
          <p className={styles.heroDesc}>
            하루 사용 시간을 입력하면, 일주일·10년·평생으로 환산해드릴게요.
            <br />충격적인 숫자가 기다리고 있어요.
          </p>

          {/* Input Area */}
          <div className={styles.inputArea}>
            <div className={styles.inputLabel}>
              하루 평균 스크린타임
              <span className={styles.inputHint}>(한국 평균 약 5.2시간)</span>
            </div>
            <div className={styles.inputRow}>
              <input
                type="range"
                min="0.5"
                max="16"
                step="0.5"
                value={hours}
                onChange={handleSlider}
                className={styles.slider}
                style={{ '--value': hours }}
              />
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  min="0.5"
                  max="16"
                  step="0.5"
                  value={inputVal}
                  onChange={handleInput}
                  onBlur={handleInputBlur}
                  className={styles.numberInput}
                />
                <span className={styles.inputUnit}>시간</span>
              </div>
            </div>
            <div className={styles.sliderTicks}>
              <span>0.5h</span>
              <span>4h</span>
              <span>8h</span>
              <span>12h</span>
              <span>16h</span>
            </div>
          </div>

          <button className={`btn-primary ${styles.ctaBtn}`} onClick={scrollToStages}>
            충격 받을 준비 되셨나요? 👇
          </button>
        </motion.div>

        <div className={styles.heroGlow} />
      </section>

      {/* Stages Section */}
      <section className={styles.stages} ref={stagesRef}>
        <motion.div
          className={styles.stagesHeader}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.stagesTitle}>
            하루 <span style={{ color: 'var(--accent)' }}>{hours}시간</span>이
            쌓이면…
          </h2>
          <p className={styles.stagesDesc}>스크롤해서 현실을 직면하세요</p>
        </motion.div>

        <div className={styles.stagesGrid}>
          {STAGES.map((stage, i) => (
            <StageCard key={stage.id} stage={stage} hours={hours} index={i} />
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          className={styles.finalCta}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={styles.finalTitle}>아직 늦지 않았어요 🌱</h3>
          <p className={styles.finalDesc}>
            작은 습관 하나가 평생을 바꿉니다.<br />
            지금 바로 디지털 디톡스를 시작해보세요.
          </p>
          <div className={styles.finalBtns}>
            <button
              className="btn-primary"
              onClick={() => navigate('/checklist')}
            >
              디톡스 체크리스트 시작하기
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              다른 사람들 후기 보기
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
