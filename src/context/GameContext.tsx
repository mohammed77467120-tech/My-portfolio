import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface StationInfo {
  id: string
  index: number
  zPos: number
  title: { en: string; ar: string }
  subtitle: { en: string; ar: string }
  icon: string
}

export const STATIONS: StationInfo[] = [
  {
    id: 'hero',
    index: 0,
    zPos: 0,
    title: { en: 'Hero Portal', ar: 'محطة البداية' },
    subtitle: { en: 'Welcome to the 3D Journey', ar: 'مرحباً بك في رحلة المغامرة الـ 3D' },
    icon: '🚀',
  },
  {
    id: 'about',
    index: 1,
    zPos: -25,
    title: { en: 'About Oasis', ar: 'محطة عني والخبرات' },
    subtitle: { en: 'Developer Story & Background', ar: 'قصة المطور وتفاصيل الشغف والخبرة' },
    icon: '📜',
  },
  {
    id: 'skills',
    index: 2,
    zPos: -50,
    title: { en: 'Skills Citadel', ar: 'قلعة المهارات' },
    subtitle: { en: 'Tech Stack & Engineering Tools', ar: 'تقنيات الويب والجوال وقواعد البيانات' },
    icon: '⚡',
  },
  {
    id: 'projects',
    index: 3,
    zPos: -75,
    title: { en: 'Projects Kingdom', ar: 'قرية المشاريع' },
    subtitle: { en: 'Featured Software Solutions', ar: 'معرض الأعمال والمشاريع المميزة' },
    icon: '💻',
  },
  {
    id: 'contact',
    index: 4,
    zPos: -100,
    title: { en: 'Contact Portal', ar: 'بوابة التواصل' },
    subtitle: { en: 'Get in Touch & Connect', ar: 'تواصل معي وبادر ببدء المشروعات' },
    icon: '🛰️',
  },
]

interface GameContextType {
  targetZ: number
  currentZ: number
  setCurrentZ: (z: number) => void
  activeStationIndex: number
  isAutoTour: boolean
  toggleAutoTour: () => void
  travelToStation: (index: number) => void
  moveCharacterDelta: (deltaZ: number) => void
  isMoving: boolean
  setIsMoving: (moving: boolean) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [targetZ, setTargetZ] = useState<number>(0)
  const [currentZ, setCurrentZ] = useState<number>(0)
  const [activeStationIndex, setActiveStationIndex] = useState<number>(0)
  const [isAutoTour, setIsAutoTour] = useState<boolean>(false)
  const [isMoving, setIsMoving] = useState<boolean>(false)

  // Move character delta along Z axis
  const moveCharacterDelta = useCallback((deltaZ: number) => {
    setTargetZ((prev) => {
      const next = prev + deltaZ
      return Math.max(-105, Math.min(5, next))
    })
  }, [])

  // Travel directly to a station index
  const travelToStation = useCallback((index: number) => {
    if (index >= 0 && index < STATIONS.length) {
      setTargetZ(STATIONS[index].zPos)
      setActiveStationIndex(index)
    }
  }, [])

  // Toggle auto tour mode
  const toggleAutoTour = useCallback(() => {
    setIsAutoTour((prev) => !prev)
  }, [])

  // Update active station based on currentZ
  useEffect(() => {
    let closestIndex = 0
    let minDistance = Infinity

    STATIONS.forEach((st, idx) => {
      const dist = Math.abs(currentZ - st.zPos)
      if (dist < minDistance) {
        minDistance = dist
        closestIndex = idx
      }
    })

    if (closestIndex !== activeStationIndex) {
      setActiveStationIndex(closestIndex)
    }
  }, [currentZ, activeStationIndex])

  // Handle keyboard controls (WASD / Arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'KeyS'].includes(e.code)) {
        moveCharacterDelta(-2.5)
      } else if (['ArrowUp', 'KeyW'].includes(e.code)) {
        moveCharacterDelta(2.5)
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        moveCharacterDelta(-1.5)
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        moveCharacterDelta(1.5)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveCharacterDelta])

  // Handle mouse scroll to move character
  useEffect(() => {
    let lastWheelTime = 0
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastWheelTime < 30) return
      lastWheelTime = now

      const delta = e.deltaY > 0 ? -1.8 : 1.8
      moveCharacterDelta(delta)
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [moveCharacterDelta])

  // Auto-tour animation loop
  useEffect(() => {
    if (!isAutoTour) return

    const interval = setInterval(() => {
      setTargetZ((prev) => {
        if (prev <= -102) {
          return 0 // loop back to start
        }
        return prev - 0.35
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isAutoTour])

  return (
    <GameContext.Provider
      value={{
        targetZ,
        currentZ,
        setCurrentZ,
        activeStationIndex,
        isAutoTour,
        toggleAutoTour,
        travelToStation,
        moveCharacterDelta,
        isMoving,
        setIsMoving,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
