import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTheme } from '@/components/theme-provider'
import { ThreeBackground } from '@/components/3d-background'
import { TypingAnimation } from '@/components/typing-animation'
import { MagneticCursor } from '@/components/magnetic-cursor'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ExternalLink, 
  Code, 
  Brain, 
  Smartphone, 
  Map, 
  Heart, 
  Network,
  Menu,
  X,
  Coffee,
  Database,
  Zap,
  Shield,
  Cpu,
  Globe,
  Server,
  Layers,
  GitBranch,
  Calendar,
  MapPin
} from 'lucide-react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Index() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showTyping, setShowTyping] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()
  
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const experienceRef = useRef(null)
  const projectsRef = useRef(null)
  const skillsRef = useRef(null)
  const contactRef = useRef(null)
  const cursorRef = useRef(null)

  // Mouse tracking for magnetic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Hero entrance animations with 3D transforms
    gsap.set('.hero-content', { opacity: 0, y: 100, rotationX: 45 })
    gsap.set('.hero-name', { opacity: 0, x: -100, rotationY: -30 })
    gsap.set('.hero-photo', { opacity: 0, scale: 0.5, rotationZ: 180 })
    gsap.set('.floating-element', { opacity: 0, scale: 0, rotation: 0 })
    
    const heroTl = gsap.timeline()
    heroTl.to('.hero-name', { 
      opacity: 1, 
      x: 0, 
      rotationY: 0, 
      duration: 1.5, 
      ease: 'power3.out' 
    })
    .to('.hero-photo', { 
      opacity: 1, 
      scale: 1, 
      rotationZ: 0, 
      duration: 1.5, 
      ease: 'back.out(1.7)' 
    }, '-=1')
    .to('.hero-content', { 
      opacity: 1, 
      y: 0, 
      rotationX: 0, 
      duration: 1.5, 
      ease: 'power3.out' 
    }, '-=1')
    .to('.floating-element', {
      opacity: 1,
      scale: 1,
      rotation: 360,
      duration: 1,
      ease: 'back.out(1.7)',
      stagger: 0.2
    }, '-=0.5')
    .call(() => setShowTyping(true))

    // Parallax background layers
    gsap.to('.parallax-layer-1', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    gsap.to('.parallax-layer-2', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    // 3D scroll animations for sections
    gsap.utils.toArray('.scroll-section').forEach((section: any, index) => {
      gsap.fromTo(section, 
        { 
          opacity: 0, 
          y: 100, 
          rotationX: 45,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          scale: 1,
          duration: 1.5, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              gsap.to(section, {
                boxShadow: theme === 'dark' 
                  ? '0 20px 40px rgba(34, 197, 94, 0.2)' 
                  : '0 20px 40px rgba(14, 165, 233, 0.2)',
                duration: 0.5
              })
            },
            onLeave: () => {
              gsap.to(section, {
                boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
                duration: 0.5
              })
            }
          }
        }
      )
    })

    // Project cards with 3D flip animation
    gsap.utils.toArray('.project-card').forEach((card: any, index) => {
      gsap.fromTo(card,
        { 
          opacity: 0, 
          rotationY: -90, 
          z: -200,
          scale: 0.5 
        },
        {
          opacity: 1,
          rotationY: 0,
          z: 0,
          scale: 1,
          duration: 1.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.2
        }
      )

      // Enhanced hover animation
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotationY: 5,
          rotationX: 5,
          z: 50,
          duration: 0.4,
          ease: 'power2.out'
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          duration: 0.4,
          ease: 'power2.out'
        })
      })
    })

    // Skills animation with magnetic effect
    gsap.utils.toArray('.skill-item').forEach((skill: any, index) => {
      gsap.fromTo(skill,
        { 
          opacity: 0, 
          scale: 0, 
          rotation: 180,
          z: -100 
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          z: 0,
          duration: 1.2,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: skill,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.1
        }
      )

      // Magnetic hover effect
      skill.addEventListener('mouseenter', () => {
        gsap.to(skill, {
          scale: 1.15,
          rotation: 5,
          z: 30,
          duration: 0.3,
          ease: 'power2.out'
        })
      })

      skill.addEventListener('mouseleave', () => {
        gsap.to(skill, {
          scale: 1,
          rotation: 0,
          z: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })

    // Text reveal animations
    gsap.utils.toArray('.text-reveal').forEach((text: any) => {
      const chars = text.textContent.split('')
      text.textContent = ''
      
      chars.forEach((char: string) => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        span.style.transform = 'translateY(100px) rotateX(90deg)'
        text.appendChild(span)
      })

      gsap.to(text.children, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.02,
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    // Navigation highlight with smooth transition
    gsap.utils.toArray('.nav-item').forEach((item: any) => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.1,
          y: -3,
          duration: 0.3,
          ease: 'power2.out'
        })
      })

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })

    // Floating elements animation
    gsap.to('.floating-ui-element', {
      y: 'random(-20, 20)',
      x: 'random(-10, 10)',
      rotation: 'random(-5, 5)',
      duration: 3,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.5
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [theme])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + 200

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  const projects = [
    {
      title: "Sign Language to Text (Android App)",
      description: "Real-time gesture-to-text and speech using CNN, TensorFlow Lite, MediaPipe. Skeleton-style gesture input preprocessing for enhanced accuracy.",
      icon: <Smartphone className="h-8 w-8" />,
      tech: ["CNN", "TensorFlow Lite", "MediaPipe", "Android", "Kotlin"],
      gradient: "from-portfolio-green via-portfolio-green-light to-portfolio-skyblue",
      bgPattern: "radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)"
    },
    {
      title: "Self-Healing IoT Network",
      description: "AI-based network with fault prediction and auto-recovery. Inspired by IEEE-style research on AI-IoT systems with Cisco Packet Tracer integration.",
      icon: <Network className="h-8 w-8" />,
      tech: ["AI", "IoT", "Python", "Cisco Packet Tracer", "Fault Detection"],
      gradient: "from-portfolio-skyblue via-portfolio-skyblue-light to-portfolio-green",
      bgPattern: "radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)"
    },
    {
      title: "Symptom-to-Disease Prediction",
      description: "Two-stage AI system with user data and symptoms as input. Uses deep learning models to predict most likely disease with high accuracy.",
      icon: <Heart className="h-8 w-8" />,
      tech: ["Deep Learning", "Healthcare AI", "Python", "Medical Data"],
      gradient: "from-portfolio-green-dark via-portfolio-green to-portfolio-skyblue-dark",
      bgPattern: "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 70%)"
    },
    {
      title: "Trip Planner Web App",
      description: "Smart tool to organize travel using ML-based suggestions. AI-enhanced recommendations for optimal itinerary planning.",
      icon: <Map className="h-8 w-8" />,
      tech: ["Machine Learning", "React", "Flask", "Travel AI"],
      gradient: "from-portfolio-skyblue-dark via-portfolio-skyblue to-portfolio-green-light",
      bgPattern: "radial-gradient(circle at 30% 70%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)"
    }
  ]

  const skills = [
    { name: "Deep Learning", icon: <Brain className="h-6 w-6" />, description: "TensorFlow, CNNs, Neural Networks" },
    { name: "Java & Spring Boot", icon: <Coffee className="h-6 w-6" />, description: "Backend Development, Microservices" },
    { name: "MediaPipe & TFLite", icon: <Zap className="h-6 w-6" />, description: "Real-time ML on Mobile" },
    { name: "Android Development", icon: <Smartphone className="h-6 w-6" />, description: "Kotlin + ML Integration" },
    { name: "Flask & Python", icon: <Code className="h-6 w-6" />, description: "API Development, Data Science" },
    { name: "IoT & Security", icon: <Shield className="h-6 w-6" />, description: "AI-based Fault Detection" },
    { name: "Database Systems", icon: <Database className="h-6 w-6" />, description: "SQL, NoSQL, Data Modeling" },
    { name: "WebGL & 3D", icon: <Cpu className="h-6 w-6" />, description: "Three.js, Interactive Visuals" }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ perspective: '1200px' }}>
      <ThreeBackground isDark={theme === 'dark'} />
      
      {/* Magnetic Cursor */}
      <MagneticCursor isDark={theme === 'dark'} />

      {/* Floating UI Elements */}
      <div className="floating-ui-element fixed top-20 left-10 w-4 h-4 bg-portfolio-green/30 rounded-full z-10" />
      <div className="floating-ui-element fixed top-40 right-20 w-6 h-6 bg-portfolio-skyblue/30 rounded-full z-10" />
      <div className="floating-ui-element fixed bottom-40 left-20 w-3 h-3 bg-portfolio-green/40 rounded-full z-10" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/5 backdrop-blur-2xl z-50 border-b border-portfolio-green/10" style={{ backdropFilter: 'blur(20px) saturate(180%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-portfolio-green via-portfolio-skyblue to-portfolio-green bg-clip-text text-transparent">
              DL.DEV
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`nav-item capitalize transition-all duration-500 relative group ${
                    activeSection === section ? 'text-portfolio-green' : 'text-muted-foreground hover:text-portfolio-skyblue'
                  }`}
                >
                  {section}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-portfolio-green to-portfolio-skyblue transform transition-transform duration-500 ${
                    activeSection === section ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                  <span className={`absolute -top-1 -left-1 -right-1 -bottom-1 bg-portfolio-green/5 rounded-lg transition-opacity duration-300 ${
                    activeSection === section ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                  }`}></span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* Mobile menu button */}
              <button
                className="md:hidden relative z-10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/90 backdrop-blur-2xl border-t border-portfolio-green/20">
            <div className="px-4 py-2 space-y-2">
              {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left py-3 capitalize transition-all duration-300 ${
                    activeSection === section ? 'text-portfolio-green font-semibold' : 'text-muted-foreground'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative parallax-layer-1" ref={heroRef}>
        <div className="absolute inset-0 bg-gradient-to-br from-portfolio-green/5 via-transparent to-portfolio-skyblue/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Content */}
            <div className="space-y-8">
              <div className="hero-name">
                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-portfolio-green via-portfolio-skyblue to-portfolio-green bg-clip-text text-transparent">
                  Hi, I'm Suensa
                </h1>
                <h2 className="text-4xl md:text-6xl font-light text-muted-foreground">
                  <p>Full-Stack Developer</p>
                </h2>
              </div>
              
              <div className="hero-content space-y-6">
                <div className="text-xl md:text-2xl text-muted-foreground min-h-[3rem]">
                  {showTyping && (
                    <p>Java Backend Builder | Real-World Problem Solver</p>
                  )}
                </div>
                
                <div className="space-y-4 text-lg text-muted-foreground max-w-2xl">
                  <p>
                    Passionate about Java, Spring Boot, and building full-stack intelligent systems that make a tangible impact.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => scrollToSection('projects')}
                    className="bg-gradient-to-r from-portfolio-green to-portfolio-green-dark hover:from-portfolio-green-dark hover:to-portfolio-green text-white font-semibold px-8 py-4 rounded-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-portfolio-green/25 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Explore Projects</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-portfolio-skyblue to-portfolio-green opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-portfolio-skyblue text-portfolio-skyblue hover:bg-portfolio-skyblue hover:text-white transition-all duration-500 transform hover:scale-110 group px-8 py-4 rounded-xl relative overflow-hidden"
                  >
                    <Download className="mr-2 h-5 w-5 group-hover:animate-bounce relative z-10" />
                    <span className="relative z-10">Download Resume</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-portfolio-green to-portfolio-skyblue opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  </Button>
                </div>

                <div className="flex space-x-6 pt-4">
                  <a href="#" className="text-muted-foreground hover:text-portfolio-green transition-all duration-500 transform hover:scale-125 hover:rotate-12 relative group">
                    <Github className="h-7 w-7 relative z-10" />
                    <div className="absolute inset-0 bg-portfolio-green/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-portfolio-skyblue transition-all duration-500 transform hover:scale-125 hover:rotate-12 relative group">
                    <Linkedin className="h-7 w-7 relative z-10" />
                    <div className="absolute inset-0 bg-portfolio-skyblue/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-portfolio-green transition-all duration-500 transform hover:scale-125 hover:rotate-12 relative group">
                    <Mail className="h-7 w-7 relative z-10" />
                    <div className="absolute inset-0 bg-portfolio-green/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right side - Photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="hero-photo relative">
                <div className="w-96 h-96 rounded-full bg-gradient-to-r from-portfolio-green via-portfolio-skyblue to-portfolio-green p-1 animate-pulse">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center relative overflow-hidden">
                    <div className="w-80 h-80 rounded-full bg-gradient-to-br from-portfolio-green/20 to-portfolio-skyblue/20 flex items-center justify-center relative">
                      <img 
                        src="/placeholder.svg" 
                        alt="Developer Profile" 
                        className="w-72 h-72 rounded-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2Fdd58afc81d8f4768af0cff9ab4b82ef2%2F71cbc89981054d2c97313a57b3a892fe)',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          backgroundSize: 'cover'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="floating-element absolute -top-4 -right-4 w-12 h-12 bg-portfolio-green rounded-full flex items-center justify-center animate-bounce">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div className="floating-element absolute -bottom-4 -left-4 w-12 h-12 bg-portfolio-skyblue rounded-full flex items-center justify-center animate-bounce delay-75">
                  <Coffee className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-section py-20 bg-gradient-to-br from-portfolio-green/5 to-portfolio-skyblue/5 parallax-layer-2" ref={aboutRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-reveal text-5xl font-bold bg-gradient-to-r from-portfolio-green to-portfolio-skyblue bg-clip-text text-transparent">
              About the Developer
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="text-reveal">
                I recently completed a <span className="text-portfolio-green font-semibold">Deep Learning Internship at NIT Rourkela</span>,
                where I focused on developing AI solutions for cryptography and healthcare applications. My work involved creating
                and evaluating deep learning models for real-time secure prediction systems.
              </p>
              <p className="text-reveal">
                My expertise lies in bridging the gap between theoretical machine learning concepts and practical,
                real-world implementations. I specialize in building full-stack intelligent systems that leverage
                the power of Java backend development with cutting-edge AI capabilities.
              </p>
              <p className="text-reveal">
                From developing CNNs for real-time gesture recognition to creating self-healing IoT networks,
                I'm passionate about solving complex problems that have tangible impact on society, particularly
                in the domains of healthcare, security, and smart systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="scroll-section py-20" ref={experienceRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-reveal text-5xl font-bold bg-gradient-to-r from-portfolio-green to-portfolio-skyblue bg-clip-text text-transparent mb-4">
              Experience
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-700 transform hover:scale-105 border-0 bg-gradient-to-br from-card/80 via-card to-portfolio-green/5 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-portfolio-green/5 to-portfolio-skyblue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-portfolio-green to-portfolio-skyblue rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Cpu className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-portfolio-green transition-colors duration-300">
                        Deep Learning Intern
                      </h3>
                      <p className="text-lg text-portfolio-skyblue font-semibold">NIT Rourkela</p>
                      <div className="flex items-center space-x-4 text-muted-foreground mt-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>2024 - Present</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>Rourkela, India</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-muted-foreground">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-portfolio-green mt-2 flex-shrink-0"></div>
                        <p>Worked on cryptography and healthcare applications using deep learning technologies</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-portfolio-skyblue mt-2 flex-shrink-0"></div>
                        <p>Developed and evaluated DL models for real-time secure prediction systems</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-portfolio-green mt-2 flex-shrink-0"></div>
                        <p>Collaborated on IEEE-style research projects focusing on AI-IoT integration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-section py-20 bg-gradient-to-br from-portfolio-skyblue/5 to-portfolio-green/5" ref={projectsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-reveal text-5xl font-bold bg-gradient-to-r from-portfolio-green to-portfolio-skyblue bg-clip-text text-transparent mb-4">
              Featured Projects
            </h2>
            <p className="text-reveal text-xl text-muted-foreground max-w-3xl mx-auto">
              Immersive AI solutions spanning healthcare, IoT, and real-world applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8" style={{ perspective: '1000px' }}>
            {projects.map((project, index) => (
              <Card 
                key={index}
                className="project-card group transition-all duration-700 transform border-0 bg-gradient-to-br from-card/80 via-card to-muted/30 backdrop-blur-sm overflow-hidden cursor-pointer relative"
                style={{ 
                  transformStyle: 'preserve-3d',
                  backgroundImage: project.bgPattern
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-portfolio-green/5 to-portfolio-skyblue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${project.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative z-10">{project.icon}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-portfolio-green transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 hover:scale-105 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="group/btn hover:bg-primary/10 transition-all duration-300 w-full relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Explore Project
                      <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-2 group-hover/btn:scale-110 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-portfolio-green/20 to-portfolio-skyblue/20 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></div>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-section py-20" ref={skillsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-reveal text-5xl font-bold bg-gradient-to-r from-portfolio-green to-portfolio-skyblue bg-clip-text text-transparent mb-4">
              Technical Arsenal
            </h2>
            <p className="text-reveal text-xl text-muted-foreground">
              Core technologies and frameworks powering innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Card 
                key={index} 
                className="skill-item group transition-all duration-500 border-0 bg-gradient-to-br from-card/80 via-card to-muted/30 backdrop-blur-sm cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-portfolio-green/10 to-portfolio-skyblue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-6 text-center space-y-4 relative z-10">
                  <div className="text-portfolio-green group-hover:text-portfolio-skyblue transition-all duration-500 mx-auto w-fit relative">
                    <div className="absolute inset-0 bg-current/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                    <span className="relative z-10">{skill.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-portfolio-green transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-section py-20 bg-gradient-to-br from-portfolio-green/5 to-portfolio-skyblue/5" ref={contactRef}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-reveal text-5xl font-bold bg-gradient-to-r from-portfolio-green to-portfolio-skyblue bg-clip-text text-transparent mb-4">
              Let's Collaborate
            </h2>
            <p className="text-reveal text-xl text-muted-foreground">
              Ready to discuss innovative AI solutions and opportunities
            </p>
          </div>

          <Card className="bg-gradient-to-br from-card/80 via-card to-muted/30 backdrop-blur-sm border-0 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-portfolio-green/5 to-portfolio-skyblue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 relative z-10">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group/input">
                    <label className="block text-sm font-medium mb-3 text-portfolio-green group-focus-within/input:text-portfolio-skyblue transition-colors duration-300">Name</label>
                    <Input 
                      className="bg-background/50 border-portfolio-green/30 focus:border-portfolio-green hover:border-portfolio-skyblue transition-all duration-500 focus:shadow-lg focus:shadow-portfolio-green/10 focus:scale-105"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="group/input">
                    <label className="block text-sm font-medium mb-3 text-portfolio-skyblue group-focus-within/input:text-portfolio-green transition-colors duration-300">Email</label>
                    <Input 
                      type="email"
                      className="bg-background/50 border-portfolio-skyblue/30 focus:border-portfolio-skyblue hover:border-portfolio-green transition-all duration-500 focus:shadow-lg focus:shadow-portfolio-skyblue/10 focus:scale-105"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="group/input">
                  <label className="block text-sm font-medium mb-3 text-portfolio-green group-focus-within/input:text-portfolio-skyblue transition-colors duration-300">Message</label>
                  <Textarea 
                    rows={6}
                    className="bg-background/50 border-portfolio-green/30 focus:border-portfolio-green hover:border-portfolio-skyblue transition-all duration-500 resize-none focus:shadow-lg focus:shadow-portfolio-green/10 focus:scale-105"
                    placeholder="Tell me about your project, opportunity, or collaboration idea..."
                  />
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-portfolio-green via-portfolio-skyblue to-portfolio-green hover:from-portfolio-green-dark hover:to-portfolio-skyblue-dark text-white font-semibold py-4 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-portfolio-green/25 relative overflow-hidden group/btn"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Send Message
                    <Mail className="ml-2 h-5 w-5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-portfolio-skyblue to-portfolio-green transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background/80 backdrop-blur-xl border-t border-portfolio-green/20 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-portfolio-green/5 to-portfolio-skyblue/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-portfolio-green transition-all duration-500 transform hover:scale-125 hover:rotate-12 relative group">
                <Github className="h-6 w-6 relative z-10" />
                <div className="absolute inset-0 bg-portfolio-green/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
              </a>
              <a href="#" className="text-muted-foreground hover:text-portfolio-skyblue transition-all duration-500 transform hover:scale-125 hover:rotate-12 relative group">
                <Linkedin className="h-6 w-6 relative z-10" />
                <div className="absolute inset-0 bg-portfolio-skyblue/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
              </a>
              <a href="#" className="text-muted-foreground hover:text-portfolio-green transition-all duration-500 transform hover:scale-125 hover:rotate-12 relative group">
                <Mail className="h-6 w-6 relative z-10" />
                <div className="absolute inset-0 bg-portfolio-green/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
              </a>
            </div>
            <p className="text-muted-foreground">
              © 2024 Deep Learning Developer. Crafted with React, TypeScript, GSAP, and Three.js.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
