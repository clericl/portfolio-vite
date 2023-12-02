import { Reflector } from "@react-three/drei"

function Ground() {
  return (
    <Reflector
      resolution={2048}
      blur={[800, 50]}
      mirror={1}
      mixBlur={0.1}
      mixStrength={2.5}
      depthScale={0.2}
      minDepthThreshold={0.9}
      maxDepthThreshold={0.6}
      rotation-x={-Math.PI / 2}
      args={[200, 200]}
    />
  )
}

export default Ground
