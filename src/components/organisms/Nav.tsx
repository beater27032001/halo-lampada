'use client'

import { motion } from 'motion/react'

import { EASE } from '@constants/motion'

export function Nav() {
  return (
    <motion.nav
      className="flex items-center justify-between gap-3 py-[22px]"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <span className="font-display text-[30px] leading-none">
        Halo<i>.</i>
      </span>
      <a
        href="#comprar"
        className="rounded-full border border-ink px-3 py-1.5 font-mono text-xs transition-colors hover:bg-ink hover:text-paper"
      >
        Comprar
      </a>
    </motion.nav>
  )
}
