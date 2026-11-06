'use client'

import { motion } from 'motion/react'

import { EASE } from '@constants/motion'

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden pb-[.1em]">
      <motion.h2
        className="m-0 font-display text-[clamp(44px,6vw,80px)] leading-[.95] font-normal tracking-[-.01em] text-balance"
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {children}
      </motion.h2>
    </div>
  )
}
