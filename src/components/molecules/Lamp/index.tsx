'use client'

import { useState } from 'react'

import { motion, useTransform } from 'motion/react'
import dynamic from 'next/dynamic'

import { useLight } from '@providers/LightProvider'

// three.js só no navegador, num pedaço separado do bundle
const Scene = dynamic(() => import('./Scene'), { ssr: false })

/**
 * Luminária em anel, em 3D: aro de alumínio, difusor que acende na cor escolhida e brilho que segue o controle.
 * Fica acima da camada escura: é ela a fonte de luz.
 */
export function Lamp() {
  const { kelvinMotion, brightnessMotion } = useLight()
  const [ready, setReady] = useState(false)
  const bloom = useTransform(brightnessMotion, [5, 100], [0.25, 1])
  const bloomScale = useTransform(brightnessMotion, [5, 100], [0.75, 1.15])

  return (
    <div
      aria-hidden
      className="relative z-45 mx-auto aspect-square w-full max-w-[420px] max-md:mt-20"
    >
      {/* brilho difuso em volta, cresce com o brilho */}
      <motion.div
        className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle,rgb(var(--k)/.6),rgb(var(--k)/0)_66%)] blur-xl"
        style={{ opacity: bloom, scale: bloomScale }}
      />
      {/* o quadro 3D passa do topo para o cabo subir até fora da vista */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[130%]"
        initial={{ opacity: 0, y: -40 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Scene
          kelvin={kelvinMotion}
          brightness={brightnessMotion}
          onReady={() => setReady(true)}
        />
      </motion.div>
    </div>
  )
}
