import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "../../utils/useMediaQuery";
import Background from "../Background";
import Effects from "../Effects";
import Loader from "../Loader";
import Staircase from "../Staircase";

import "./index.scss";

function Scene() {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const cameraZ = useMemo(() => (isDesktop ? 30 : 55), [isDesktop]);

  return (
    <div className="three-scene">
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 60, position: [0, 1, cameraZ] }}
      >
        <Background />
        <Suspense fallback={<Loader />}>
          <Effects />
          <Staircase />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene;
