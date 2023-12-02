import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useMediaQuery } from '../../utils/useMediaQuery'
import Effects from '../Effects'
import Loader from '../Loader'
import Staircase from '../Staircase'
import NightSky from '../NightSky'

import puresky from '../../assets/env/puresky.hdr'
import './index.scss'

function Scene() {
  const isDesktop = useMediaQuery('(min-width:768px)')
  const cameraZ = useMemo(() => isDesktop ? 30 : 55, [isDesktop])
  
  return (
    <div className="three-scene">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 60, position: [0, 1, cameraZ] }}>
        <fog attach="fog" args={['#343542', 50, 3000]} />
        <ambientLight intensity={1} />
        {/* <Loader /> */}
        <pointLight position={[-50, 50, -50]} intensity={1} castShadow shadow-mapSize={2048} />        
        <Suspense fallback={<Loader />}>
          <Environment files={puresky} />
          <Effects />
          <NightSky />
          <Staircase />
        </Suspense>        
      </Canvas>
    </div>
  )
}

export default Scene
