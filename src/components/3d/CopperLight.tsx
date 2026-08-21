import { useTheme } from '../../context/ThemeContext'

export default function CopperLight() {
  const { isDark } = useTheme()

  return (
    <>
      {/* Ambient fill */}
      <ambientLight intensity={isDark ? 0.12 : 0.5} />

      {/* Main copper key light */}
      <directionalLight
        position={isDark ? [8, 12, 5] : [10, 15, 8]}
        intensity={isDark ? 0.4 : 0.7}
        color={isDark ? '#D4956A' : '#B87333'}
        castShadow={false}
      />

      {/* Cool fill light — opposite side */}
      <directionalLight
        position={[-6, 8, -4]}
        intensity={isDark ? 0.08 : 0.2}
        color={isDark ? '#8E9AAF' : '#B0C4DE'}
      />

      {/* Subtle warm backlight */}
      <pointLight
        position={[0, -5, -10]}
        intensity={isDark ? 0.15 : 0.05}
        color="#B87333"
        distance={30}
        decay={2}
      />
    </>
  )
}
