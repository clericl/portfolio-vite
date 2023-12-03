import { useCallback, useContext, useRef } from "react";
import { Center, MeshTransmissionMaterial, Text3D } from "@react-three/drei";
import { Group, Mesh } from "three";
import { GroupProps, useFrame } from "@react-three/fiber";
import { ModalContext } from "../Modal";

const DATA: BubbleData = {
  about: {
    title: "ABOUT",
  },
  skills: {
    title: "SKILLS",
  },
  work: {
    title: "WORK",
  },
  contact: {
    title: "CONTACT",
  },
};

function MobileBubble({ bubbleId = "", ...props }: MobileBubbleProps) {
  const { openModal } = useContext(ModalContext);
  const groupRef = useRef<Group>(null!);
  const innerRef = useRef<Mesh>(null!);
  const rand = useRef<number>(Math.random() + 0.5);

  const handleClick = useCallback(() => {
    openModal(bubbleId);
  }, [bubbleId, openModal]);

  useFrame(({ clock }) => {
    innerRef.current.position.y = Math.sin(clock.elapsedTime * rand.current);
  });

  return (
    <group onClick={handleClick} ref={groupRef} {...props}>
      <mesh ref={innerRef}>
        <sphereGeometry args={[8, 64]} />
        <MeshTransmissionMaterial
          distortionScale={0}
          temporalDistortion={0}
          resolution={1024}
          thickness={0.1}
          anisotropy={8}
          chromaticAberration={8}
          transparent
          opacity={0.2}
          roughness={0.5}
        />
        <mesh>
          <Center>
            <Text3D
              font="/source_code_pro.json"
              position={[0, 0, 0]}
              scale={[1, 1, 2]}
              size={2}
              letterSpacing={0.2}
            >
              {DATA[bubbleId]?.title}
            </Text3D>
          </Center>
        </mesh>
      </mesh>
    </group>
  );
}

interface MobileBubbleProps extends GroupProps {
  bubbleId?: string;
}

type BubbleData = {
  [key: string]: {
    title: string;
  };
};

export default MobileBubble;
