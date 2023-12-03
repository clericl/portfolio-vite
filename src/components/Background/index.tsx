import { useRef } from "react";
import { Environment, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

import pureSky from "../../assets/env/puresky.hdr";

function Background() {
  const starsRef = useRef<Group>(null!);

  useFrame((state) => {
    starsRef.current.rotation.y = state.clock.getElapsedTime() / -600;
  });

  return (
    <>
      <fog attach="fog" args={["#343542", 50, 3000]} />
      <color attach="background" args={["#0f121a"]} />
      <ambientLight intensity={1} />
      <pointLight
        position={[-50, 50, -50]}
        intensity={1}
        castShadow
        shadow-mapSize={2048}
      />
      <Environment files={pureSky} />
      <group ref={starsRef}>
        <Stars radius={100} depth={10} count={1000} fade speed={1} />
      </group>
    </>
  );
}

export default Background;
