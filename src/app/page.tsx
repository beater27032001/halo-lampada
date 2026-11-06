import { Beam } from '@organisms/Beam'
import { ControlPanel } from '@organisms/ControlPanel'
import { Hero } from '@organisms/Hero'
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
        <Beam />
        <ControlPanel />
      </LightProvider>
    </MotionProvider>
  )
}
