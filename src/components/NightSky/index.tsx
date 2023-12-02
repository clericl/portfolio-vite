import { useEffect } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import { RGBELoader } from 'three-stdlib'

import starry from '../../assets/env/starry.hdr'

function NightSky() {
  const tex = useLoader(RGBELoader, starry)
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    // @ts-ignore
    scene.background = tex
    scene.backgroundIntensity = 2
  }, [scene, tex])

  return null
}

export default NightSky
