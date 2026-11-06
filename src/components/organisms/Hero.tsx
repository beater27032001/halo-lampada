'use client'

import { motion } from 'motion/react'

import { EASE } from '@constants/motion'
import { Lamp } from '@molecules/Lamp'

const LINES = [
  <>Luz que</>,
  <>
    <em>muda</em> com
  </>,
  <>você.</>,
]

export function Hero() {
  return (
    <header className="grid items-center gap-10 pt-10 pb-[90px] md:grid-cols-[1.1fr_.9fr]">
      <div>
        <h1 className="m-0 font-display text-[clamp(72px,14vw,200px)] leading-[.82] font-normal tracking-[-.02em]">
          {LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[.08em]">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="mt-[22px] mb-0 max-w-[34ch] text-xl text-muted"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
        >
          A página está apagada. Mova o cursor ou toque na tela para iluminar, e
          use o painel embaixo como se fosse o app da lâmpada.
        </motion.p>
      </div>
      <Lamp />
    </header>
  )
}
