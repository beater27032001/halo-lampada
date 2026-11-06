'use client'

import { motion } from 'motion/react'

import { EASE } from '@constants/motion'

// A visibilidade é medida no container: o título começa fora da máscara e nunca seria "visto".
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="overflow-hidden pb-[.1em]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.h2
        className="m-0 font-display text-[clamp(44px,6vw,80px)] leading-[.95] font-normal tracking-[-.01em] text-balance"
        variants={{ hidden: { y: '100%' }, show: { y: 0 } }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {children}
      </motion.h2>
    </motion.div>
  )
}
