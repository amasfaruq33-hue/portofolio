import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface TextScrambleProps {
  text: string
  className?: string
  triggerOnHover?: boolean
}

// Text Scramble Effect - efek teks seperti hacker/matrix
export function TextScramble({ 
  text, 
  className = '', 
  triggerOnHover = true
}: TextScrambleProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const originalText = useRef(text)
  const chars = '!<>-_\\/[]{}—=+*^?#________'

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let interval: ReturnType<typeof setInterval> | null = null
    let iteration = 0

    const scramble = () => {
      const targetText = originalText.current
      
      if (interval) clearInterval(interval)
      
      interval = setInterval(() => {
        element.innerText = targetText
          .split('')
          .map((_, index) => {
            if (index < iteration) {
              return targetText[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')

        if (iteration >= targetText.length) {
          if (interval) clearInterval(interval)
        }

        iteration += 1 / 3
      }, 30)
    }

    if (triggerOnHover) {
      const handleMouseEnter = () => {
        iteration = 0
        scramble()
      }

      element.addEventListener('mouseenter', handleMouseEnter)
      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        if (interval) clearInterval(interval)
      }
    } else {
      // Auto trigger on mount
      scramble()
      return () => {
        if (interval) clearInterval(interval)
      }
    }
  }, [triggerOnHover])

  return (
    <span ref={elementRef} className={className}>
      {text}
    </span>
  )
}

// Text Reveal on Scroll - teks yang terungkap saat scroll
export function TextReveal({ 
  children, 
  className = '' 
}: { 
  children: string
  className?: string 
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const words = container.querySelectorAll('.word')
    
    gsap.fromTo(words, 
      { 
        y: 50, 
        opacity: 0,
        rotateX: -90
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [])

  const words = children.split(' ')

  return (
    <div ref={containerRef} className={className} style={{ perspective: '1000px' }}>
      {words.map((word, i) => (
        <span 
          key={i} 
          className="word inline-block mr-[0.25em]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {word}
        </span>
      ))}
    </div>
  )
}

// Split Text Animation - animasi per huruf
export function SplitText({ 
  text, 
  className = '',
  animation = 'wave'
}: { 
  text: string
  className?: string
  animation?: 'wave' | 'bounce' | 'fade' | 'rotate'
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chars = container.querySelectorAll('.char')
    
    const animations: Record<string, gsap.TweenVars> = {
      wave: { y: -20, ease: 'sine.inOut', yoyo: true, repeat: -1 },
      bounce: { y: -15, ease: 'bounce.out', yoyo: true, repeat: -1 },
      fade: { opacity: 0.3, ease: 'power2.inOut', yoyo: true, repeat: -1 },
      rotate: { rotation: 10, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    }

    gsap.to(chars, {
      ...animations[animation],
      duration: 0.6,
      stagger: {
        each: 0.05,
        from: 'start'
      },
      delay: (i) => i * 0.02
    })
  }, [animation])

  return (
    <div ref={containerRef} className={className}>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="char inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}

// Typewriter Effect - efek mengetik
export function Typewriter({ 
  texts, 
  className = '',
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000
}: { 
  texts: string[]
  className?: string
  speed?: number
  deleteSpeed?: number
  pauseDuration?: number
}) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const currentIndex = useRef(0)
  const currentText = useRef('')
  const isDeleting = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let timeout: ReturnType<typeof setTimeout> | null = null

    const type = () => {
      const fullText = texts[currentIndex.current]
      
      if (isDeleting.current) {
        currentText.current = fullText.substring(0, currentText.current.length - 1)
      } else {
        currentText.current = fullText.substring(0, currentText.current.length + 1)
      }

      element.innerText = currentText.current

      let typeSpeed = isDeleting.current ? deleteSpeed : speed

      if (!isDeleting.current && currentText.current === fullText) {
        typeSpeed = pauseDuration
        isDeleting.current = true
      } else if (isDeleting.current && currentText.current === '') {
        isDeleting.current = false
        currentIndex.current = (currentIndex.current + 1) % texts.length
        typeSpeed = 500
      }

      timeout = setTimeout(type, typeSpeed)
    }

    type()

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [texts, speed, deleteSpeed, pauseDuration])

  return (
    <span className={className}>
      <span ref={elementRef} />
      <span className="animate-pulse">|</span>
    </span>
  )
}
