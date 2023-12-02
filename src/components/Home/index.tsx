import { BackSide } from "three"

function Home() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[200, 128, 128]} />
        <meshStandardMaterial color="black" side={BackSide} />
      </mesh>
    </group>
  )
}

export default Home
