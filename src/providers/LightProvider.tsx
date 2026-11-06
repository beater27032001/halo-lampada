'use client'

import { createContext, use, useState } from 'react'

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from 'motion/react'

import { EASE } from '@constants/motion'
import { beam, INITIAL, kelvinToRgb, type Scene } from '@domain/light'

interface LightApi {
  kelvin: number
  brightness: number
  scene: string | null
  lit: boolean
  /** Valores animados: seguem as cenas suavemente, sem saltos. */
  kelvinMotion: MotionValue<number>
  brightnessMotion: MotionValue<number>
  setKelvin: (kelvin: number) => void
  setBrightness: (brightness: number) => void
  applyScene: (scene: Scene) => void
  toggleLit: () => void
}

const LightContext = createContext<LightApi | null>(null)

export function LightProvider({ children }: { children: React.ReactNode }) {
  const [kelvin, setKelvinState] = useState(INITIAL.kelvin)
  const [brightness, setBrightnessState] = useState(INITIAL.brightness)
  const [scene, setScene] = useState<string | null>(null)
  const [lit, setLit] = useState(false)
  const kelvinMotion = useMotionValue(INITIAL.kelvin)
  const brightnessMotion = useMotionValue(INITIAL.brightness)

  // A cor e o feixe viram variáveis CSS que toda a página lê.
  const k = useTransform(kelvinMotion, (v) => kelvinToRgb(v).join(' '))
  const r = useTransform(brightnessMotion, (v) => `${beam(v).radius}px`)
  const dark = useTransform(brightnessMotion, (v) => beam(v).dark)

  const api: LightApi = {
    kelvin,
    brightness,
    scene,
    lit,
    kelvinMotion,
    brightnessMotion,
    setKelvin: (v) => {
      setKelvinState(v)
      setScene(null)
      kelvinMotion.set(v)
    },
    setBrightness: (v) => {
      setBrightnessState(v)
      setScene(null)
      brightnessMotion.set(v)
    },
    applyScene: (s) => {
      setKelvinState(s.kelvin)
      setBrightnessState(s.brightness)
      setScene(s.id)
      animate(kelvinMotion, s.kelvin, { duration: 0.8, ease: EASE })
      animate(brightnessMotion, s.brightness, { duration: 0.8, ease: EASE })
    },
    toggleLit: () => setLit((on) => !on),
  }

  return (
    <LightContext value={api}>
      <motion.div style={{ '--k': k, '--r': r, '--dark': dark } as MotionStyle}>
        {children}
      </motion.div>
    </LightContext>
  )
}

export const useLight = () => use(LightContext)!
