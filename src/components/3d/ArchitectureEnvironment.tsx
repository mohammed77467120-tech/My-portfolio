import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei/core/Float.js'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useIsMobile } from '../../hooks/useIsMobile'

/* Wireframe rectangular frame */
function WireframeFrame({
  position,
  rotation,
  scale,
  color,
  opacity = 0.3,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  color: string
  opacity?: number
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1.6, 0.02]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={opacity}
      />
    </mesh>
  )
}

/* Floating grid plane */
function GridPlane({
  position,
  rotation,
  size = 4,
  color,
  opacity = 0.08,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  size?: number
  color: string
  opacity?: number
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[size, size, 8, 8]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/* Thin copper line */
function CopperLine({
  start,
  end,
  color = '#B87333',
  opacity = 0.2,
}: {
  start: [number, number, number]
  end: [number, number, number]
  color?: string
  opacity?: number
}) {
  const lineObj = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute([...start, ...end], 3)
    )
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
    })
    return new THREE.Line(geometry, material)
  }, [start, end, color, opacity])

  return <primitive object={lineObj} />
}

export default function ArchitectureEnvironment() {
  const groupRef = useRef<THREE.Group>(null)
  const scrollProgress = useScrollProgress()
  const { isDark } = useTheme()
  const isMobile = useIsMobile()

  const wireColor = isDark ? '#F1EDE4' : '#1A1A1A'
  const copperColor = '#B87333'
  const copperOpacity = isDark ? 0.35 : 0.25

  useFrame((_state: unknown, delta: number) => {
    if (!groupRef.current) return
    // Slow perpetual rotation
    groupRef.current.rotation.y += delta * 0.015
    // Scroll-driven vertical shift
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -scrollProgress * 8,
      0.03
    )
  })

  if (isMobile) {
    // Simplified mobile scene
    return (
      <group ref={groupRef}>
        <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
          <WireframeFrame
            position={[0, 0, -3]}
            rotation={[0.1, 0.3, 0]}
            scale={[3, 3, 3]}
            color={copperColor}
            opacity={copperOpacity}
          />
        </Float>
        <WireframeFrame
          position={[2, -1, -5]}
          rotation={[0, -0.4, 0.1]}
          scale={[2, 2, 2]}
          color={wireColor}
          opacity={0.12}
        />
      </group>
    )
  }

  return (
    <group ref={groupRef}>
      {/* Main copper architectural frame */}
      <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.2}>
        <WireframeFrame
          position={[3, 0.5, -4]}
          rotation={[0.05, -0.3, 0.02]}
          scale={[3.5, 3.5, 3.5]}
          color={copperColor}
          opacity={copperOpacity}
        />
      </Float>

      {/* Secondary frame — deeper */}
      <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.15}>
        <WireframeFrame
          position={[-4, 1, -7]}
          rotation={[0.08, 0.6, -0.05]}
          scale={[4, 4, 4]}
          color={wireColor}
          opacity={0.12}
        />
      </Float>

      {/* Third frame — far right */}
      <WireframeFrame
        position={[6, -2, -10]}
        rotation={[0.1, -0.2, 0.08]}
        scale={[5, 5, 5]}
        color={wireColor}
        opacity={0.06}
      />

      {/* Small accent frame */}
      <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
        <WireframeFrame
          position={[-2, -1, -3]}
          rotation={[0.2, 0.8, 0.1]}
          scale={[1.5, 1.5, 1.5]}
          color={copperColor}
          opacity={copperOpacity * 0.7}
        />
      </Float>

      {/* Grid planes — spatial reference */}
      <GridPlane
        position={[0, -4, -6]}
        rotation={[-Math.PI / 2, 0, 0.2]}
        size={12}
        color={wireColor}
        opacity={0.04}
      />
      <GridPlane
        position={[-8, 0, -12]}
        rotation={[0, 0.3, 0]}
        size={8}
        color={wireColor}
        opacity={0.03}
      />

      {/* Copper accent lines */}
      <CopperLine
        start={[-5, 3, -8]}
        end={[5, -2, -6]}
        color={copperColor}
        opacity={isDark ? 0.15 : 0.1}
      />
      <CopperLine
        start={[4, 4, -10]}
        end={[-3, -3, -5]}
        color={copperColor}
        opacity={isDark ? 0.1 : 0.06}
      />
      <CopperLine
        start={[-6, -1, -4]}
        end={[2, 3, -9]}
        color={wireColor}
        opacity={0.05}
      />

      {/* Distant structural elements */}
      <WireframeFrame
        position={[0, 5, -15]}
        rotation={[0.3, 0.5, 0.1]}
        scale={[8, 8, 8]}
        color={wireColor}
        opacity={0.03}
      />
    </group>
  )
}
