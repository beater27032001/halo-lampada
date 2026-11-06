'use client'

import { motion, useMotionTemplate, useTransform } from 'motion/react'

import { useLight } from '@providers/LightProvider'

/** Luminária em anel: aro metálico, difusor que acende na cor escolhida e brilho que segue o controle. Fica acima da camada escura: é ela a fonte de luz. */
export function Lamp() {
  const { brightnessMotion } = useLight()
  const bloom = useTransform(brightnessMotion, [5, 100], [0.25, 1])
  const bloomScale = useTransform(brightnessMotion, [5, 100], [0.75, 1.15])
  const level = useTransform(brightnessMotion, [5, 100], [0.55, 1.05])
  const dim = useMotionTemplate`brightness(${level})`

  return (
    <motion.div
      aria-hidden
      className="relative z-45 mx-auto aspect-square w-full max-w-[420px] origin-top"
      style={{ filter: dim }}
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0, rotate: [0, 1.2, -1.2, 0] }}
      transition={{
        opacity: { duration: 1 },
        y: { duration: 1.2, ease: [0.2, 0.8, 0.2, 1] },
        rotate: {
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        },
      }}
    >
      {/* cabo e canopla */}
      <span className="absolute -top-16 left-1/2 h-[calc(14%+64px)] w-0.5 -translate-x-1/2 bg-linear-to-b from-ink/20 to-ink/70" />
      <span className="absolute top-[13%] left-1/2 h-3 w-7 -translate-x-1/2 rounded-b-md bg-linear-to-b from-[#cfd1cc] to-[#8f928c] shadow-sm" />

      {/* brilho difuso em volta, cresce com o brilho */}
      <motion.div
        className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle,rgb(var(--k)/.65),rgb(var(--k)/0)_66%)] blur-xl"
        style={{ opacity: bloom, scale: bloomScale }}
      />

      {/* aro metálico */}
      <div className="absolute inset-[14%] rounded-full bg-[conic-gradient(from_210deg,#f4f4f1,#b9bbb6,#ecedea,#9fa29c,#f4f4f1)] p-[clamp(10px,2.4vw,18px)] shadow-[0_30px_50px_-20px_rgb(0_0_0/.35),0_0_0_1px_var(--color-line)]">
        {/* difusor aceso */}
        <div className="size-full rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,#f6f4ef_78%,rgb(var(--k)))_0%,color-mix(in_srgb,#f6f4ef_55%,rgb(var(--k)))_72%,rgb(var(--k))_100%)] shadow-[inset_0_0_0_clamp(6px,1.4vw,10px)_rgb(var(--k)),inset_0_0_28px_clamp(8px,2vw,16px)_rgb(var(--k)/.8),0_0_24px_6px_rgb(var(--k)/.9),0_0_60px_10px_rgb(var(--k)/.45)]" />
      </div>
    </motion.div>
  )
}
