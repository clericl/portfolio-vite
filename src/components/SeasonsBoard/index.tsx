import { useCallback, useMemo } from "react";
import { useSpring } from "@react-spring/three";
import { Color } from "three";
import { Season } from "../../utils/constants";
import useNeonMaterial from "../../utils/useNeonMaterial";
import MessageBoard from "../MessageBoard";

const MESSAGE =
  "I'm Eric, a full stack\nweb developer specializing\nin 3D and augmented reality\nexperiences.";

type SeasonsBoardProps = {
  open: boolean;
  switchSeasons: (arg0?: Season) => void;
};

function SeasonsBoard({
  open = true,
  switchSeasons,
  ...props
}: SeasonsBoardProps) {
  const neonMaterial = useNeonMaterial("#021040");

  const setHover = useCallback((newState: boolean) => {
    if (newState) {
      document.body.classList.add("hovering");
    } else {
      document.body.classList.remove("hovering");
    }
  }, []);

  const [springMat, summerMat, autumnMat, winterMat] = useMemo(() => {
    const spring = neonMaterial.clone();
    const summer = neonMaterial.clone();
    const autumn = neonMaterial.clone();
    const winter = neonMaterial.clone();
    spring.emissive = new Color(2, 1.5, 1.5);
    summer.emissive = new Color(0, 2, 0);
    autumn.emissive = new Color(2, 1.5, 0);
    winter.emissive = new Color(0, 0, 2);

    const text = neonMaterial.clone();
    text.color = new Color(1, 1.25, 1.25);

    return [spring, summer, autumn, winter, text];
  }, [neonMaterial]);

  const [topLeftSpring, topLeftApi] = useSpring(() => ({ scale: 1 }));
  const [topRightSpring, topRightApi] = useSpring(() => ({ scale: 1 }));
  const [bottomLeftSpring, bottomLeftApi] = useSpring(() => ({ scale: 1 }));
  const [bottomRightSpring, bottomRightApi] = useSpring(() => ({ scale: 1 }));

  return (
    <MessageBoard
      bulbProps={{
        topLeft: {
          material: springMat,
          // @ts-expect-error three types
          "scale-x": topLeftSpring.scale,
          "scale-y": topLeftSpring.scale,
          "scale-z": topLeftSpring.scale,
          onPointerEnter: () => topLeftApi.start({ scale: 2.5 }),
          onPointerLeave: () => topLeftApi.start({ scale: 1 }),
          onClick: () => switchSeasons(Season.Spring),
        },
        topRight: {
          material: summerMat,
          // @ts-expect-error three types
          "scale-x": topRightSpring.scale,
          "scale-y": topRightSpring.scale,
          "scale-z": topRightSpring.scale,
          onPointerEnter: () => topRightApi.start({ scale: 2.5 }),
          onPointerLeave: () => topRightApi.start({ scale: 1 }),
          onClick: () => switchSeasons(Season.Summer),
        },
        bottomLeft: {
          material: autumnMat,
          // @ts-expect-error three types
          "scale-x": bottomLeftSpring.scale,
          "scale-y": bottomLeftSpring.scale,
          "scale-z": bottomLeftSpring.scale,
          onPointerEnter: () => bottomLeftApi.start({ scale: 2.5 }),
          onPointerLeave: () => bottomLeftApi.start({ scale: 1 }),
          onClick: () => switchSeasons(Season.Autumn),
        },
        bottomRight: {
          material: winterMat,
          // @ts-expect-error three types
          "scale-x": bottomRightSpring.scale,
          "scale-y": bottomRightSpring.scale,
          "scale-z": bottomRightSpring.scale,
          onPointerEnter: () => bottomRightApi.start({ scale: 2.5 }),
          onPointerLeave: () => bottomRightApi.start({ scale: 1 }),
          onClick: () => switchSeasons(Season.Winter),
        },
      }}
      paneProps={{
        onClick: () => switchSeasons(),
      }}
      open={open}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      {...props}
    >
      {MESSAGE}
    </MessageBoard>
  );
}

export default SeasonsBoard;
