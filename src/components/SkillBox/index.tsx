import { useCallback, useMemo, useRef } from "react"
import { useSpring } from "@react-spring/three"
import { useTexture, Text } from "@react-three/drei"
import { NormalBlending, Color, DoubleSide, Group, Mesh } from "three"
import { GroupProps, ThreeEvent, useFrame } from "@react-three/fiber"
import { useMediaQuery } from "../../utils/useMediaQuery"

import fontFile from '../../assets/fonts/SourceCodePro-Regular.ttf'
import useNeonMaterial from "../../utils/useNeonMaterial"

const BASE_COLOR = '#9c9c9c'

function SkillBox({
  name,
  imagePath,
  index,
  title,
  onPointerEnter = () => {},
  ...props
}: SkillBoxProps) {
  const image = useTexture(imagePath)
  const isDesktop = useMediaQuery('(min-width:768px)')
  const ref = useRef<Group>(null!)
  const meshRef = useRef<Mesh>(null!)
  const textMat = useNeonMaterial(new Color(1, 1.25, 1.25), new Color(0.5, 0.5, 0.5))
  const [springs, api] = useSpring(() => ({ color: BASE_COLOR }))

  const WIDTH = useMemo(() => isDesktop ? 2.5 : 2, [isDesktop])
  const GAP = useMemo(() => isDesktop ? 0.65 : 3.3, [isDesktop])
  
  const multiplier = useMemo(() => Math.random(), [])
  const basePositionY = useMemo(() => ((Math.floor(index / 4)) * (WIDTH + GAP) + ((WIDTH + GAP) / 2 + GAP)), [index, GAP, WIDTH])

  useFrame(({ clock }) => {
    ref.current.position.y = basePositionY + (Math.sin(clock.getElapsedTime() * multiplier) / 6)
  })

  const updateColor = useCallback((newColor: string) => {
    api.start({
      color: newColor,
      onChange: () => {
        // @ts-ignore
        meshRef.current.material.color.setStyle(springs.color.get())
        // @ts-ignore
        meshRef.current.material.needsUpdate = true
      },
    })
  }, [api, springs.color])

  const handlePointerEnter = useCallback((e: ThreeEvent<PointerEvent>) => {
    onPointerEnter(e)
    updateColor('white')
  }, [onPointerEnter, updateColor])

  return (
    <group
      position-x={((index % 4) - 1.5) * (WIDTH + GAP)}
      position-y={((Math.floor(index / 4)) * (WIDTH + GAP) + ((WIDTH + GAP) / 2 + (GAP / 2)))}
      ref={ref}
      {...props}
    >
      <mesh
        castShadow
        receiveShadow
        onPointerEnter={handlePointerEnter}
        onPointerLeave={() => updateColor(BASE_COLOR)}
        ref={meshRef}
      >
        <boxGeometry args={[WIDTH, WIDTH, WIDTH]} />
        <meshPhysicalMaterial
          color={BASE_COLOR}
          map={image}
          blending={NormalBlending}
        />
      </mesh>
      {!isDesktop && (
        <Text
          anchorX="center"
          anchorY="top"
          color="#0d196b"
          font={fontFile}
          textAlign="center"
          maxWidth={5}
          material={textMat}
          fontSize={0.75}
          position-y={-1.3}
        >
          {title}
        </Text>
      )}
    </group>
  )
}

interface SkillBoxProps extends GroupProps {
  name: string
  imagePath: string
  index: number
  title: string
  activate?: boolean
}

export default SkillBox
