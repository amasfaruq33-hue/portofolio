import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate'
  duration?: number
  start?: string
}

// Stagger Container - container untuk animasi stagger pada children
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  animation = 'fadeUp',
  duration = 0.8,
  start = 'top 80%'
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.children
    if (items.length === 0) return

    const animations: Record<string, gsap.TweenVars> = {
      fadeUp: { y: 50, opacity: 0 },
      fadeDown: { y: -50, opacity: 0 },
      fadeLeft: { x: 50, opacity: 0 },
      fadeRight: { x: -50, opacity: 0 },
      scale: { scale: 0.8, opacity: 0 },
      rotate: { rotation: -10, opacity: 0, transformOrigin: 'center' }
    }

    const fromState = animations[animation]

    gsap.fromTo(items,
      fromState,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration,
        stagger: staggerDelay,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: 'play none none none'
        }
      }
    )
  }, [staggerDelay, animation, duration, start])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

// Stagger Grid - grid dengan animasi stagger
interface StaggerGridProps {
  items: React.ReactNode[]
  className?: string
  columns?: number
  staggerDelay?: number
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate'
}

export function StaggerGrid({
  items,
  className = '',
  columns = 3,
  staggerDelay = 0.1,
  animation = 'fadeUp'
}: StaggerGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const gridItems = grid.children

    const animations: Record<string, gsap.TweenVars> = {
      fadeUp: { y: 50, opacity: 0 },
      fadeDown: { y: -50, opacity: 0 },
      fadeLeft: { x: 50, opacity: 0 },
      fadeRight: { x: -50, opacity: 0 },
      scale: { scale: 0.8, opacity: 0 },
      rotate: { rotation: -10, opacity: 0 }
    }

    const fromState = animations[animation]

    gsap.fromTo(gridItems,
      fromState,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        stagger: {
          each: staggerDelay,
          from: 'start',
          grid: [Math.ceil(items.length / columns), columns]
        },
        ease: 'expo.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [items.length, columns, staggerDelay, animation])

  return (
    <div
      ref={gridRef}
      className={`grid gap-6 ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {items}
    </div>
  )
}

// Cascade Animation - animasi cascade/wave
interface CascadeAnimationProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  waveIntensity?: number
}

export function CascadeAnimation({
  children,
  className = '',
  direction = 'up',
  waveIntensity = 30
}: CascadeAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.children

    const getFromState = () => {
      switch (direction) {
        case 'up': return { y: waveIntensity, opacity: 0 }
        case 'down': return { y: -waveIntensity, opacity: 0 }
        case 'left': return { x: waveIntensity, opacity: 0 }
        case 'right': return { x: -waveIntensity, opacity: 0 }
        default: return { y: waveIntensity, opacity: 0 }
      }
    }

    gsap.fromTo(items,
      getFromState(),
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: {
          each: 0.05,
          from: 'edges'
        },
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [direction, waveIntensity])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

// Flip Animation - animasi flip pada scroll
interface FlipAnimationProps {
  children: React.ReactNode
  className?: string
  axis?: 'x' | 'y'
}

export function FlipAnimation({
  children,
  className = '',
  axis = 'y'
}: FlipAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    gsap.fromTo(element,
      {
        rotationX: axis === 'x' ? -90 : 0,
        rotationY: axis === 'y' ? -90 : 0,
        opacity: 0,
        transformPerspective: 1000
      },
      {
        rotationX: 0,
        rotationY: 0,
        opacity: 1,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [axis])

  return (
    <div ref={elementRef} className={className} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}

// Bounce In - animasi bounce saat muncul
interface BounceInProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function BounceIn({
  children,
  className = '',
  delay = 0
}: BounceInProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    gsap.fromTo(element,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [delay])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Slide In - animasi slide dari berbagai arah
interface SlideInProps {
  children: React.ReactNode
  className?: string
  direction?: 'left' | 'right' | 'top' | 'bottom'
  distance?: number
  duration?: number
}

export function SlideIn({
  children,
  className = '',
  direction = 'left',
  distance = 100,
  duration = 0.8
}: SlideInProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const getFromState = () => {
      switch (direction) {
        case 'left': return { x: -distance, opacity: 0 }
        case 'right': return { x: distance, opacity: 0 }
        case 'top': return { y: -distance, opacity: 0 }
        case 'bottom': return { y: distance, opacity: 0 }
        default: return { x: -distance, opacity: 0 }
      }
    }

    gsap.fromTo(element,
      getFromState(),
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [direction, distance, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Mask Reveal - animasi reveal dengan mask
interface MaskRevealProps {
  children: React.ReactNode
  className?: string
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'circle'
  duration?: number
}

export function MaskReveal({
  children,
  className = '',
  direction = 'left',
  duration = 1
}: MaskRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const getClipPath = () => {
      switch (direction) {
        case 'left': return 'inset(0 100% 0 0)'
        case 'right': return 'inset(0 0 0 100%)'
        case 'top': return 'inset(100% 0 0 0)'
        case 'bottom': return 'inset(0 0 100% 0)'
        case 'circle': return 'circle(0% at 50% 50%)'
        default: return 'inset(0 100% 0 0)'
      }
    }

    const getFinalClipPath = () => {
      switch (direction) {
        case 'circle': return 'circle(100% at 50% 50%)'
        default: return 'inset(0 0% 0 0)'
      }
    }

    gsap.fromTo(element,
      { clipPath: getClipPath() },
      {
        clipPath: getFinalClipPath(),
        duration,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [direction, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Counter Animation - animasi angka counting
interface CounterAnimationProps {
  end: number
  className?: string
  duration?: number
  prefix?: string
  suffix?: string
}

export function CounterAnimation({
  end,
  className = '',
  duration = 2,
  prefix = '',
  suffix = ''
}: CounterAnimationProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const obj = { value: 0 }

    gsap.to(obj, {
      value: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`
      }
    })
  }, [end, duration, prefix, suffix])

  return (
    <span ref={elementRef} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
