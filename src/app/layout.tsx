import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'

import './globals.css'

const display = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
})
const body = Geist({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-geist',
})
const mono = Geist_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Halo Lâmpada',
  description:
    'Halo: a lâmpada inteligente que muda de cor e brilho com você. A página começa apagada; ilumine com o cursor.',
}

export const viewport: Viewport = {
  themeColor: '#060607',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
