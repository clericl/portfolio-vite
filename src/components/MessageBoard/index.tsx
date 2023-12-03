import { ReactNode, useEffect, useMemo, useRef } from "react";
import { useSpring, animated } from "@react-spring/three";
import { Color, Group } from "three";
import { GroupProps, MeshProps } from "@react-three/fiber";
import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import useNeonMaterial from "../../utils/useNeonMaterial";

import fontFile from "../../assets/fonts/SourceCodePro-Regular.ttf";

const SPHERE_RADIUS = 0.2;
const WIDTH = 19;
const HEIGHT = 8;
const DELAY = 500;

function MessageBoard({
  children,
  open = true,
  bulbProps = {},
  paneProps = {},
  width = WIDTH,
  height = HEIGHT,
  ...props
}: MessageBoardProps) {
  const groupRef = useRef<Group>(null!);
  const neonMaterial = useNeonMaterial("#021040");

  const [bulbMat, textMat] = useMemo(() => {
    const bulb = neonMaterial.clone();
    bulb.color = new Color(1, 1.5, 1.5);

    const text = neonMaterial.clone();
    text.emissive = new Color(0.5, 0.5, 0.5);
    text.color = new Color(1, 1.25, 1.25);

    return [bulb, text];
  }, [neonMaterial]);

  const [topLeftSpring, topLeftApi] = useSpring(() => ({ x: 0, y: 0, z: 0 }));
  const [topRightSpring, topRightApi] = useSpring(() => ({ x: 0, y: 0, z: 0 }));
  const [bottomLeftSpring, bottomLeftApi] = useSpring(() => ({
    x: 0,
    y: 0,
    z: 0,
  }));
  const [bottomRightSpring, bottomRightApi] = useSpring(() => ({
    x: 0,
    y: 0,
    z: 0,
  }));
  const [paneSpring, paneApi] = useSpring(() => ({ x: 0, y: 0, z: 0 }));

  useEffect(() => {
    if (open) {
      topLeftApi.start({
        to: async (next) => {
          await next({ x: -width / 2, delay: DELAY });
          await next({ y: height / 2 });
        },
      });
      topRightApi.start({
        to: async (next) => {
          await next({ x: width / 2, delay: DELAY });
          await next({ y: height / 2 });
        },
      });
      bottomLeftApi.start({
        to: async (next) => {
          await next({ x: -width / 2, delay: DELAY });
          await next({ y: -height / 2 });
        },
      });
      bottomRightApi.start({
        to: async (next) => {
          await next({ x: width / 2, delay: DELAY });
          await next({ y: -height / 2 });
        },
      });
      paneApi.start({
        to: async (next) => {
          await next({ x: 1, delay: DELAY });
          await next({ y: 1, z: 1 });
        },
      });
    } else {
      topLeftApi.start({
        to: async (next) => {
          await next({ y: 0 });
          await next({ x: 0 });
        },
      });
      topRightApi.start({
        to: async (next) => {
          await next({ y: 0 });
          await next({ x: 0 });
        },
      });
      bottomLeftApi.start({
        to: async (next) => {
          await next({ y: 0 });
          await next({ x: 0 });
        },
      });
      bottomRightApi.start({
        to: async (next) => {
          await next({ y: 0 });
          await next({ x: 0 });
        },
      });
      paneApi.start({
        to: async (next) => {
          await next({ x: 0 });
          await next({ y: 0, z: 0 });
        },
      });
    }
  }, [
    topLeftApi,
    topRightApi,
    bottomLeftApi,
    bottomRightApi,
    paneApi,
    open,
    width,
    height,
  ]);

  return (
    <group {...props}>
      <group ref={groupRef} position={[0, height / 2, 0]}>
        <animated.mesh
          castShadow
          position-x={topLeftSpring.x}
          position-y={topLeftSpring.y}
          position-z={topLeftSpring.z}
          material={bulbMat}
          {...bulbProps.topLeft}
        >
          <sphereGeometry args={[SPHERE_RADIUS, 16, 16]} />
        </animated.mesh>
        <animated.mesh
          castShadow
          position-x={topRightSpring.x}
          position-y={topRightSpring.y}
          position-z={topRightSpring.z}
          material={bulbMat}
          {...bulbProps.topRight}
        >
          <sphereGeometry args={[SPHERE_RADIUS, 16, 16]} />
        </animated.mesh>
        <animated.mesh
          castShadow
          position-x={bottomLeftSpring.x}
          position-y={bottomLeftSpring.y}
          position-z={bottomLeftSpring.z}
          material={bulbMat}
          {...bulbProps.bottomLeft}
        >
          <sphereGeometry args={[SPHERE_RADIUS, 16, 16]} />
        </animated.mesh>
        <animated.mesh
          castShadow
          position-x={bottomRightSpring.x}
          position-y={bottomRightSpring.y}
          position-z={bottomRightSpring.z}
          material={bulbMat}
          {...bulbProps.bottomRight}
        >
          <sphereGeometry args={[SPHERE_RADIUS, 16, 16]} />
        </animated.mesh>
        <group {...paneProps}>
          <animated.mesh
            castShadow
            scale-x={paneSpring.x}
            scale-y={paneSpring.y}
            scale-z={paneSpring.z}
          >
            <boxGeometry
              args={[
                width - SPHERE_RADIUS / 2,
                height - SPHERE_RADIUS / 2,
                SPHERE_RADIUS,
              ]}
            />
            {/* @ts-expect-error weird material props */}
            <MeshTransmissionMaterial
              samples={16}
              resolution={1028}
              anisotropy={1}
              thickness={0.8}
              roughness={0.6}
              toneMapped={true}
              color="#96b5b4"
            />
          </animated.mesh>
          <animated.group
            position-z={0.5}
            scale-x={paneSpring.x}
            scale-y={paneSpring.y}
            scale-z={paneSpring.z}
          >
            <Text
              anchorX="center"
              anchorY="middle"
              color="#0d196b"
              font={fontFile}
              maxWidth={width - 2}
              textAlign="center"
              material={textMat}
            >
              {children}
            </Text>
          </animated.group>
        </group>
      </group>
    </group>
  );
}

interface MessageBoardProps {
  children?: ReactNode;
  open?: boolean;
  width?: number;
  height?: number;
  bulbProps?: {
    topLeft?: MeshProps;
    topRight?: MeshProps;
    bottomLeft?: MeshProps;
    bottomRight?: MeshProps;
  };
  paneProps?: GroupProps;
}

export default MessageBoard;
