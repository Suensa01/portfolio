import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface MagneticCursorProps {
  isDark: boolean
}

export function MagneticCursor({ isDark }: MagneticCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    
    if (!cursor || !follower) return

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
        ease: 'power2.out'
      })

      gsap.to(follower, {
        x: e.clientX - 16,
        y: e.clientY - 16,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target
      if (target && target instanceof HTMLElement && target.closest('button, a, .interactive')) {
        gsap.to(cursor, {
          scale: 0.5,
          duration: 0.2
        })
        gsap.to(follower, {
          scale: 1.5,
          opacity: 0.8,
          duration: 0.2
        })
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target
      if (target && target instanceof HTMLElement && target.closest('button, a, .interactive')) {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.2
        })
        gsap.to(follower, {
          scale: 1,
          opacity: 0.6,
          duration: 0.2
        })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 pointer-events-none z-50 mix-blend-difference rounded-full"
        style={{
          backgroundColor: isDark ? '#22c55e' : '#0ea5e9',
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div
        ref={followerRef}
        className="fixed w-8 h-8 pointer-events-none z-40 rounded-full border opacity-60"
        style={{
          borderColor: isDark ? '#22c55e' : '#0ea5e9',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  )
}
