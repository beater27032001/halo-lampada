import { Beam } from '@organisms/Beam'
import { LightProvider } from '@providers/LightProvider'
import { MotionProvider } from '@providers/MotionProvider'

export default function Home() {
  return (
    <MotionProvider>
      <LightProvider>
        <Beam />
      </LightProvider>
    </MotionProvider>
  )
}
