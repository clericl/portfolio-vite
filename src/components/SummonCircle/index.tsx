import { useCallback, useMemo, useRef, RefObject } from 'react'
import { useSpring, animated, config, easings } from '@react-spring/three'
import { DoubleSide, Group } from 'three'
import { GroupProps } from '@react-three/fiber'
import { GOLD_COLOR, GOLD_EMISSIVE, SUMMON_CIRCLE_RADIUS } from '../../utils/constants'
import useNeonMaterial from '../../utils/useNeonMaterial'

function SummonCircle({ getActiveSummon, animRef }: SummonCircleProps) {
  const squareRef = useRef<Group>(null!)
  const neonMaterial = useNeonMaterial()
  const [fadeSprings, fadeApi] = useSpring(() => ({
    opacity: 1,
    config: config.molasses,
  }))
  const [spinSprings, spinApi] = useSpring(() => ({
    rotationZ: 0,
  }))

  const magicMaterial = useMemo(() => {
    const mat = neonMaterial.clone()
    mat.color = GOLD_COLOR
    mat.emissive = GOLD_EMISSIVE
    mat.depthWrite = false
    mat.transparent = true
    mat.side = DoubleSide
    return mat
  }, [neonMaterial])

  const magicSquareLength = useMemo(() => Math.sqrt(Math.pow(SUMMON_CIRCLE_RADIUS, 2) / 2), [])

  const animateSummoning = useCallback(() => {
    const activeSummon = getActiveSummon()

    if (activeSummon) {
      fadeApi.start({
        from: { opacity: 0 },
        opacity: 1,
        delay: 1500,
        config: { duration: 2000 },
      })
      spinApi.stop()
      spinApi.start({
        to: async (next) => {
          await next({
            from: { rotationZ: 0 },
            rotationZ: 2 * Math.PI,
            delay: 1500,
            config: {
              duration: 3000,
              easing: easings.easeInQuad,
            },
          })
          await next({
            from: { rotationZ: 0 },
            rotationZ: 2 * Math.PI,
            loop: true,
            config: {
              duration: 1600,
              easing: easings.linear,
            },
          })
        },
      })
    } else {
      fadeApi.start({
        opacity: 0,
        config: config.default,
      })
      spinApi.stop()
    }
  }, [])

  return (
    <animated.group
      position-y={0.6}
      rotation-x={Math.PI / 2}
      rotation-z={spinSprings.rotationZ}
    >
      <group ref={squareRef}>
        <animated.mesh receiveShadow={false} material={magicMaterial} material-opacity={fadeSprings.opacity} position-x={magicSquareLength}>
          <cylinderGeometry args={[0.02, 0.02, magicSquareLength * 2]} />
        </animated.mesh>
        <animated.mesh receiveShadow={false} material={magicMaterial} material-opacity={fadeSprings.opacity} position-x={-magicSquareLength}>
          <cylinderGeometry args={[0.02, 0.02, magicSquareLength * 2]} />
        </animated.mesh>
        <animated.mesh receiveShadow={false} material={magicMaterial} material-opacity={fadeSprings.opacity} rotation-z={Math.PI / 2} position-y={magicSquareLength}>
          <cylinderGeometry args={[0.02, 0.02, magicSquareLength * 2]} />
        </animated.mesh>
        <animated.mesh receiveShadow={false} material={magicMaterial} material-opacity={fadeSprings.opacity} rotation-z={Math.PI / 2} position-y={-magicSquareLength}>
          <cylinderGeometry args={[0.02, 0.02, magicSquareLength * 2]} />
        </animated.mesh>
      </group>
      <animated.mesh
        material={magicMaterial}
        material-opacity={fadeSprings.opacity}
      >
        <torusGeometry args={[SUMMON_CIRCLE_RADIUS, 0.02, 16, 100]} />
      </animated.mesh>
    </animated.group>
  )
}

type SummonCircleProps = GroupProps & {
  getActiveSummon: Function
  setActiveSummon: Function
  animRef: RefObject<Function>
}

export default SummonCircle
