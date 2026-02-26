import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface Card3DProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
  width?: string
  height?: string
  flipOnHover?: boolean
  flipOnClick?: boolean
}

// 3D Card Flip - kartu yang bisa flip 3D
export function Card3D({ 
  front, 
  back, 
  className = '',
  width = '300px',
  height = '400px',
  flipOnHover = true,
  flipOnClick = false
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    const inner = innerRef.current
    if (!card || !inner) return

    const handleMouseEnter = () => {
      if (flipOnHover) {
        gsap.to(inner, {
          rotationY: 180,
          duration: 0.6,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseLeave = () => {
      if (flipOnHover) {
        gsap.to(inner, {
          rotationY: 0,
          duration: 0.6,
          ease: 'power2.out'
        })
      }
    }

    const handleClick = () => {
      if (flipOnClick) {
        setIsFlipped(!isFlipped)
        gsap.to(inner, {
          rotationY: isFlipped ? 0 : 180,
          duration: 0.6,
          ease: 'power2.out'
        })
      }
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)
    card.addEventListener('click', handleClick)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
      card.removeEventListener('click', handleClick)
    }
  }, [flipOnHover, flipOnClick, isFlipped])

  return (
    <div
      ref={cardRef}
      className={`perspective-1000 ${className}`}
      style={{ 
        width, 
        height,
        perspective: '1000px',
        cursor: flipOnClick ? 'pointer' : 'default'
      }}
    >
      <div
        ref={innerRef}
        className="relative w-full h-full"
        style={{ 
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s'
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {front}
        </div>
        
        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {back}
        </div>
      </div>
    </div>
  )
}

// Tilt Card - kartu yang tilt mengikuti kursor
interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  scale?: number
  perspective?: number
  glareEnable?: boolean
}

export function TiltCard({ 
  children, 
  className = '',
  maxTilt = 15,
  scale = 1.02,
  perspective = 1000,
  glareEnable = true
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glare = glareRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY
      
      const rotateX = (mouseY / (rect.height / 2)) * -maxTilt
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        scale: scale,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: perspective
      })

      if (glare && glareEnable) {
        const glareX = ((e.clientX - rect.left) / rect.width) * 100
        const glareY = ((e.clientY - rect.top) / rect.height) * 100
        
        gsap.to(glare, {
          x: `${glareX}%`,
          y: `${glareY}%`,
          opacity: 0.3,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      })

      if (glare) {
        gsap.to(glare, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [maxTilt, scale, perspective, glareEnable])

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      {glareEnable && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none opacity-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)',
            transform: 'translate(-50%, -50%)',
            width: '200%',
            height: '200%'
          }}
        />
      )}
    </div>
  )
}

// Stacked Cards - kartu yang ditumpuk dengan efek scroll
interface StackedCardsProps {
  cards: React.ReactNode[]
  className?: string
  cardHeight?: string
}

export function StackedCards({ 
  cards,
  className = '',
  cardHeight = '400px'
}: StackedCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    cardsRef.current.forEach((card, i) => {
      if (!card) return

      gsap.to(card, {
        y: -i * 20,
        scale: 1 - i * 0.05,
        opacity: 1 - i * 0.2,
        scrollTrigger: {
          trigger: container,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      })
    })
  }, [cards.length])

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: cardHeight }}>
      {cards.map((card, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) cardsRef.current[i] = el
          }}
          className="absolute inset-0"
          style={{ zIndex: cards.length - i }}
        >
          {card}
        </div>
      ))}
    </div>
  )
}

// Hover Expand Card - kartu yang expand saat hover
interface HoverExpandCardProps {
  children: React.ReactNode
  className?: string
  expandScale?: number
}

export function HoverExpandCard({ 
  children, 
  className = '',
  expandScale = 1.05
}: HoverExpandCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: expandScale,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [expandScale])

  return (
    <div ref={cardRef} className={`transition-transform ${className}`}>
      {children}
    </div>
  )
}

// Accordion Card - kartu accordion horizontal
interface AccordionCardProps {
  items: { title: string; content: React.ReactNode; icon?: React.ReactNode }[]
  className?: string
  height?: string
}

export function AccordionCard({ 
  items,
  className = '',
  height = '400px'
}: AccordionCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const items = itemsRef.current
    if (items.length === 0) return

    items.forEach((item) => {
      if (!item) return

      item.addEventListener('mouseenter', () => {
        items.forEach((otherItem) => {
          if (!otherItem) return
          gsap.to(otherItem, {
            flex: otherItem === item ? 4 : 1,
            duration: 0.5,
            ease: 'expo.out'
          })
        })
      })
    })

    containerRef.current?.addEventListener('mouseleave', () => {
      items.forEach((item) => {
        if (!item) return
        gsap.to(item, {
          flex: 1,
          duration: 0.5,
          ease: 'expo.out'
        })
      })
    })
  }, [items.length])

  return (
    <div 
      ref={containerRef}
      className={`flex gap-2 ${className}`}
      style={{ height }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) itemsRef.current[i] = el
          }}
          className="flex-1 bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border border-gray-100 hover:border-blue-200"
        >
          <div className="p-6 h-full flex flex-col">
            {item.icon && (
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
                {item.icon}
              </div>
            )}
            <h3 className="text-lg font-bold mb-2 writing-mode-vertical md:writing-mode-horizontal">
              {item.title}
            </h3>
            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex-1">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
