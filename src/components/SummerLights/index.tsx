import { useEffect, useMemo, useRef } from "react"
import { CylinderGeometry, Color, Group } from "three"
import { PARTICLE_CLOUD_COUNT, PARTICLE_CLOUD_RADIUS } from "../../utils/constants"
import { Instances } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"
import ParticleInstance from "../ParticleInstance"
import useNeonMaterial from "../../utils/useNeonMaterial"

const randomVector = (r: number) => [r / 2 - Math.random() * r, r / 2 - Math.random() * r, r / 2 - Math.random() * r]
const randomEuler = () => [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]

function SummerLights({ count = PARTICLE_CLOUD_COUNT }: SummerLightsProps) {
  const groupRef = useRef<Group>(null!)
  const neonMaterial = useNeonMaterial()

  const data1 = useMemo(() => Array.from(
    { length: count / 3 },
    (r:number = PARTICLE_CLOUD_RADIUS) => ({
      random: Math.random(),
      position: randomVector(r),
      rotation: randomEuler(),
      scale: Math.random() * 0.5 + 0.5,
    })),
  [count])

  const data2 = useMemo(() => Array.from(
    { length: count / 3 },
    (r:number = PARTICLE_CLOUD_RADIUS) => ({
      random: Math.random(),
      position: randomVector(r),
      rotation: randomEuler(),
      scale: Math.random() * 0.5 + 0.5,
    })),
  [count])

  const data3 = useMemo(() => Array.from(
    { length: count / 3 },
    (r:number = PARTICLE_CLOUD_RADIUS) => ({
      random: Math.random(),
      position: randomVector(r),
      rotation: randomEuler(),
      scale: Math.random() * 0.5 + 0.5,
    })),
  [count])

  const [matRed, matWhite, matBlue] = useMemo(() => {
    neonMaterial.metalness = 0
    neonMaterial.roughness = 1

    const matRed = neonMaterial.clone()
    const matWhite = neonMaterial.clone()
    const matBlue = neonMaterial.clone()

    matRed.color = new Color('red')
    matRed.emissive = new Color(2, 0, 0)
    matWhite.color = new Color('white')
    matWhite.emissive = new Color(2, 2, 2)
    matBlue.color = new Color('#03adfc')
    matBlue.emissive = new Color(0, 0, 2)

    return [matRed, matWhite, matBlue]
  }, [neonMaterial])

  const lightGeometry = useMemo(() => {
    return new CylinderGeometry(0.1, 0.1, 0.3)
  }, [])

  // const [springs, api] = useSpring(() => ({ x: 0, y: 0, z: 0 }))

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() / 6
  })

  return (
    <animated.group
      ref={groupRef}
      position-y={PARTICLE_CLOUD_RADIUS / 4}
      visible={false}
    >
      {/* 
      // @ts-ignore */}
      <Instances castShadow material={matRed} geometry={lightGeometry}>
        {data1.map((props, i) => (
          <ParticleInstance key={i} {...props} />
        ))}
      </Instances>
      {/* 
      // @ts-ignore */}
      <Instances castShadow material={matWhite} geometry={lightGeometry}>
        {data2.map((props, i) => (
          <ParticleInstance key={i} {...props} />
        ))}
      </Instances>
      {/* 
      // @ts-ignore */}
      <Instances castShadow material={matBlue} geometry={lightGeometry}>
        {data3.map((props, i) => (
          <ParticleInstance key={i} {...props} />
        ))}
      </Instances>
    </animated.group>
  )
}

interface SummerLightsProps {
  count?: number
}

export default SummerLights
