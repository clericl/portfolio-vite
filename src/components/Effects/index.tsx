// @ts-nocheck

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

function Effects() {
  const bloomRef = useRef()

  useFrame(({ clock }) => {
    bloomRef.current.intensty = (Math.sin(clock.elapsedTime / 2) + 2) / 6
  })

  return (
    <EffectComposer>
      <Bloom ref={bloomRef} luminanceThreshold={1} mipmapBlur intensity={0.3} />
    </EffectComposer>
  )
}

export default Effects
