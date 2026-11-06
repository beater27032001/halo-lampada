'use client'

import { motion } from 'motion/react'

import { EASE } from '@constants/motion'
import { formatKelvin, kelvinToRgb, SCENES } from '@domain/light'
import { SectionTitle } from '@molecules/SectionTitle'
import { useLight } from '@providers/LightProvider'

export function Moods() {
  const { scene, applyScene } = useLight()

  return (
    <section className="border-t border-line py-20 md:py-24">
      <div className="wrap">
        <SectionTitle>
          Uma lâmpada, <em>quatro</em> humores.
        </SectionTitle>
        <motion.ul
          className="m-0 mt-10 grid list-none gap-x-12 p-0 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {SCENES.map((s) => (
            <motion.li
              key={s.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: EASE },
                },
              }}
            >
              <button
                aria-pressed={scene === s.id}
                onClick={() => applyScene(s)}
                className="group grid w-full grid-cols-[auto_1fr] gap-x-5 border-t border-line py-6 text-left"
              >
                <span
                  aria-hidden
                  className="mt-1.5 size-9 rounded-full shadow-[0_0_0_1px_var(--color-line)] transition-transform duration-500 group-hover:scale-110 group-aria-pressed:scale-110 group-aria-pressed:shadow-[0_0_0_1px_var(--color-ink),0_0_22px_4px_var(--swatch)]"
                  style={{
                    background: `rgb(${kelvinToRgb(s.kelvin).join(' ')})`,
                    ['--swatch' as string]: `rgb(${kelvinToRgb(s.kelvin).join(' ')})`,
                  }}
                />
                <span>
                  <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <span className="font-display text-[32px] leading-none">
                      {s.name}
                    </span>
                    <span className="font-mono text-xs text-muted tabular-nums">
                      {formatKelvin(s.kelvin)} · {s.brightness}%
                    </span>
                  </span>
                  <span className="mt-2 block text-muted">{s.text}</span>
                  <span className="mt-3 inline-block font-mono text-xs underline decoration-line underline-offset-4 transition-colors group-hover:decoration-ink group-aria-pressed:no-underline">
                    {scene === s.id ? 'Aplicado' : 'Aplicar cena'}
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
