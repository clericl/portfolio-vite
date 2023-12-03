import { Vector3 } from "@react-three/fiber";
import { useMemo } from "react";
import {
  NUMBER_OF_ROTATIONS,
  STAIRS_PER_ROTATION,
  STAIR_HEIGHT,
  SPACE_BETWEEN_STAIRS,
} from "../../utils/constants";
import { useMediaQuery } from "../../utils/useMediaQuery";
import useIridescentMaterial from "../../utils/useIridescentMaterial";

function Stair({ hasSphere, rotationY, positionY }: StairProps) {
  const iridescentMaterial = useIridescentMaterial("#a0c6db");

  return (
    <group position-y={positionY} rotation-y={rotationY}>
      <mesh
        position-x={12}
        rotation-x={Math.PI / 2}
        material={iridescentMaterial}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[6, 1.5, STAIR_HEIGHT]} />
      </mesh>
      {hasSphere && (
        <mesh material={iridescentMaterial}>
          <sphereGeometry args={[0.2, 16, 16]} />
        </mesh>
      )}
    </group>
  );
}

function Stairs({ position = [0, 0, 0] }: StairsProps) {
  const isDesktop = useMediaQuery("(min-width:768px)");

  const rendered = useMemo(() => {
    const stairs = [];
    const count = STAIRS_PER_ROTATION * NUMBER_OF_ROTATIONS;

    for (let i = 0; i < count; i++) {
      const positionY = i * SPACE_BETWEEN_STAIRS;
      const rotationY = i * ((2 * Math.PI) / STAIRS_PER_ROTATION);

      stairs.push(
        <Stair
          key={i}
          hasSphere={
            isDesktop
              ? i % (STAIRS_PER_ROTATION / 2) > STAIRS_PER_ROTATION / 4
              : false
          }
          positionY={positionY}
          rotationY={rotationY}
        />,
      );
    }

    return stairs;
  }, [isDesktop]);

  return <group position={position}>{rendered}</group>;
}

interface StairProps {
  hasSphere: boolean;
  positionY: number;
  rotationY: number;
}

interface StairsProps {
  height?: number;
  position?: Vector3;
}

export default Stairs;
