'use client'

import { useMemo, useRef } from 'react'

import { Environment, Lightformer } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion, type MotionValue } from 'motion/react'
import {
  BackSide,
  Color,
  LatheGeometry,
  SRGBColorSpace,
  Vector2,
  type Group,
  type MeshStandardMaterial,
  type PointLight,
} from 'three'

import { kelvinToRgb } from '@domain/light'

import { Fallback } from './Fallback'

interface Props {
  kelvin: MotionValue<number>
  brightness: MotionValue<number>
  onReady: () => void
}

// Medidas do aro, em unidades da cena (o raio externo é 1).
const RADIUS = 1
const BAND = 0.13 // largura radial do aro
const DEPTH = 0.17 // profundidade do aro
const CORNER = 0.03
// O cabo sobe até acima do quadro; o balanço gira em torno desse ponto.
const PIVOT = 2.4

/** Seção do aro: retângulo de cantos arredondados que o torno gira em 360°. */
function ringSection() {
  const inner = RADIUS - BAND
  const h = DEPTH / 2
  const pts: Vector2[] = []
  const arc = (cx: number, cy: number, from: number) => {
    for (let i = 0; i <= 6; i++) {
      const a = from + (i / 6) * (Math.PI / 2)
      pts.push(
        new Vector2(cx + Math.cos(a) * CORNER, cy + Math.sin(a) * CORNER),
      )
    }
  }
  arc(RADIUS - CORNER, -h + CORNER, -Math.PI / 2)
  arc(RADIUS - CORNER, h - CORNER, 0)
  arc(inner + CORNER, h - CORNER, Math.PI / 2)
  arc(inner + CORNER, -h + CORNER, Math.PI)
  pts.push(pts[0].clone())
  return pts
}

/** Brilho de 5 a 100% para a intensidade do difusor; acima de 1 a cor satura e perde o tom. */
const glow = (b: number) => 0.3 + ((b - 5) / 95) * 0.7

function Luminaire({ kelvin, brightness }: Omit<Props, 'onReady'>) {
  const reduced = useReducedMotion()
  const hang = useRef<Group>(null)
  const turn = useRef<Group>(null)
  const front = useRef<MeshStandardMaterial>(null)
  const inside = useRef<MeshStandardMaterial>(null)
  const light = useRef<PointLight>(null)
  const color = useRef(new Color())
  const pointer = useRef(0)

  const housing = useMemo(() => {
    const g = new LatheGeometry(ringSection(), 160)
    g.rotateX(Math.PI / 2) // o eixo do torno passa a apontar para a câmera
    return g
  }, [])

  useFrame((state) => {
    const [r, g, b] = kelvinToRgb(kelvin.get())
    const c = color.current.setRGB(r / 255, g / 255, b / 255, SRGBColorSpace)
    const level = glow(brightness.get())
    for (const m of [front.current!, inside.current!]) {
      m.emissive.copy(c)
      m.emissiveIntensity = level
    }
    light.current!.color.copy(c)
    light.current!.intensity = level * 4

    if (reduced) return
    const t = state.clock.elapsedTime
    pointer.current += (state.pointer.x * 0.3 - pointer.current) * 0.04
    hang.current!.rotation.z = Math.sin(t * 0.8) * 0.03
    turn.current!.rotation.y = Math.sin(t * 0.35) * 0.45 + pointer.current
  })

  return (
    <group ref={hang} position={[0, PIVOT, 0]}>
      <group position={[0, -PIVOT, 0]}>
        {/* cabo de aço e presilha */}
        <mesh position={[0, RADIUS + 1.5, 0]}>
          <cylinderGeometry args={[0.007, 0.007, 3, 8]} />
          <meshStandardMaterial
            color="#8b8f93"
            metalness={1}
            roughness={0.35}
          />
        </mesh>
        <mesh position={[0, RADIUS + 0.03, 0]}>
          <cylinderGeometry args={[0.028, 0.028, 0.08, 20]} />
          <meshStandardMaterial
            color="#d7d4cd"
            metalness={1}
            roughness={0.22}
          />
        </mesh>

        <group ref={turn}>
          {/* aro de alumínio anodizado */}
          <mesh geometry={housing}>
            <meshPhysicalMaterial
              color="#d9d5cc"
              metalness={0.85}
              roughness={0.3}
              clearcoat={0.3}
            />
          </mesh>
          {/* difusor opalino na frente do aro */}
          <mesh position={[0, 0, DEPTH / 2 + 0.002]}>
            <ringGeometry args={[RADIUS - BAND + 0.028, RADIUS - 0.028, 160]} />
            <meshStandardMaterial
              ref={front}
              color="#000000"
              roughness={0.9}
              toneMapped={false}
            />
          </mesh>
          {/* difusor na face interna, que aparece quando a luminária gira */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry
              args={[
                RADIUS - BAND - 0.002,
                RADIUS - BAND - 0.002,
                DEPTH - 0.05,
                160,
                1,
                true,
              ]}
            />
            <meshStandardMaterial
              ref={inside}
              color="#000000"
              roughness={0.9}
              side={BackSide}
              toneMapped={false}
            />
          </mesh>
          {/* a própria luz ilumina o aro por dentro */}
          <pointLight ref={light} distance={3} decay={2} />
        </group>
      </group>
    </group>
  )
}

/** Ambiente de estúdio discreto: dá reflexo ao alumínio sem clarear a página escura. */
function Studio() {
  return (
    <Environment resolution={128} frames={1} environmentIntensity={0.45}>
      <Lightformer
        form="rect"
        intensity={2}
        scale={[8, 3, 1]}
        position={[0, 5, 2]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Lightformer
        form="rect"
        intensity={1}
        scale={[2, 6, 1]}
        position={[-5, 0, 3]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Lightformer
        form="rect"
        intensity={0.6}
        scale={[2, 6, 1]}
        position={[5, 0, 3]}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </Environment>
  )
}

export default function Scene({ onReady, ...light }: Props) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 30, near: 0.1, far: 50, position: [0, 0.36, 5.82] }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 0.36, 0)
        onReady()
      }}
      fallback={<Fallback />}
    >
      <Studio />
      <ambientLight intensity={0.25} />
      <Luminaire {...light} />
    </Canvas>
  )
}
