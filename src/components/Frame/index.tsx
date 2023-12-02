import { useContext, useEffect, useRef, useState } from 'react'
import { useCursor, useTexture } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { Color, Mesh } from 'three'
import { ModalContext } from '../Modal'
import { GOLDEN_RATIO } from '../../utils/constants'
import useNeonMaterial from '../../utils/useNeonMaterial'

const BASE_EMISSIVE = new Color(0.21, 0.21, 0.5)
const TARGET_EMISSIVE = new Color(0.21, 0.21, 2)

const BASE_COLOR = new Color('black')
const TARGET_COLOR = new Color('#534ecf')

function Frame({
  name,
  url,
  index,
}: FrameProps) {
  const [hovered, set] = useState(false)
  const { openModal } = useContext(ModalContext)
  const neonMaterial = useNeonMaterial(BASE_COLOR.clone(), BASE_EMISSIVE.clone())
  const ref = useRef<Mesh>(null!)
  const texture = useTexture(url)
  const [springs, api] = useSpring(() => ({
    color: [BASE_COLOR.r, BASE_COLOR.g, BASE_COLOR.b],
    emissive: [BASE_EMISSIVE.r, BASE_EMISSIVE.g, BASE_EMISSIVE.b],
  }))

  useCursor(hovered)

  useEffect(() => {
    if (hovered) {
      api.start({
        color: [TARGET_COLOR.r, TARGET_COLOR.g, TARGET_COLOR.b],
        emissive: [TARGET_EMISSIVE.r, TARGET_EMISSIVE.g, TARGET_EMISSIVE.b],
      })
    } else {
      api.start({
        color: [BASE_COLOR.r, BASE_COLOR.g, BASE_COLOR.b],
        emissive: [BASE_EMISSIVE.r, BASE_EMISSIVE.g, BASE_EMISSIVE.b],
      })
    }
  }, [api, hovered])

  return (
    <group
      scale={5}
      position-x={(index * 4.7) - 9}
      rotation-y={Math.PI / (index + 2.7)}
      onClick={() => openModal(name)}
      onPointerOver={() => set(true)}
      onPointerOut={() => set(false)}
    >
      <animated.mesh
        material={neonMaterial}
        position={[0, (GOLDEN_RATIO / 2) + 0.05, 0]}
        ref={ref}
        material-color={springs.color}
        material-emissive={springs.emissive}
      >
        <boxGeometry args={[1.05, GOLDEN_RATIO + 0.05, 0.025]} />
        <mesh position-z={0.029}>
          <planeGeometry args={[1, GOLDEN_RATIO]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      </animated.mesh>
    </group>
  )
}

export default Frame

type FrameProps = {
  name: string
  url: string
  index: number
}
