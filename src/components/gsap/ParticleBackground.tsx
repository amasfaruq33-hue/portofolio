import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

interface ParticleBackgroundProps {
  particleCount?: number
  particleColor?: string
  particleSize?: number
  connectionDistance?: number
  connectionColor?: string
  speed?: number
  className?: string
}

// Particle Background - background partikel yang bergerak dan terhubung
export function ParticleBackground({
  particleCount = 50,
  particleColor = '#0084ff',
  particleSize = 3,
  connectionDistance = 150,
  connectionColor = 'rgba(0, 132, 255, 0.2)',
  speed = 0.5,
  className = ''
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
  }>>([])
  const animationRef = useRef<number | null>(null)

  const initParticles = useCallback((width: number, height: number) => {
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * particleSize + 1
    }))
  }, [particleCount, particleSize, speed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas.width, canvas.height)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = connectionColor
            ctx.lineWidth = 1 - distance / connectionDistance
            ctx.stroke()
          }
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initParticles, particleColor, connectionColor, connectionDistance])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  )
}

// Floating Particles - partikel yang melayang dengan mouse interaction
interface FloatingParticlesProps {
  particleCount?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
  className?: string
}

export function FloatingParticles({
  particleCount = 20,
  colors = ['#0084ff', '#0044ff', '#00c6ff', '#0072ff'],
  minSize = 5,
  maxSize = 15,
  className = ''
}: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    particlesRef.current.forEach((particle, i) => {
      if (!particle) return

      // Random initial position
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5
      })

      // Floating animation
      gsap.to(particle, {
        y: '+=50',
        x: '+=30',
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2
      })

      // Opacity pulse
      gsap.to(particle, {
        opacity: 0.3,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3
      })
    })

    // Mouse repulsion
    const handleMouseMove = (e: MouseEvent) => {
      particlesRef.current.forEach((particle) => {
        if (!particle) return

        const rect = particle.getBoundingClientRect()
        const particleX = rect.left + rect.width / 2
        const particleY = rect.top + rect.height / 2

        const dx = particleX - e.clientX
        const dy = particleY - e.clientY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const force = (150 - distance) / 150
          gsap.to(particle, {
            x: `+=${dx * force * 0.3}`,
            y: `+=${dy * force * 0.3}`,
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      {Array.from({ length: particleCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) particlesRef.current[i] = el
          }}
          className="absolute rounded-full blur-sm"
          style={{
            width: Math.random() * (maxSize - minSize) + minSize,
            height: Math.random() * (maxSize - minSize) + minSize,
            backgroundColor: colors[i % colors.length],
            opacity: 0.6
          }}
        />
      ))}
    </div>
  )
}

// Constellation Background - background seperti konstelasi bintang
interface ConstellationBackgroundProps {
  starCount?: number
  starColor?: string
  lineColor?: string
  className?: string
}

export function ConstellationBackground({
  starCount = 100,
  starColor = '#ffffff',
  lineColor = 'rgba(255, 255, 255, 0.1)',
  className = ''
}: ConstellationBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Array<{
    x: number
    y: number
    size: number
    opacity: number
    twinkleSpeed: number
  }>>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.01
      }))
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const stars = starsRef.current
      const mouse = mouseRef.current

      stars.forEach((star, i) => {
        // Twinkle effect
        star.opacity += star.twinkleSpeed
        if (star.opacity > 1 || star.opacity < 0.2) {
          star.twinkleSpeed *= -1
        }

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = starColor
        ctx.globalAlpha = star.opacity
        ctx.fill()
        ctx.globalAlpha = 1

        // Connect to nearby stars
        for (let j = i + 1; j < stars.length; j++) {
          const other = stars[j]
          const dx = star.x - other.x
          const dy = star.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(star.x, star.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Connect to mouse
        const dx = star.x - mouse.x
        const dy = star.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          ctx.beginPath()
          ctx.moveTo(star.x, star.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = lineColor
          ctx.lineWidth = 1 - distance / 150
          ctx.stroke()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [starCount, starColor, lineColor])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  )
}

// Gradient Orbs - orbs gradient yang melayang
interface GradientOrbsProps {
  orbCount?: number
  colors?: string[][]
  minSize?: number
  maxSize?: number
  className?: string
}

export function GradientOrbs({
  orbCount = 5,
  colors = [
    ['#0084ff', '#0044ff'],
    ['#00c6ff', '#0072ff'],
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe']
  ],
  minSize = 200,
  maxSize = 500,
  className = ''
}: GradientOrbsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const orbsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    orbsRef.current.forEach((orb, i) => {
      if (!orb) return

      // Random initial position
      gsap.set(orb, {
        x: Math.random() * (window.innerWidth - 300),
        y: Math.random() * (window.innerHeight - 300)
      })

      // Floating animation
      gsap.to(orb, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: 10 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // Scale animation
      gsap.to(orb, {
        scale: 1.2,
        duration: 8 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.5
      })
    })
  }, [])

  return (
    <div ref={containerRef} className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      {Array.from({ length: orbCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) orbsRef.current[i] = el
          }}
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            width: Math.random() * (maxSize - minSize) + minSize,
            height: Math.random() * (maxSize - minSize) + minSize,
            background: `linear-gradient(135deg, ${colors[i % colors.length][0]} 0%, ${colors[i % colors.length][1]} 100%)`
          }}
        />
      ))}
    </div>
  )
}

// Noise Texture - tekstur noise overlay
interface NoiseTextureProps {
  opacity?: number
  className?: string
}

export function NoiseTexture({
  opacity = 0.03,
  className = ''
}: NoiseTextureProps) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] ${className}`}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }}
    />
  )
}
