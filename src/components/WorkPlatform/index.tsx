import { Color } from "three";
import { PlatformProps } from "../Platform";
import { Text3D } from "@react-three/drei";
import Frames from "../Frames";
import Floor from "../Floor";
import useNeonMaterial from "../../utils/useNeonMaterial";
import MultiCat from "../MultiCat";

function WorkPlatform({ position }: Partial<PlatformProps>) {
  const blueNeon = useNeonMaterial('#332f91', new Color(0.1, 0.1, 0.5))

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
      <MultiCat
        position-x={8.5}
        scale={[2.1, 2.1, 2.1]}
        rotation-y={Math.PI / 8 * 4}
        castShadow
        catHome="/work"
      />
      <Floor />
    </group>
  )
}

export default WorkPlatform
