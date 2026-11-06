'use client'

import { motion } from 'motion/react'

import { Counter } from '@atoms/Counter'
import { EASE } from '@constants/motion'
import { PRICE, SPECS } from '@domain/light'
import { SectionTitle } from '@molecules/SectionTitle'

export function Specs() {
  return (
    <section className="border-t border-line py-20 md:py-24">
      <div className="wrap">
        <SectionTitle>Ficha técnica</SectionTitle>
        <motion.dl
          className="m-0 mt-8 grid gap-x-12 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.06 }}
        >
          {SPECS.map(([term, value]) => (
            <motion.div
              key={term}
              className="flex justify-between gap-4 border-b border-line py-3"
              variants={{
                hidden: { opacity: 0, x: -12 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
            >
              <dt className="text-muted">{term}</dt>
              <dd className="m-0 text-right font-mono text-[15px]">{value}</dd>
            </motion.div>
          ))}
        </motion.dl>
        <div id="comprar" className="mt-[50px] scroll-mt-10">
          <div className="font-display text-[clamp(64px,10vw,130px)] leading-[.9]">
            <Counter value={PRICE} prefix="R$ " />
          </div>
        </div>
      </div>
    </section>
  )
}
