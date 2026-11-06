// Gera os prints do README: npm run build && npm run screenshots
import { spawn } from 'node:child_process'

import { chromium, type Page } from 'playwright'

interface Shot {
  name: string
  width: number
  height: number
  full?: boolean
  /** Prepara a página antes do print (mover o mouse, clicar, rolar). */
  setup?: (page: Page) => Promise<void>
}

const beamOnLamp = async (page: Page) => {
  const lamp = await page.locator('.aspect-square').first().boundingBox()
  if (lamp)
    await page.mouse.move(
      lamp.x + lamp.width / 2,
      lamp.y + lamp.height * 0.55,
      {
        steps: 6,
      },
    )
}
const lightUp = async (page: Page) => {
  await page.click('[aria-label="Acender a página toda"]')
}
const scene = (name: string) => async (page: Page) => {
  await page.getByRole('region').getByRole('button', { name }).click()
}
const scrollThrough = async (page: Page) => {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })
}

const SHOTS: Shot[] = [
  { name: 'desktop', width: 1440, height: 900, setup: beamOnLamp },
  {
    name: 'desktop-cinema',
    width: 1440,
    height: 900,
    setup: async (p) => {
      await scene('Cinema')(p)
      await beamOnLamp(p)
    },
  },
  {
    name: 'desktop-lit',
    width: 1440,
    height: 900,
    setup: async (p) => {
      await lightUp(p)
      await p.locator('section').first().scrollIntoViewIfNeeded()
    },
  },
  { name: 'tablet', width: 820, height: 1180, setup: beamOnLamp },
  { name: 'mobile', width: 390, height: 844, setup: beamOnLamp },
  {
    name: 'mobile-full',
    width: 390,
    height: 844,
    full: true,
    setup: async (p) => {
      await lightUp(p)
      await scrollThrough(p)
    },
  },
]

const server = spawn('node_modules/.bin/next', ['start', '-p', '4173'])
await new Promise((resolve, reject) => {
  server.stdout.on('data', (d) => String(d).includes('Ready') && resolve(null))
  server.on('exit', (code) => reject(new Error(`next start saiu com ${code}`)))
})
const browser = await chromium.launch()
const errors: string[] = []

for (const shot of SHOTS) {
  const page = await browser.newPage({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 2,
  })
  page.on('pageerror', (e) => errors.push(`${shot.name}: ${e.message}`))
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2200)
  if (shot.setup) {
    await shot.setup(page)
    await page.waitForTimeout(1600)
  }
  await page.screenshot({ path: `docs/${shot.name}.png`, fullPage: shot.full })
  await page.close()
}

await browser.close()
server.kill()
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log('prints salvos em docs/')
