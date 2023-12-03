import { useEffect, useMemo } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "../../utils/useMediaQuery";
import {
  PLATFORM_TITLES,
  NUMBER_OF_ROTATIONS,
  STAIRS_PER_ROTATION,
  SPACE_BETWEEN_STAIRS,
} from "../../utils/constants";
import Platform from "../Platform";
import Stairs from "../Stairs";

const platformHeightBase =
  (SPACE_BETWEEN_STAIRS * STAIRS_PER_ROTATION) / NUMBER_OF_ROTATIONS;
const staircaseHeight =
  SPACE_BETWEEN_STAIRS * NUMBER_OF_ROTATIONS * STAIRS_PER_ROTATION;

function Staircase() {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const [springs, api] = useSpring(() => ({
    rotationY: 0,
    positionY: 0,
  }));

  const location = useLocation();
  const platformsRendered = useMemo(
    () =>
      PLATFORM_TITLES.map((platformTitle, index) => (
        <Platform
          key={platformTitle}
          title={platformTitle}
          position={[
            4 * (index % 2 === 0 ? -1 : 1),
            staircaseHeight - platformHeightBase * index + (isDesktop ? 0 : 6),
            0,
          ]}
          rotation-y={isDesktop ? 0 : Math.PI * index}
        />
      )),
    [isDesktop],
  );

  useEffect(() => {
    const platformIndex = PLATFORM_TITLES.findIndex(
      (title) => title === location.pathname,
    );

    if (typeof platformIndex === "number") {
      api.start({
        positionY: platformHeightBase * platformIndex,
        rotationY: Math.PI * platformIndex,
        config: config.molasses,
      });
    }
  }, [api, isDesktop, location.pathname]);

  return (
    <animated.group
      position-y={springs.positionY}
      rotation-y={springs.rotationY}
    >
      <group position={[0, -staircaseHeight - 5, 0]}>
        <Stairs height={staircaseHeight} position={[0, 0, 0]} />
        {platformsRendered}
      </group>
    </animated.group>
  );
}

export default Staircase;
