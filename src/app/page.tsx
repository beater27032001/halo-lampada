import { Beam } from '@organisms/Beam'
import { ColorScale } from '@organisms/ColorScale'
import { ControlPanel } from '@organisms/ControlPanel'
import { Hero } from '@organisms/Hero'
import { Moods } from '@organisms/Moods'
import { Nav } from '@organisms/Nav'
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
        <Beam />
        <ControlPanel />
      </LightProvider>
    </MotionProvider>
  )
}
