import { useRef } from "react";
import { Color, Group } from "three";
import { Instance } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function ParticleInstance({ random, ...props }: ParticleInstanceProps) {
  const ref = useRef<Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + random * 10000;
    ref.current.rotation.set(
      Math.cos(t / 4) / 2,
      Math.sin(t / 4) / 2,
      Math.cos(t / 1.5) / 2,
    );
    ref.current.position.y = Math.sin(t / 1.5) / 2;
  });

  return (
    <group {...props}>
      <Instance ref={ref} />
    </group>
  );
}

interface ParticleInstanceProps {
  random: number;
  color?: Color;
}

export default ParticleInstance;
