import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
}

// Magnetic Button - tombol yang mengikuti kursor
export function MagneticButton({ 
  children, 
  className = '', 
  strength = 0.5,
  onClick
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    const content = contentRef.current
    if (!button || !content) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out'
      })

      gsap.to(content, {
        x: deltaX * 0.5,
        y: deltaY * 0.5,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      })

      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return (
    <button
      ref={buttonRef}
      className={`magnetic-btn ${className}`}
      onClick={onClick}
    >
      <span ref={contentRef} className="inline-block">
        {children}
      </span>
    </button>
  )
}

// Magnetic Element - versi untuk div/element lain
interface MagneticElementProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticElement({ 
  children, 
  className = '', 
  strength = 0.3 
}: MagneticElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Ripple Button - tombol dengan efek ripple saat diklik
interface RippleButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  rippleColor?: string
}

export function RippleButton({ 
  children, 
  className = '', 
  onClick,
  rippleColor = 'rgba(255, 255, 255, 0.5)'
}: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = document.createElement('span')
    ripple.style.cssText = `
      position: absolute;
      background: ${rippleColor};
      border-radius: 50%;
      transform: scale(0);
      pointer-events: none;
      width: 100px;
      height: 100px;
      left: ${x - 50}px;
      top: ${y - 50}px;
    `

    button.appendChild(ripple)

    gsap.to(ripple, {
      scale: 4,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove()
    })

    onClick?.()
  }

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

// Glow Button - tombol dengan efek glow yang mengikuti kursor
interface GlowButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  glowColor?: string
}

export function GlowButton({ 
  children, 
  className = '', 
  onClick,
  glowColor = '#0084ff'
}: GlowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    const glow = glowRef.current
    if (!button || !glow) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(glow, {
        x: x - 100,
        y: y - 100,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
    >
      <div
        ref={glowRef}
        className="absolute w-[200px] h-[200px] rounded-full opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)`
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  )
}
