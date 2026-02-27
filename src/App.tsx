import { useEffect, useRef, useState } from 'react'
import { 
  Code, Palette, Smartphone, Mail, MapPin, Phone, 
  Github, Linkedin, Twitter, Instagram, ExternalLink,
  Send, ChevronDown, Menu, X, Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { toast } from 'sonner'
import './App.css'

// GSAP imports
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP Components
import {
  CustomCursor,
  ScrollProgress,
  MagneticButton,
  TextScramble,
  TiltCard,
  CounterAnimation,
  StaggerContainer,
  SlideIn,
  MaskReveal,
  GradientOrbs,
  NoiseTexture
} from '@/components/gsap'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  
  const heroImageRef = useRef<HTMLImageElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)

  // Projects data
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Platform e-commerce lengkap dengan sistem pembayaran, manajemen inventori, dan dashboard analitik real-time. Dibangun dengan React dan Node.js.',
      image: '/project-1.jpg',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      link: '#'
    },
    {
      id: 2,
      title: 'Portfolio Generator',
      description: 'Aplikasi web untuk membuat portfolio profesional dengan template yang dapat dikustomisasi. Fitur drag-and-drop dan live preview.',
      image: '/project-2.jpg',
      tags: ['Next.js', 'Tailwind', 'Prisma', 'PostgreSQL'],
      link: '#'
    },
    {
      id: 3,
      title: 'Task Manager Pro',
      description: 'Aplikasi manajemen tugas dengan fitur kolaborasi tim, tracking progress, dan integrasi kalender. Mendukung metode Kanban dan Scrum.',
      image: '/project-3.jpg',
      tags: ['Vue.js', 'Firebase', 'TypeScript', 'Pinia'],
      link: '#'
    },
    {
      id: 4,
      title: 'Social Dashboard',
      description: 'Dashboard analitik untuk media sosial dengan visualisasi data interaktif, reporting otomatis, dan insights berbasis AI.',
      image: '/project-4.jpg',
      tags: ['React', 'D3.js', 'Python', 'FastAPI'],
      link: '#'
    }
  ]

  // Skills data
  const skills = [
    { name: 'JavaScript', level: 90, category: 'Frontend' },
    { name: 'React', level: 85, category: 'Frontend' },
    { name: 'TypeScript', level: 80, category: 'Frontend' },
    { name: 'Node.js', level: 75, category: 'Backend' },
    { name: 'Python', level: 70, category: 'Backend' },
    { name: 'HTML/CSS', level: 95, category: 'Frontend' },
    { name: 'Tailwind', level: 90, category: 'Frontend' },
    { name: 'Git', level: 85, category: 'Tools' },
    { name: 'MongoDB', level: 70, category: 'Database' },
    { name: 'MySQL', level: 75, category: 'Database' },
    { name: 'Figma', level: 80, category: 'Design' },
    { name: 'Next.js', level: 78, category: 'Frontend' }
  ]

  // Services data
  const services = [
    {
      icon: <Code className="w-10 h-10" />,
      title: 'Web Development',
      description: 'Membangun website modern, responsif, dan performant menggunakan teknologi terbaru seperti React, Next.js, dan Node.js.'
    },
    {
      icon: <Palette className="w-10 h-10" />,
      title: 'UI/UX Design',
      description: 'Mendesain antarmuka yang intuitif dan menarik dengan fokus pada pengalaman pengguna yang optimal.'
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: 'Mobile Apps',
      description: 'Mengembangkan aplikasi mobile cross-platform dengan React Native untuk iOS dan Android.'
    }
  ]

  useEffect(() => {
    // Scroll handler for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Hero animations
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo('.hero-title span', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: 'expo.out', delay: 0.2 }
      )
      
      gsap.fromTo('.hero-subtitle',
        { opacity: 0, filter: 'blur(10px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out', delay: 0.6 }
      )
      
      gsap.fromTo('.hero-cta',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.8 }
      )
      
      gsap.fromTo(heroImageRef.current,
        { z: -500, rotateY: 45, opacity: 0 },
        { z: 0, rotateY: 0, opacity: 1, duration: 1.4, ease: 'expo.out' }
      )

      // Scroll animations for sections
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.fromTo(section,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // Stats counter animation
      gsap.utils.toArray<HTMLElement>('.stat-item').forEach((stat, i) => {
        gsap.fromTo(stat,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // Skills animation
      gsap.utils.toArray<HTMLElement>('.skill-bar').forEach((bar, i) => {
        const level = bar.dataset.level
        gsap.fromTo(bar.querySelector('.skill-progress'),
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1.2,
            delay: i * 0.05,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // Project cards animation
      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      ctx.revert()
    }
  }, [])

  // Mouse move effect for hero image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroImageRef.current) return
      
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const xPercent = (clientX / innerWidth - 0.5) * 2
      const yPercent = (clientY / innerHeight - 0.5) * 2
      
      gsap.to(heroImageRef.current, {
        rotateY: xPercent * 10,
        rotateX: -yPercent * 10,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Pesan berhasil dikirim! Saya akan menghubungi Anda segera.')
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* GSAP Components */}
      <CustomCursor color="#0084ff" size={24} hoverScale={1.5} />
      <ScrollProgress color="#0084ff" height={4} position="top" />
      <GradientOrbs orbCount={4} className="opacity-50" />
      <NoiseTexture opacity={0.03} />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-blur bg-white/80 py-4 shadow-lg' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold font-['Poppins'] text-gradient">
            <TextScramble text="Portfolio" triggerOnHover={true} />
          </a>
          
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Beranda', ref: heroRef },
              { label: 'Tentang', ref: aboutRef },
              { label: 'Layanan', ref: servicesRef },
              { label: 'Proyek', ref: projectsRef },
              { label: 'Keahlian', ref: skillsRef },
              { label: 'Kontak', ref: contactRef }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.ref)}
                className="text-sm font-medium text-gray-700 hover:text-[#0084ff] transition-colors"
                data-cursor-hover
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4">
            {[
              { label: 'Beranda', ref: heroRef },
              { label: 'Tentang', ref: aboutRef },
              { label: 'Layanan', ref: servicesRef },
              { label: 'Proyek', ref: projectsRef },
              { label: 'Keahlian', ref: skillsRef },
              { label: 'Kontak', ref: contactRef }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.ref)}
                className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-100 to-blue-50 opacity-60 blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-100 to-cyan-50 opacity-40 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div ref={heroTextRef} className="order-2 lg:order-1">
            <div className="hero-title overflow-hidden">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-['Poppins'] leading-tight">
                {'Building Digital'.split('').map((char, i) => (
                  <span key={i} className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
                ))}
                <br />
                <span className="text-gradient">{'Experiences'.split('').map((char, i) => (
                  <span key={i} className="inline-block">{char}</span>
                ))}</span>
              </h1>
            </div>
            
            <p className="hero-subtitle mt-6 text-lg md:text-xl text-gray-600 max-w-lg">
              Siswa SMK jurusan Rekayasa Perangkat Lunak yang passionate dalam membangun solusi web modern dengan kode yang bersih dan desain yang menarik.
            </p>
            
            <div className="hero-cta mt-8 flex flex-wrap gap-4">
              <MagneticButton 
                onClick={() => scrollToSection(projectsRef)}
                className="btn-primary flex items-center gap-2"
                strength={0.3}
              >
                Lihat Proyek <ChevronDown className="w-5 h-5" />
              </MagneticButton>
              <MagneticButton 
                onClick={() => scrollToSection(contactRef)}
                className="px-8 py-4 border-2 border-[#0084ff] text-[#0084ff] font-semibold rounded-full hover:bg-[#0084ff] hover:text-white transition-all duration-300 flex items-center gap-2"
                strength={0.3}
              >
                <Mail className="w-5 h-5" /> Hubungi Saya
              </MagneticButton>
            </div>
            
            {/* Social links */}
            <div className="mt-10 flex gap-4">
              {[
                { icon: <Github className="w-5 h-5" />, href: '#' },
                { icon: <Linkedin className="w-5 h-5" />, href: '#' },
                { icon: <Twitter className="w-5 h-5" />, href: '#' },
                { icon: <Instagram className="w-5 h-5" />, href: '#' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0084ff] hover:text-white transition-all duration-300"
                  data-cursor-hover
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Hero image */}
          <div className="order-1 lg:order-2 flex justify-center" style={{ transformStyle: 'preserve-3d' }}>
            <img
              ref={heroImageRef}
              src="/hero-illustration.png"
              alt="Hero Illustration"
              className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            />
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <SlideIn direction="left" className="reveal-section relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#0084ff] to-[#0044ff] rounded-3xl opacity-20 blur-xl" />
                <MaskReveal direction="circle">
                  <img
                    src="/about-photo.jpg"
                    alt="About Photo"
                    className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                  />
                </MaskReveal>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3" data-cursor-hover>
                <div className="w-12 h-12 rounded-full bg-gradient-blue flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Jurusan</p>
                  <p className="font-semibold">RPL - SMK</p>
                </div>
              </div>
            </SlideIn>
            
            {/* Content */}
            <div className="reveal-section">
              <p className="text-[#0084ff] font-semibold mb-2">TENTANG SAYA</p>
              <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6">
                Siswa Magang SMK <span className="text-gradient">RPL</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Saya adalah siswa magang dari SMK jurusan Rekayasa Perangkat Lunak yang memiliki passion dalam pengembangan web dan aplikasi. Saya senang mempelajari teknologi baru dan menerapkannya dalam proyek nyata.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                 Saya percaya bahwa kode yang baik adalah kode yang tidak hanya berfungsi dengan baik, tetapi juga mudah dibaca dan dipelihara.
              </p>
              
              {/* Stats dengan Counter Animation */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: 6, suffix: '+', label: 'Bulan Magang' },
                  { value: 10, suffix: '+', label: 'Proyek Selesai' },
                  { value: 5, suffix: '+', label: 'Sertifikasi' }
                ].map((stat, i) => (
                  <div key={i} className="stat-item text-center p-4 bg-white rounded-xl shadow-lg" data-cursor-hover>
                    <p className="text-3xl font-bold text-gradient">
                      <CounterAnimation end={stat.value} suffix={stat.suffix} duration={2} />
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal-section">
            <p className="text-[#0084ff] font-semibold mb-2">LAYANAN</p>
            <h2 className="text-4xl md:text-5xl font-bold font-['Poppins']">
              Apa yang Bisa Saya <span className="text-gradient">Lakukan</span>
            </h2>
          </div>
          
          <StaggerContainer 
            className="flex flex-col md:flex-row gap-4 h-auto md:h-[500px]"
            staggerDelay={0.15}
            animation="fadeUp"
          >
            {services.map((service, i) => (
              <div
                key={i}
                className="service-item group relative bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 hover:border-[#0084ff]/30 min-h-[200px] md:min-h-0"
                data-cursor-hover
              >
                {/* Default state */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-500 group-hover:opacity-0">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#0084ff] mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-center writing-mode-vertical md:writing-mode-horizontal">
                    {service.title}
                  </h3>
                </div>
                
                {/* Hover state */}
                <div className="absolute inset-0 bg-gradient-blue p-8 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-white mb-4 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white/90">{service.description}</p>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal-section">
            <p className="text-[#0084ff] font-semibold mb-2">PROYEK</p>
            <h2 className="text-4xl md:text-5xl font-bold font-['Poppins']">
              Proyek yang Telah Saya <span className="text-gradient">Kerjakan</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <TiltCard
                key={project.id}
                className="project-card bg-white rounded-2xl overflow-hidden cursor-pointer group"
                maxTilt={10}
                glareEnable={true}
              >
                <div
                  onClick={() => setSelectedProject(project.id)}
                  data-cursor-hover
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white flex items-center gap-2">
                        Lihat Detail <ExternalLink className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#0084ff] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal-section">
            <p className="text-[#0084ff] font-semibold mb-2">KEAHLIAN</p>
            <h2 className="text-4xl md:text-5xl font-bold font-['Poppins']">
              Teknologi yang Saya <span className="text-gradient">Kuasai</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Skills bars */}
            <div className="space-y-6">
              {skills.slice(0, 6).map((skill, i) => (
                <div key={i} className="skill-bar" data-level={skill.level}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="skill-progress h-full bg-gradient-blue rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              {skills.slice(6).map((skill, i) => (
                <div key={i} className="skill-bar" data-level={skill.level}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="skill-progress h-full bg-gradient-blue rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tech stack icons */}
          <div className="mt-16 reveal-section">
            <p className="text-center text-gray-500 mb-8">Tech Stack Favorit</p>
            <StaggerContainer 
              className="flex flex-wrap justify-center gap-6"
              staggerDelay={0.1}
              animation="scale"
            >
              {['React', 'Node.js', 'TypeScript', 'Tailwind', 'MongoDB', 'Git'].map((tech, i) => (
                <div
                  key={i}
                  className="px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100 hover:border-[#0084ff] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  data-cursor-hover
                >
                  <span className="font-medium text-gray-700">{tech}</span>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal-section">
            <p className="text-[#0084ff] font-semibold mb-2">KONTAK</p>
            <h2 className="text-4xl md:text-5xl font-bold font-['Poppins']">
              Mari Bekerja <span className="text-gradient">Bersama</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <SlideIn direction="left" className="reveal-section">
              <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
              <p className="text-gray-600 mb-8">
                Tertarik untuk berkolaborasi atau memiliki pertanyaan? Jangan ragu untuk menghubungi saya melalui formulir atau kontak di bawah ini.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'amasfaruq33@email.com' },
                  { icon: <Phone className="w-5 h-5" />, label: 'Telepon', value: '+' },
                  { icon: <MapPin className="w-5 h-5" />, label: 'Lokasi', value: 'lumajang, jawa timur' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4" data-cursor-hover>
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0084ff]">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Download CV */}
              <MagneticButton 
                className="mt-8 btn-primary"
                onClick={() => toast.info('Fitur download CV akan segera tersedia!')}
                strength={0.3}
              >
                <Download className="w-5 h-5 mr-2" /> Download CV
              </MagneticButton>
            </SlideIn>
            
            {/* Contact form */}
            <SlideIn direction="right" className="reveal-section bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nama</label>
                  <div className="input-line">
                    <Input 
                      placeholder="Muhammad Akhmas Faruq" 
                      className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="input-line">
                    <Input 
                      type="email"
                      placeholder="amasfaruq33@gmail.com" 
                      className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pesan</label>
                  <div className="input-line">
                    <Textarea 
                      placeholder="..." 
                      className="border-0 border-b rounded-none px-0 focus-visible:ring-0 min-h-[120px] resize-none"
                      required
                    />
                  </div>
                </div>
                <MagneticButton 
                  onClick={() => {}}
                  className="w-full btn-primary justify-center"
                  strength={0.2}
                >
                  <Send className="w-5 h-5 mr-2" /> Kirim Pesan
                </MagneticButton>
              </form>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold font-['Poppins'] text-gradient mb-2">
                <TextScramble text="Portfolio RPL" triggerOnHover={true} />
              </h3>
              <p className="text-gray-400">Siswa Magang SMK Rekayasa Perangkat Lunak</p>
            </div>
            
            <div className="flex gap-4">
              {[
                { icon: <Github className="w-5 h-5" />, href: '#' },
                { icon: <Linkedin className="w-5 h-5" />, href: '#' },
                { icon: <Twitter className="w-5 h-5" />, href: '#' },
                { icon: <Instagram className="w-5 h-5" />, href: '#' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0084ff] transition-colors"
                  data-cursor-hover
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>© 2025 Portfolio SMK RPL.</p>
          </div>
        </div>
      </footer>

      {/* Project Detail Dialog */}
      <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {projects.find(p => p.id === selectedProject)?.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  {projects.find(p => p.id === selectedProject)?.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <img
                  src={projects.find(p => p.id === selectedProject)?.image}
                  alt={projects.find(p => p.id === selectedProject)?.title}
                  className="w-full rounded-lg mb-4"
                />
                <div className="flex flex-wrap gap-2 mb-4">
                  {projects.find(p => p.id === selectedProject)?.tags.map((tag, i) => (
                    <span key={i} className="tech-tag">{tag}</span>
                  ))}
                </div>
                <Button className="btn-primary w-full" onClick={() => toast.info('Demo proyek akan segera tersedia!')}>
                  <ExternalLink className="w-5 h-5 mr-2" /> Lihat Demo
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
