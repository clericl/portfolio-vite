import { useRef } from "react";
import { GroupProps, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import useIridescentMaterial from "../../utils/useIridescentMaterial";

function Divider(props: GroupProps) {
  const iridescentMaterial = useIridescentMaterial("#a0c6db");
  const barRef = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    if (barRef.current) {
      barRef.current.rotation.x = -Math.sin(clock.getElapsedTime());
    }
  });

  return (
    <group {...props}>
      <mesh
        receiveShadow
        castShadow
        material={iridescentMaterial}
        ref={barRef}
        position-y={2}
      >
        <boxGeometry args={[20, 0.25, 0.25]} />
      </mesh>
    </group>
  );
}

export default Divider;
