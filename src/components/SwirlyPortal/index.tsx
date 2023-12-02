import { useRef } from "react"
import {
  Color,
  ColorRepresentation,
  MultiplyBlending,
  Mesh,
  ShaderMaterial,
} from "three"
import { GroupProps, TextureProps, extend, useFrame } from "@react-three/fiber"
import { Mask, shaderMaterial } from "@react-three/drei"
import { PORTAL_RADIUS } from "../../utils/constants"
import glsl from 'babel-plugin-glsl/macro'

const PortalMaterial = shaderMaterial(
  { uTime: 0, uColorStart: new Color('hotpink'), uColorEnd: new Color('white') },
  glsl`
  varying vec2 vUv;
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    vUv = uv;
  }`,
  glsl`
  #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
  uniform float uTime;
  uniform vec3 uColorStart;
  uniform vec3 uColorEnd;
  varying vec2 vUv;
  void main() {
    vec2 displacedUv = vUv + cnoise3(vec3(vUv * 7.0, uTime * 0.1));
    float strength = cnoise3(vec3(displacedUv * 5.0, uTime * 0.2));
    float outerGlow = distance(vUv, vec2(0.5)) * 4.0 - 1.4;
    strength += outerGlow;
    strength += step(-0.2, strength) * 0.8;
    strength = clamp(strength, 0.0, 1.0);
    vec3 color = mix(uColorStart, uColorEnd, strength);
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }`,
)

type PortalMaterialType = ShaderMaterial & {
  uTime: number
}

extend({ PortalMaterial })

export function PortalMask({
  width = 1,
  height = 1,
  depth = 1,
  index = 1,
  ...props
}: PortalMaskProps) {
  const ref = useRef<Mesh>(null!)
  
  return (
    <>
      <Mask colorWrite ref={ref} id={index} {...props}>
        <boxGeometry args={[width, height, depth]} />
      </Mask>
    </>
  )
}

function SwirlyPortal({
  color = 'white',
  texture,
  index = 1,
  ...props
}: SwirlyPortalProps) {
  const portalMaterial = useRef<PortalMaterialType>(null!)

  useFrame((_, delta) => (portalMaterial.current.uTime += (delta * 8)))

  return (
    <group {...props}>
      <mesh>
        <circleGeometry args={[PORTAL_RADIUS * 1.02, 32]} />
        {/* 
        // @ts-ignore */}
        <portalMaterial
          ref={portalMaterial}
          blending={MultiplyBlending}
          uColorStart={color}
          uColorEnd="black"
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

interface PortalMaskProps {
  width?: number
  height?: number
  depth?: number
  index?: number
}

type SwirlyPortalProps = GroupProps & {
  color?: ColorRepresentation
  texture?: TextureProps
  index?: number
}

export default SwirlyPortal
