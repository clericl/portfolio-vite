import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Center, Text3D } from "@react-three/drei";
import { Mesh } from "three";
import { FloorType } from "../../utils/constants";
import { PlatformProps } from "../Platform";
import Floor from "../Floor";
import useIridescentMaterial from "../../utils/useIridescentMaterial";
import { useMediaQuery } from "../../utils/useMediaQuery";
import Divider from "../Divider";
import MultiCat from "../MultiCat";

function HomePlatform({ position }: Partial<PlatformProps>) {
  const boxRef = useRef<Mesh>(null!);
  const iridescentMaterial = useIridescentMaterial("#a0c6db");
  const isDesktop = useMediaQuery("(min-width:768px)");

  useFrame((_, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.x += delta * 3;
      boxRef.current.rotation.y += delta * 3;
      boxRef.current.rotation.z += delta * 3;
    }
  });

  return (
    <group position={position} position-x={0}>
      <Center disableY disableZ>
        {isDesktop ? (
          <Text3D
            font="/hubballi.json"
            position={[0, 7, -1]}
            scale={[1, 1, 2]}
            size={4}
            material={iridescentMaterial}
          >
            ERIC LIANG
          </Text3D>
        ) : (
          <>
            <Text3D
              font="/hubballi.json"
              position={[3.5, 12, 0]}
              scale={[1, 1, 4]}
              size={7}
              material={iridescentMaterial}
            >
              ERIC
            </Text3D>
            <Text3D
              font="/hubballi.json"
              position={[0, 5, 0]}
              scale={[1, 1, 4]}
              size={7}
              material={iridescentMaterial}
            >
              LIANG
            </Text3D>
          </>
        )}
      </Center>
      {isDesktop && (
        <Box
          args={[0.5, 0.5, 0.5]}
          position={[-1.8, 8.5, -1]}
          ref={boxRef}
          material={iridescentMaterial}
        />
      )}
      <Center disableY disableZ>
        <Text3D
          font="/hubballi.json"
          position={[0, isDesktop ? 4.5 : 1, isDesktop ? -1 : 0]}
          scale={[1, 1, isDesktop ? 2 : 4]}
          size={isDesktop ? 1.8 : 2.5}
          letterSpacing={-0.1}
          material={iridescentMaterial}
        >
          WEB DEVELOPER
        </Text3D>
      </Center>
      {isDesktop && (
        <MultiCat
          position={[7.6, 0.2, 2.5]}
          scale={[2.1, 2.1, 2.1]}
          rotation-y={(-Math.PI / 8) * 6.5}
          castShadow
          catHome="/"
        />
      )}
      {isDesktop ? (
        <Floor type={FloorType.Primary} />
      ) : (
        <Divider position-y={-5} />
      )}
    </group>
  );
}

export default HomePlatform;
