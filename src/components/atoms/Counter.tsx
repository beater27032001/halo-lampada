'use client'

import { useEffect, useRef } from 'react'

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from 'motion/react'

export function Counter({
  value,
  prefix = '',
}: {
  value: number
  prefix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const current = useMotionValue(0)
  const text = useTransform(
    current,
    (v) => prefix + Math.round(v).toLocaleString('pt-BR'),
  )

  useEffect(() => {
    if (!inView) return
    const controls = animate(current, value, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
    })
    return () => controls.stop()
  }, [inView, current, value])

  return (
    <motion.span ref={ref} aria-label={prefix + value.toLocaleString('pt-BR')}>
      {text}
    </motion.span>
  )
}
