// Rode com: npm run check
import assert from 'node:assert/strict'

import { beam, formatKelvin, kelvinToRgb, warmth } from './light.ts'

const [r, , b] = kelvinToRgb(2200)
assert.ok(r === 255 && b < 120, 'luz quente: vermelho cheio, pouco azul')
assert.ok(
  kelvinToRgb(6500).every((c) => c > 245),
  'luz do dia: branco quase puro',
)
for (const k of [2200, 3000, 5000, 6500])
  for (const c of kelvinToRgb(k)) assert.ok(c >= 0 && c <= 255)
assert.deepEqual(beam(100), { radius: 420, dark: 0.735 })
assert.equal(beam(0).radius, beam(5).radius, 'brilho tem piso de 5%')
assert.equal(warmth(2700), 'quente')
assert.equal(warmth(4000), 'neutra')
assert.equal(warmth(6500), 'fria')
assert.equal(formatKelvin(4000), '4.000 K')
console.log('light ok')
