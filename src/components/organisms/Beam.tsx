'use client'

import { useEffect, useRef } from 'react'

import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from 'motion/react'

import { useLight } from '@providers/LightProvider'

const FOLLOW = { stiffness: 220, damping: 30, mass: 0.6 }

/** A página apagada com um feixe de luz que segue o cursor ou o toque. */
export function Beam() {
  const { lit } = useLight()
  const reduced = useReducedMotion()
  const x = useSpring(0, FOLLOW)
  const y = useSpring(0, FOLLOW)
  const touched = useRef(false)

  useEffect(() => {
    x.jump(innerWidth / 2)
    y.jump(innerHeight * 0.4)
    const follow = (e: PointerEvent) => {
      touched.current = true
      x.set(e.clientX)
      y.set(e.clientY)
    }
    addEventListener('pointermove', follow)
    addEventListener('pointerdown', follow)
    return () => {
      removeEventListener('pointermove', follow)
      removeEventListener('pointerdown', follow)
    }
  }, [x, y])

  // Até alguém mexer, o feixe passeia sozinho (útil no celular, sem cursor).
  useAnimationFrame((t) => {
    if (touched.current || reduced) return
    x.set(innerWidth * (0.5 + 0.3 * Math.sin(t / 2600)))
    y.set(innerHeight * (0.42 + 0.18 * Math.sin(t / 1700)))
  })

  const shade = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, rgb(6 6 7 / 0) 0, rgb(6 6 7 / 0) calc(var(--r) * .55), rgb(6 6 7 / var(--dark)) calc(var(--r) * 1.6))`
  const tint = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, rgb(var(--k) / .55) 0, rgb(var(--k) / .25) calc(var(--r) * 1.2), rgb(var(--k) / 0) calc(var(--r) * 2.2))`
  const fade = { duration: 0.6 }

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 mix-blend-multiply"
        style={{ background: tint }}
        animate={{ opacity: lit ? 0 : 1 }}
        transition={fade}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 bg-[rgb(var(--k)/.28)] mix-blend-multiply"
        initial={{ opacity: 0 }}
        animate={{ opacity: lit ? 1 : 0 }}
        transition={fade}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-41"
        style={{ background: shade }}
        animate={{ opacity: lit ? 0 : 1 }}
        transition={fade}
      />
    </>
  )
}
