import { useEffect, useState } from 'react'

interface TypingAnimationProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export function TypingAnimation({ 
  text, 
  speed = 50, 
  className = "", 
  onComplete 
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete?.()
    }
  }, [currentIndex, text, speed, onComplete, isComplete])

  return (
    <span className={className}>
      {displayText}
      {!isComplete && (
        <span className="animate-pulse text-portfolio-green">|</span>
      )}
    </span>
  )
}
