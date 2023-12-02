import { useCallback, useEffect, useMemo, useRef } from "react"
import { useLocation } from "react-router-dom"
import { useSpring, animated, easings, config } from "@react-spring/three"
import { DoubleSide, Group } from "three"
import { PlatformProps } from "../Platform"
import { PORTAL_RADIUS } from "../../utils/constants"
import ContactIcons from "../ContactIcons"
import Floor from "../Floor"
import HomePortal from "../HomePortal"
import AwayPortal from "../AwayPortal"
import MultiCat from "../MultiCat"
import { GOLD_COLOR, GOLD_EMISSIVE, SUMMON_CIRCLE_RADIUS } from '../../utils/constants'
import useNeonMaterial from '../../utils/useNeonMaterial'

function ContactPlatform({ position }: Partial<PlatformProps>) {
  const catRef = useRef<Group>(null!)
  const portalsRef = useRef<Group>(null!)
  const activeSummon = useRef('')
  const squareRef = useRef<Group>(null!)
  const neonMaterial = useNeonMaterial()
  const [fadeSprings, fadeApi] = useSpring(() => ({
    opacity: 0,
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

  const { pathname } = useLocation()
  const [swirlySpring, swirlyApi] = useSpring(() => ({
    scale: 0,
  }))
  const [catSpring, catApi] = useSpring(() => ({
    positionZ: -20,
  }))

  const stopSummoning = useCallback(() => {
    swirlyApi.stop()
    swirlyApi.start({
      scale: 0,
      onRest() {
        portalsRef.current.visible = false    
        catRef.current.visible = false
      },
    })

    catRef.current.visible = false
    catApi.stop()
    catApi.set({
      positionZ: -20
    })

    fadeApi.start({
      opacity: 0,
      config: config.default,
    })
    spinApi.stop()
  }, [])

  const animateSummon = useCallback(() => {
    const currentSummon = getActiveSummon()

    if (currentSummon) {
      swirlyApi.start({
        scale: 1,
        delay: 3500,
        onStart() {
          portalsRef.current.visible = true
        },
      })

      catApi.start({
        from: { positionZ: -20 },
        positionZ: 26,
        delay: 4000,
        config: {
          duration: 5000,
          easing: easings.linear,
        },
        onStart() {
          catRef.current.visible = true
        },
        onRest: stopSummoning,
      })

      fadeApi.start({
        from: { opacity: 0 },
        opacity: 1,
        delay: 1000,
        config: { duration: 2000 },
      })
      spinApi.stop()
      spinApi.start({
        to: async (next) => {
          await next({
            from: { rotationZ: 0 },
            rotationZ: 2 * Math.PI,
            delay: 1000,
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
    }
  }, [])

  const getActiveSummon = useCallback(() => activeSummon.current, [])

  const setActiveSummon = useCallback((newSummon: string) => {
    activeSummon.current = newSummon

    if (newSummon) {
      animateSummon()
    } else {
      stopSummoning()
    }
  }, [])

  useEffect(() => {
    swirlyApi.set({ scale: 0 })
  }, [pathname, swirlyApi])

  return (
    <group position={position}>
      <group position-x={-2} position-y={7} rotation-y={Math.PI / 2}>
        <group
          ref={portalsRef}
          position-y={PORTAL_RADIUS}
          visible={false}
        >
          <group position-z={-10}>
            <animated.group scale={swirlySpring.scale}>
              <HomePortal
                scale-x={1.5}
                scale-y={1.5}
                getType={getActiveSummon}
              />
            </animated.group>
            <mesh position-z={-5.9} rotation-x={Math.PI / 2}>
              <cylinderGeometry args={[6, 6, 12, 32, 1, true]} />
              <meshStandardMaterial
                colorWrite={false}
              />
            </mesh>
          </group>
          <group position-z={20}>
            <animated.group scale={swirlySpring.scale}>
              <AwayPortal
                scale-x={1.5}
                scale-y={1.5}
                rotation-y={Math.PI}
                getType={getActiveSummon}
              />
            </animated.group>
            <mesh position-z={6} rotation-x={Math.PI / 2}>
              <cylinderGeometry args={[6, 6, 12, 32, 1, true]} />
              <meshStandardMaterial
                colorWrite={false}
              />
            </mesh>
          </group>
        </group>
        <animated.group
          ref={catRef}
          position-z={catSpring.positionZ}
          visible={false}
        >
          <MultiCat
            scale={[2.1, 2.1, 2.1]}
            rotation-x={Math.PI / 3.5}
            position-y={1}
            castShadow
            catHome="/contact"
          />
        </animated.group>
      </group>
      <ContactIcons position-y={4} setActiveSummon={setActiveSummon} />
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
      <Floor />
    </group>
  )
}

export default ContactPlatform
