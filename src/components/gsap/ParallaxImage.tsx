import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  scale?: boolean
}

// Parallax Image - gambar dengan efek parallax saat scroll
export function ParallaxImage({ 
  src, 
  alt, 
  className = '',
  speed = 0.5,
  direction = 'up',
  scale = false
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const image = imageRef.current
    if (!container || !image) return

    const getMovement = () => {
      switch (direction) {
        case 'up': return { y: `${speed * 100}%` }
        case 'down': return { y: `-${speed * 100}%` }
        case 'left': return { x: `${speed * 100}%` }
        case 'right': return { x: `-${speed * 100}%` }
        default: return { y: `${speed * 100}%` }
      }
    }

    const animation: gsap.TweenVars = {
      ...getMovement(),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }

    if (scale) {
      animation.scale = 1 + speed * 0.3
    }

    gsap.fromTo(image, 
      { 
        y: direction === 'up' ? `${speed * 50}%` : direction === 'down' ? `-${speed * 50}%` : 0,
        x: direction === 'left' ? `${speed * 50}%` : direction === 'right' ? `-${speed * 50}%` : 0,
        scale: scale ? 1 : undefined
      },
      animation
    )
  }, [speed, direction, scale])

  return (
    <div 
      ref={containerRef} 
      className={`overflow-hidden ${className}`}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover will-change-transform"
      />
    </div>
  )
}

// Parallax Container - container dengan multiple layers parallax
interface ParallaxLayer {
  children: React.ReactNode
  speed: number
  className?: string
}

interface ParallaxContainerProps {
  layers: ParallaxLayer[]
  className?: string
  height?: string
}

export function ParallaxContainer({ 
  layers,
  className = '',
  height = '100vh'
}: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    layersRef.current.forEach((layer, i) => {
      if (!layer) return
      const speed = layers[i]?.speed || 0.5

      gsap.to(layer, {
        y: `${speed * 30}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    })
  }, [layers])

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {layers.map((layer, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) layersRef.current[i] = el
          }}
          className={`absolute inset-0 will-change-transform ${layer.className || ''}`}
          style={{ zIndex: layers.length - i }}
        >
          {layer.children}
        </div>
      ))}
    </div>
  )
}

// Parallax Text - teks dengan efek parallax
interface ParallaxTextProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function ParallaxText({ 
  children, 
  className = '',
  speed = 0.3,
  direction = 'up'
}: ParallaxTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const text = textRef.current
    if (!text) return

    const getMovement = () => {
      switch (direction) {
        case 'up': return { y: `${speed * 100}px` }
        case 'down': return { y: `-${speed * 100}px` }
        case 'left': return { x: `${speed * 100}px` }
        case 'right': return { x: `-${speed * 100}px` }
        default: return { y: `${speed * 100}px` }
      }
    }

    gsap.fromTo(text, 
      { 
        y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
        x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0
      },
      {
        ...getMovement(),
        ease: 'none',
        scrollTrigger: {
          trigger: text,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    )
  }, [speed, direction])

  return (
    <div ref={textRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}

// Reveal Image - gambar yang terungkap dengan mask saat scroll
interface RevealImageProps {
  src: string
  alt: string
  className?: string
  revealDirection?: 'left' | 'right' | 'top' | 'bottom' | 'circle'
  duration?: number
}

export function RevealImage({ 
  src, 
  alt, 
  className = '',
  revealDirection = 'left',
  duration = 1.2
}: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const image = imageRef.current
    const overlay = overlayRef.current
    if (!container || !image || !overlay) return

    const getClipPath = () => {
      switch (revealDirection) {
        case 'left': return { clipPath: 'inset(0 100% 0 0)' }
        case 'right': return { clipPath: 'inset(0 0 0 100%)' }
        case 'top': return { clipPath: 'inset(100% 0 0 0)' }
        case 'bottom': return { clipPath: 'inset(0 0 100% 0)' }
        case 'circle': return { clipPath: 'circle(0% at 50% 50%)' }
        default: return { clipPath: 'inset(0 100% 0 0)' }
      }
    }

    const getFinalClipPath = () => {
      switch (revealDirection) {
        case 'circle': return { clipPath: 'circle(100% at 50% 50%)' }
        default: return { clipPath: 'inset(0 0% 0 0)' }
      }
    }

    // Set initial state
    gsap.set(image, getClipPath())

    // Animate reveal
    gsap.to(image, {
      ...getFinalClipPath(),
      duration,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })

    // Animate overlay
    gsap.to(overlay, {
      scaleX: 0,
      transformOrigin: revealDirection === 'left' ? 'right' : revealDirection === 'right' ? 'left' : 'center',
      scaleY: revealDirection === 'top' || revealDirection === 'bottom' ? 0 : 1,
      duration: duration * 0.8,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
  }, [revealDirection, duration])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-blue"
      />
    </div>
  )
}

// Zoom Image - gambar yang zoom saat scroll
interface ZoomImageProps {
  src: string
  alt: string
  className?: string
  startScale?: number
  endScale?: number
}

export function ZoomImage({ 
  src, 
  alt, 
  className = '',
  startScale = 1.2,
  endScale = 1
}: ZoomImageProps) {
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const image = imageRef.current
    if (!image) return

    gsap.fromTo(image, 
      { scale: startScale },
      {
        scale: endScale,
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    )
  }, [startScale, endScale])

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover will-change-transform"
      />
    </div>
  )
}
