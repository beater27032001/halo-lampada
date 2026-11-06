import { Beam } from '@organisms/Beam'
import { ColorScale } from '@organisms/ColorScale'
import { ControlPanel } from '@organisms/ControlPanel'
import { Footer } from '@organisms/Footer'
import { Hero } from '@organisms/Hero'
import { Moods } from '@organisms/Moods'
import { Nav } from '@organisms/Nav'
import { Specs } from '@organisms/Specs'
import { LightProvider } from '@providers/LightProvider'
import { MotionProvider } from '@providers/MotionProvider'

export default function Home() {
  return (
    <MotionProvider>
      <LightProvider>
        <div className="wrap">
          <Nav />
          <Hero />
        </div>
        <Moods />
        <ColorScale />
        <Specs />
        <Footer />
        <Beam />
        <ControlPanel />
      </LightProvider>
    </MotionProvider>
  )
}
