'use client'

import { motion, type MotionValue } from 'motion/react'

import { cn } from '@lib/utils'

interface Props {
  id: string
  label: string
  /** Texto do valor, animado junto com a luz. */
  display: MotionValue<string>
  value: number
  min: number
  max: number
  step?: number
  className?: string
  onChange: (value: number) => void
}

export function Slider({
  id,
  label,
  display,
  value,
  min,
  max,
  step = 1,
  className,
  onChange,
}: Props) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-1 flex justify-between font-mono text-[11px] text-app-muted"
      >
        {label}
        <motion.b className="font-medium text-app-fg tabular-nums">
          {display}
        </motion.b>
      </label>
      <input
        id={id}
        type="range"
        className={cn('range', className)}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
      />
    </div>
  )
}
