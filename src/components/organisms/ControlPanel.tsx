'use client'

import { motion, useTransform } from 'motion/react'

import { PowerIcon } from '@atoms/PowerIcon'
import { EASE } from '@constants/motion'
import {
  BRIGHTNESS_MIN,
  formatKelvin,
  KELVIN_MAX,
  KELVIN_MIN,
  SCENES,
} from '@domain/light'
import { cn } from '@lib/utils'
import { Slider } from '@molecules/Slider'
import { useLight } from '@providers/LightProvider'

/** O "app" da lâmpada, fixo embaixo da página. */
export function ControlPanel() {
  const light = useLight()
  const kelvinText = useTransform(light.kelvinMotion, formatKelvin)
  const brightnessText = useTransform(
    light.brightnessMotion,
    (v) => `${Math.round(v)}%`,
  )

  return (
    <motion.div
      role="region"
      aria-label="Controle da lâmpada"
      className="fixed bottom-[calc(14px+env(safe-area-inset-bottom,0px))] left-1/2 z-60 grid w-[min(720px,calc(100%-24px))] -translate-x-1/2 grid-cols-[auto_1fr] items-center gap-x-[18px] gap-y-3 rounded-[18px] border border-app-line bg-app/90 p-3 text-app-fg shadow-[0_20px_50px_rgb(0_0_0/.5)] backdrop-blur-md sm:grid-cols-[auto_1fr_1fr] sm:px-4 sm:py-3.5"
      initial={{ y: 140, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 1, ease: EASE }}
    >
      <motion.button
        aria-pressed={light.lit}
        aria-label={light.lit ? 'Apagar a página' : 'Acender a página toda'}
        onClick={light.toggleLit}
        whileTap={{ scale: 0.92 }}
        className={cn(
          'row-span-2 grid size-[52px] place-items-center rounded-full border border-app-line transition-[background,color,box-shadow] duration-300',
          light.lit
            ? 'bg-[rgb(var(--k))] text-[#1a1a1a] shadow-[0_0_24px_rgb(var(--k)/.7)]'
            : 'bg-[#222226] hover:bg-[#2a2a2e]',
        )}
      >
        <PowerIcon />
      </motion.button>
      <Slider
        id="kelvin"
        label="Cor"
        display={kelvinText}
        value={light.kelvin}
        min={KELVIN_MIN}
        max={KELVIN_MAX}
        step={50}
        className="range-kelvin"
        onChange={light.setKelvin}
      />
      <Slider
        id="brightness"
        label="Brilho"
        display={brightnessText}
        value={light.brightness}
        min={BRIGHTNESS_MIN}
        max={100}
        className="range-brightness"
        onChange={light.setBrightness}
      />
      <div className="col-span-full flex flex-wrap gap-1.5 sm:col-start-2">
        {SCENES.map((scene) => (
          <button
            key={scene.id}
            aria-pressed={light.scene === scene.id}
            onClick={() => light.applyScene(scene)}
            className="rounded-full border border-app-line bg-[#1d1d20] px-3 py-1.5 text-[13px] transition-colors hover:border-app-muted aria-pressed:border-[rgb(var(--k))] aria-pressed:text-[rgb(var(--k))]"
          >
            {scene.name}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
