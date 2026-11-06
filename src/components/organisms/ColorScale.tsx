'use client'

import { motion } from 'motion/react'

import { EASE } from '@constants/motion'
import { formatKelvin, KELVIN_SCALE, kelvinToRgb, warmth } from '@domain/light'
import { SectionTitle } from '@molecules/SectionTitle'
import { useLight } from '@providers/LightProvider'

export function ColorScale() {
  const { kelvin, setKelvin } = useLight()

  return (
    <section className="border-t border-line py-20 md:py-24">
      <div className="wrap">
        <SectionTitle>Temperatura de cor</SectionTitle>
        <p className="mt-6 mb-0 max-w-[52ch] text-muted">
          Medida em kelvin. Quanto mais baixo, mais quente e amarelada; quanto
          mais alto, mais fria e azulada. A Halo vai de 2200 K a 6500 K. Toque
          numa faixa para ver a luz.
        </p>
        <motion.div
          className="mt-8 grid gap-2 sm:grid-cols-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.07 }}
        >
          {KELVIN_SCALE.map((k) => (
            <motion.button
              key={k}
              aria-pressed={kelvin === k}
              onClick={() => setKelvin(k)}
              className="flex min-w-0 items-baseline justify-between gap-3 rounded-[10px] px-3 py-4 text-left font-mono text-xs text-[#1a1a1a] ring-ink transition-shadow aria-pressed:ring-2 sm:block"
              style={{ background: `rgb(${kelvinToRgb(k).join(' ')})` }}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.96 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.7, ease: EASE },
                },
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <b className="block font-display text-[26px] font-normal">
                {formatKelvin(k)}
              </b>
              {warmth(k)}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
