export const KELVIN_MIN = 2200
export const KELVIN_MAX = 6500
export const BRIGHTNESS_MIN = 5

export type Rgb = [number, number, number]

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

/** Cor aproximada de uma temperatura em kelvin (aproximação de Tanner Helland). */
export function kelvinToRgb(kelvin: number): Rgb {
  const t = kelvin / 100
  const r = t <= 66 ? 255 : 329.698727446 * (t - 60) ** -0.1332047592
  const g =
    t <= 66
      ? 99.4708025861 * Math.log(t) - 161.1195681661
      : 288.1221695283 * (t - 60) ** -0.0755148492
  const b =
    t >= 66
      ? 255
      : t <= 19
        ? 0
        : 138.5177312231 * Math.log(t - 10) - 305.0447927307
  return [r, g, b].map((v) => Math.round(clamp(v, 0, 255))) as Rgb
}

/** Raio e escuridão do feixe para um brilho de 5 a 100%. */
export function beam(brightness: number) {
  const b = clamp(brightness, BRIGHTNESS_MIN, 100) / 100
  return { radius: Math.round(90 + b * 330), dark: 0.985 - b * 0.25 }
}

export type Warmth = 'quente' | 'neutra' | 'fria'
export const warmth = (kelvin: number): Warmth =>
  kelvin <= 2700 ? 'quente' : kelvin <= 4000 ? 'neutra' : 'fria'

export const formatKelvin = (kelvin: number) =>
  `${Math.round(kelvin).toLocaleString('pt-BR')} K`

export interface Scene {
  id: string
  name: string
  kelvin: number
  brightness: number
  text: string
}

export const SCENES: Scene[] = [
  {
    id: 'leitura',
    name: 'Leitura',
    kelvin: 4000,
    brightness: 85,
    text: 'Branco neutro, 4000 K, com brilho alto e uniforme sobre a página.',
  },
  {
    id: 'cinema',
    name: 'Cinema',
    kelvin: 2700,
    brightness: 28,
    text: 'Âmbar baixo, 2700 K, sem ofuscar a tela da TV.',
  },
  {
    id: 'foco',
    name: 'Foco',
    kelvin: 6500,
    brightness: 100,
    text: 'Branco frio, 6500 K, no brilho máximo para trabalho de detalhe.',
  },
  {
    id: 'noite',
    name: 'Noite',
    kelvin: 2200,
    brightness: 12,
    text: 'Luz de vela, 2200 K, a 12%. Dá para achar o caminho sem acordar ninguém.',
  },
]

export const KELVIN_SCALE = [2200, 2700, 4000, 5000, 6500]

export const SPECS: [string, string][] = [
  ['Fluxo luminoso', '1.100 lm'],
  ['Potência', '11 W'],
  ['Temperatura', '2200–6500 K'],
  ['IRC', '95'],
  ['Conexão', 'Wi-Fi 2,4 GHz · Matter'],
  ['Vida útil', '25.000 h'],
]

export const PRICE = 189

export const INITIAL = { kelvin: 3000, brightness: 60 }
