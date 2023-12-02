import { useLocation } from "react-router-dom";
import { Color } from "three";
import { PlatformProps } from "../Platform";
import { Text3D } from "@react-three/drei";
import Cat from "../Cat";
import Frames from "../Frames";
import Floor from "../Floor";
import useNeonMaterial from "../../utils/useNeonMaterial";

function WorkPlatform({ position }: Partial<PlatformProps>) {
  const { pathname } = useLocation()
  const blueNeon = useNeonMaterial('#332f91', new Color(0.25, 0.25, 0.75))

  return (
    <group position={position} rotation-y={Math.PI}>
      <group>
        <Frames />
      </group>
      <Text3D
        font="/hubballi.json"
        position={[-7, 9, 1]}
        material={blueNeon}
      >
        SELECTED WORK
      </Text3D>
      {pathname === '/work' && (
        <Cat
          position-x={8.5}
          scale={[2.1, 2.1, 2.1]}
          rotation-y={Math.PI / 8 * 4}
          castShadow
        />
      )}
      <Floor />
    </group>
  )
}

export default WorkPlatform
