import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollProgressProps {
  color?: string
  height?: number
  position?: 'top' | 'bottom'
  className?: string
}

// Scroll Progress Bar - indikator progress scroll
export function ScrollProgress({ 
  color = '#0084ff',
  height = 4,
  position = 'top',
  className = ''
}: ScrollProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const progress = progressRef.current
    if (!progress) return

    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    })
  }, [])

  return (
    <div
      className={`fixed left-0 right-0 z-[100] ${position === 'top' ? 'top-0' : 'bottom-0'} ${className}`}
      style={{ height }}
    >
      <div
        ref={progressRef}
        className="h-full origin-left"
        style={{ 
          backgroundColor: color,
          transform: 'scaleX(0)'
        }}
      />
    </div>
  )
}

// Circular Scroll Progress - versi lingkaran
interface CircularProgressProps {
  size?: number
  strokeWidth?: number
  color?: string
  bgColor?: string
  className?: string
}

export function CircularScrollProgress({ 
  size = 60,
  strokeWidth = 4,
  color = '#0084ff',
  bgColor = '#e1e1e1',
  className = ''
}: CircularProgressProps) {
  const circleRef = useRef<SVGCircleElement>(null)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI

  useEffect(() => {
    const circle = circleRef.current
    if (!circle) return

    gsap.to(circle, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    })
  }, [circumference])

  return (
    <div className={`fixed bottom-8 right-8 z-50 ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{ transition: 'stroke-dashoffset 0.1s' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-gray-600">↑</span>
      </div>
    </div>
  )
}

// Section Progress - progress untuk section tertentu
interface SectionProgressProps {
  sectionRef: React.RefObject<HTMLElement | null>
  color?: string
  height?: number
  className?: string
}

export function SectionProgress({ 
  sectionRef,
  color = '#0084ff',
  height = 4,
  className = ''
}: SectionProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const progress = progressRef.current
    if (!section || !progress) return

    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    })
  }, [sectionRef])

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 ${className}`}
      style={{ height }}
    >
      <div
        ref={progressRef}
        className="h-full origin-left"
        style={{ 
          backgroundColor: color,
          transform: 'scaleX(0)'
        }}
      />
    </div>
  )
}

// Reading Progress - untuk artikel/konten panjang
interface ReadingProgressProps {
  contentRef: React.RefObject<HTMLElement | null>
  color?: string
  height?: number
  className?: string
}

export function ReadingProgress({ 
  contentRef,
  color = '#0084ff',
  height = 4,
  className = ''
}: ReadingProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null)
  const percentageRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const content = contentRef.current
    const progress = progressRef.current
    const percentage = percentageRef.current
    if (!content || !progress) return

    ScrollTrigger.create({
      trigger: content,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.to(progress, {
          scaleX: self.progress,
          duration: 0.1,
          ease: 'none'
        })
        if (percentage) {
          percentage.textContent = `${Math.round(self.progress * 100)}%`
        }
      }
    })
  }, [contentRef])

  return (
    <div className={`fixed top-0 left-0 right-0 z-[100] ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm">
        <div className="flex-1" style={{ height }}>
          <div
            ref={progressRef}
            className="h-full origin-left rounded-full"
            style={{ 
              backgroundColor: color,
              transform: 'scaleX(0)'
            }}
          />
        </div>
        <span ref={percentageRef} className="text-xs font-medium text-gray-600 w-10 text-right">
          0%
        </span>
      </div>
    </div>
  )
}

// Dot Progress - indikator progress dengan dots
interface DotProgressProps {
  sections: string[]
  activeColor?: string
  inactiveColor?: string
  size?: number
  className?: string
  onDotClick?: (index: number) => void
}

export function DotProgress({ 
  sections,
  activeColor = '#0084ff',
  inactiveColor = '#e1e1e1',
  size = 12,
  className = '',
  onDotClick
}: DotProgressProps) {
  const dotsRef = useRef<HTMLDivElement[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    sections.forEach((_, i) => {
      ScrollTrigger.create({
        trigger: `[data-section="${sections[i]}"]`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i)
      })
    })
  }, [sections])

  useEffect(() => {
    dotsRef.current.forEach((dot, i) => {
      if (!dot) return
      gsap.to(dot, {
        scale: i === activeIndex ? 1.5 : 1,
        backgroundColor: i === activeIndex ? activeColor : inactiveColor,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  }, [activeIndex, activeColor, inactiveColor])

  return (
    <div className={`fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 ${className}`}>
      {sections.map((section, i) => (
        <div
          key={section}
          ref={(el) => {
            if (el) dotsRef.current[i] = el
          }}
          className="rounded-full cursor-pointer transition-all duration-300 hover:scale-125"
          style={{
            width: size,
            height: size,
            backgroundColor: i === 0 ? activeColor : inactiveColor
          }}
          onClick={() => onDotClick?.(i)}
          title={section}
        />
      ))}
    </div>
  )
}

import { useState } from 'react'
