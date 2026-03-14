import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

const PHOTOS = [
  {
    src: '/photos/img_4575.jpg',
    caption: 'Два волшебника нашли друг друга',
  },
  {
    src: '/photos/img_4570.jpg',
    caption: 'Каждый шаг рядом с тобой - как первый',
  },
  {
    src: '/photos/img_4565.jpg',
    caption: 'Навсегда',
  },
  {
    src: '/photos/img_2588.jpg',
    caption: 'Тот самый момент, когда все стало официально',
  },
  {
    src: '/photos/img_2612.jpg',
    caption: 'Мистер и миссис Кайгородовы',
  },
  {
    src: '/photos/img_4586.jpg',
    caption: 'За нас и за нашу сказку',
  },
  {
    src: '/photos/img_4593.jpg',
    caption: 'Моя королева',
  },
  {
    src: '/photos/img_4601.jpg',
    caption: 'Когда рядом с тобой - всегда весело',
  },
  {
    src: '/photos/img_4620.jpg',
    caption: 'Сладкая жизнь',
  },
  {
    src: '/photos/img_4614.jpg',
    caption: 'Наша большая семья',
  },
  {
    src: '/photos/img_0438.jpg',
    caption: 'Ты - настоящая художница жизни',
  },
  {
    src: '/photos/img_3301.jpg',
    caption: 'Всегда творишь волшебство',
  },
  {
    src: '/photos/img_3275.jpg',
    caption: 'Самые красивые глаза на свете',
  },
  {
    src: '/photos/alisa_baby.jpg',
    caption: 'Наше главное чудо - Алиса',
  },
]

function Sparkle({ style }) {
  return (
    <motion.div
      className="sparkle"
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 3
      }}
    >
      ✦
    </motion.div>
  )
}

function HeroScreen({ onStart }) {
  const sparkles = Array.from({ length: 25 }, (_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    fontSize: `${10 + Math.random() * 20}px`,
    color: ['#ffd700', '#ff69b4', '#fff', '#ffb6c1'][Math.floor(Math.random() * 4)]
  }))

  return (
    <motion.div
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-bg" />
      <div className="hero-sparkles">
        {sparkles.map((s, i) => <Sparkle key={i} style={s} />)}
      </div>

      <motion.div
        className="hero-content"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <motion.div
          className="hero-emoji"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎂
        </motion.div>

        <h1 className="hero-title">С Днём Рождения,</h1>
        <h1 className="hero-name">Лиза!</h1>

        <motion.p
          className="hero-age"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          21
        </motion.p>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Маленькая история большой любви
        </motion.p>

        <motion.button
          className="hero-button"
          onClick={onStart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Открыть ✨
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

function PhotoCard({ photo, index }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className="photo-card"
      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="photo-wrapper">
        <img src={photo.src} alt={photo.caption} loading="lazy" />
      </div>
      <motion.p
        className="photo-caption"
        initial={{ opacity: 0, y: 10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {photo.caption}
      </motion.p>
    </motion.div>
  )
}

function FinalMessage() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className="final-message"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
    >
      <div className="final-sparkles">
        {Array.from({ length: 15 }, (_, i) => (
          <Sparkle key={i} style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 16}px`,
            color: ['#ffd700', '#ff69b4', '#fff'][Math.floor(Math.random() * 3)]
          }} />
        ))}
      </div>

      <motion.div
        className="final-content"
        initial={{ y: 40 }}
        animate={isVisible ? { y: 0 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          className="final-heart"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          💖
        </motion.div>

        <h2>Лизонька</h2>

        <p>
          Ты - моя самая большая магия.
          Не та, что в книгах или на сцене.
          А та, от которой каждый день
          становится волшебным.
        </p>
        <p>
          Ты подарила мне Алису,
          самый красивый смех на свете
          и дом, куда всегда хочется возвращаться.
        </p>
        <p>
          В 21 ты уже мама, жена, художница
          и мой самый близкий человек.
          Я горжусь тобой каждый день.
        </p>
        <p className="final-signature">
          Люблю тебя бесконечно.
          <br />Твой волшебник 🧙‍♂️
        </p>

        <motion.div
          className="final-date"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          15 марта 2026
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function App() {
  const [started, setStarted] = useState(false)

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {!started ? (
          <HeroScreen key="hero" onStart={() => setStarted(true)} />
        ) : (
          <motion.div
            key="gallery"
            className="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="gallery-header">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Наша история
              </motion.h2>
              <motion.div
                className="gallery-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </div>

            <div className="photos-container">
              {PHOTOS.map((photo, i) => (
                <PhotoCard key={i} photo={photo} index={i} />
              ))}
            </div>

            <FinalMessage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
