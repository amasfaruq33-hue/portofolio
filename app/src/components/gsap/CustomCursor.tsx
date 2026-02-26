import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface CustomCursorProps {
  color?: string
  size?: number
  hoverScale?: number
  blendMode?: 'difference' | 'normal' | 'exclusion'
}

// Custom Cursor - kursor custom yang mengikuti mouse
export function CustomCursor({ 
  color = '#0084ff',
  size = 20,
  hoverScale = 2,
  blendMode = 'difference'
}: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState('')

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    const handleMouseMove = (e: MouseEvent) => {
      // Fast, responsive cursor
      gsap.to(cursor, {
        x: e.clientX - size / 2,
        y: e.clientY - size / 2,
        duration: 0.08,
        ease: 'power2.out'
      })

      gsap.to(cursorDot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.05,
        ease: 'power2.out'
      })
    }

    // Handle hover on interactive elements
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      const cursorTextAttr = target.getAttribute('data-cursor-text')
      
      setIsHovering(true)
      if (cursorTextAttr) {
        setCursorText(cursorTextAttr)
      }

      gsap.to(cursor, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorText('')

      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', handleMouseMove)

    // Hide default cursor
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      document.body.style.cursor = 'auto'
    }
  }, [size, hoverScale])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
        style={{
          width: size,
          height: size,
          border: `2px solid ${color}`,
          borderRadius: '50%',
          mixBlendMode: blendMode
        }}
      >
        {cursorText && (
          <span className="text-xs font-medium text-white whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: 8,
          height: 8,
          backgroundColor: color,
          borderRadius: '50%',
          mixBlendMode: blendMode
        }}
      />

      {/* Global cursor styles */}
      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}

// Cursor Follower - elemen yang mengikuti kursor dengan delay
interface CursorFollowerProps {
  children: React.ReactNode
  className?: string
  lag?: number
}

export function CursorFollower({ 
  children, 
  className = '',
  lag = 0.1 
}: CursorFollowerProps) {
  const followerRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const follower = followerRef.current
    if (!follower) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      gsap.to(follower, {
        x: mousePos.current.x,
        y: mousePos.current.y,
        duration: lag,
        ease: 'power2.out'
      })
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    const animationFrame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [lag])

  return (
    <div
      ref={followerRef}
      className={`fixed top-0 left-0 pointer-events-none z-50 ${className}`}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      {children}
    </div>
  )
}

// Spotlight Cursor - efek spotlight yang mengikuti kursor
interface SpotlightCursorProps {
  size?: number
  color?: string
  opacity?: number
}

export function SpotlightCursor({ 
  size = 300,
  color = '#0084ff',
  opacity = 0.15
}: SpotlightCursorProps) {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spotlight = spotlightRef.current
    if (!spotlight) return

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(spotlight, {
        x: e.clientX - size / 2,
        y: e.clientY - size / 2,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [size])

  return (
    <div
      ref={spotlightRef}
      className="fixed top-0 left-0 pointer-events-none z-0 hidden md:block"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        borderRadius: '50%',
        filter: 'blur(40px)'
      }}
    />
  )
}

// Trail Cursor - jejak kursor yang mengikuti
interface TrailCursorProps {
  count?: number
  color?: string
  size?: number
}

export function TrailCursor({ 
  count = 5,
  color = '#0084ff',
  size = 10
}: TrailCursorProps) {
  const trailsRef = useRef<HTMLDivElement[]>([])
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const trails = trailsRef.current
    if (trails.length === 0) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      trails.forEach((trail, i) => {
        if (!trail) return
        const delay = (i + 1) * 0.05
        
        gsap.to(trail, {
          x: mousePos.current.x - size / 2,
          y: mousePos.current.y - size / 2,
          duration: 0.3 + delay,
          ease: 'power2.out',
          opacity: 1 - (i / count)
        })
      })
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    const animationFrame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [count, size])

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailsRef.current[i] = el
          }}
          className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
          style={{
            width: size - i,
            height: size - i,
            backgroundColor: color,
            borderRadius: '50%',
            opacity: 0
          }}
        />
      ))}
    </>
  )
}
