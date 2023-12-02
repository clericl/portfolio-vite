import { useCallback, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { useFrame } from "@react-three/fiber"
import {
  useSpring,
  animated,
} from "@react-spring/three"
import { PlatformProps } from "../Platform"
import { Group } from "three"
import { Season } from "../../utils/constants"
import AutumnLeaves from "../AutumnLeaves"
import CherryBlossoms from "../CherryBlossoms"
import SummerLights from "../SummerLights"
import WinterSnowflakes from "../WinterSnowflakes"
import Floor from "../Floor"
import MultiCat from "../MultiCat"
import SeasonsBoard from "../SeasonsBoard"

function AboutPlatform({ position }: Partial<PlatformProps>) {
  const boardRef = useRef<Group>(null!)
  const seasonRef = useRef<Season>(Season.Spring)
  const lockoutRef = useRef(false)

  const seasonGroups = new Array(
    useRef<Group>(null!),
    useRef<Group>(null!),
    useRef<Group>(null!),
    useRef<Group>(null!),
  )

  const yPositionRef = useRef<number>(0)
  const { pathname } = useLocation()

  const [springs, api] = useSpring(() => ({ x: 1, y: 1, z: 1 }))

  const animateSeasonOpening = useCallback(() => {
    seasonGroups.forEach((ref) => ref.current.visible = false)
    seasonGroups[seasonRef.current].current.visible = true
    lockoutRef.current = false

    console.log(seasonGroups)

    api.start({
      x: 1,
      y: 1,
      z: 1,
    })
  }, [api])

  const getLockoutStatus = useCallback(() => {
    return lockoutRef.current
  }, [])

  const getSeason = useCallback(() => {
    return seasonRef.current
  }, [])

  const setSeason = useCallback((newSeason: Season) => {
    lockoutRef.current = true
    seasonRef.current = newSeason

    api.start({
      x: 0,
      y: 0,
      z: 0,
      onRest: () => animateSeasonOpening(),
    })
  }, [api])

  const switchSeasons = useCallback((newSeason?: Season) => {
    const isLockedOut = getLockoutStatus()
    if (isLockedOut) return;

    const currentSeason = getSeason()
    let nextSeason = -1

    console.log(currentSeason)

    if (typeof newSeason !== 'undefined') {
      if (newSeason !== currentSeason) {
        nextSeason = newSeason
      }
    } else {
      nextSeason = (currentSeason + 1) % 4
    }

    if (nextSeason >= 0) {
      setSeason(nextSeason)
    }
  }, [getSeason, setSeason])

  useEffect(() => {
    if (pathname !== '/about') {
      api.start({
        x: 0,
        y: 0,
        z: 0,
      })
    } else {
      animateSeasonOpening()
    }
  }, [api, pathname])

  useFrame((_, delta) => {
    yPositionRef.current += delta * 4
    boardRef.current.position.y = Math.sin(yPositionRef.current) / 8
  })

  return (
    <group position={position} rotation-y={Math.PI}>
      <group ref={boardRef}>
        <SeasonsBoard
          open={pathname === '/about'}
          position-y={2.2}
          switchSeasons={switchSeasons}
        />
      </group>
      <animated.group
        scale-x={springs.x}
        scale-y={springs.y}
        scale-z={springs.z}
      >
        <group ref={seasonGroups[0]}>
          <CherryBlossoms />
        </group>
        <group ref={seasonGroups[1]}>
          <SummerLights />
        </group>
        <group ref={seasonGroups[2]}>
          <AutumnLeaves />
        </group>
        <group ref={seasonGroups[3]}>
          <WinterSnowflakes />
        </group>
      </animated.group>
      <MultiCat
        position={[7.2, 0, 1.5]}
        scale={[2.1, 2.1, 2.1]}
        rotation-y={-Math.PI / 8 * 2.75}
        castShadow
        catHome="/about"
      />
      <Floor />
    </group>
  )
}

export default AboutPlatform
