import { useCallback, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { useFrame } from "@react-three/fiber"
import { useSpring, animated, easings } from "@react-spring/three"
import { Group } from "three"
import { PlatformProps } from "../Platform"
import { PORTAL_RADIUS } from "../../utils/constants"
import Cat from "../Cat"
import ContactIcons from "../ContactIcons"
import Floor from "../Floor"
import SummonCircle from "../SummonCircle"
import HomePortal from "../HomePortal"
import AwayPortal from "../AwayPortal"

function ContactPlatform({ position }: Partial<PlatformProps>) {
  const stateCheck = useRef<string | null>(null)
  const catRef = useRef<Group>(null!)
  const portalsRef = useRef<Group>(null!)
  const activeSummon = useRef('')
  const { pathname } = useLocation()
  const [swirlySpring, swirlyApi] = useSpring(() => ({
    scale: 0,
  }))
  const [catSpring, catApi] = useSpring(() => ({
    positionZ: -20,
  }))

  const getActiveSummon = useCallback(() => activeSummon.current, [])

  const setActiveSummon = useCallback((newSummon: string) => {
    stateCheck.current = newSummon
    activeSummon.current = newSummon
  }, [])

  useFrame(() => {
    if (stateCheck.current !== null) {
      if (activeSummon.current) {
        swirlyApi.start({
          scale: 1,
          delay: 4000,
          onStart() {
            portalsRef.current.visible = true
          },
        })

        catApi.start({
          from: { positionZ: -20 },
          positionZ: 26,
          delay: 4500,
          config: {
            duration: 5000,
            easing: easings.linear,
          },
          onStart() {
            catRef.current.visible = true
          },
          onRest() {
            setActiveSummon('')
          },
        })
      } else {
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
      }
      stateCheck.current = null
    }
  })

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
        {pathname === '/contact' && (
          <animated.group
            ref={catRef}
            position-z={catSpring.positionZ}
            visible={false}
          >
            <Cat
              scale={[2.1, 2.1, 2.1]}
              rotation-x={Math.PI / 3.5}
              position-y={1}
              castShadow
            />
          </animated.group>
        )}
      </group>
      <ContactIcons position-y={4} setActiveSummon={setActiveSummon} />
      <SummonCircle getActiveSummon={getActiveSummon} />
      <Floor />
    </group>
  )
}

export default ContactPlatform
