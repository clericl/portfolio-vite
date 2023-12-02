import { useCallback, useEffect, useMemo, useRef } from 'react'
import { GroupProps, useGraph } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { BufferGeometry, Group, LoopOnce } from 'three'

import CatPath from '../../assets/models/cat.glb'
import { useLocation } from 'react-router-dom';
import { GLTF, Geometry } from 'three-stdlib';

import { SkeletonUtils } from 'three-stdlib';

const TIME_SCALE = 3

type MultiCatProps = GroupProps & {
  catHome: string
}

type LoadedGLTF = GLTF & {
  materials: any
}

function MultiCat({ catHome, ...otherProps }: MultiCatProps) {
  const groupRef = useRef<Group>(null!)
  const idleCount = useRef(0)
  const { animations, materials, scene } = useGLTF(CatPath) as LoadedGLTF
  const { actions, mixer, names } = useAnimations(animations, groupRef)
  const { pathname } = useLocation()

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clonedScene)

  const material = useMemo(() => {
    const mat = materials.material
    mat.depthWrite = true
    
    return mat
  }, [materials])

  const handleNextClip = useCallback((e?: any) => {
    let nextAction
    let timeScale = TIME_SCALE
    const dieRoll = Math.floor(Math.random() * idleCount.current)

    if (catHome === '/') {
      switch (dieRoll) {
        case 1:
        default: {
          nextAction = actions['Arm_Cat|Idle_1']
          idleCount.current += 1
          break;
        }
        case 2: {
          nextAction = actions['Arm_Cat|SharpenClaws_Vert']
          idleCount.current = 0
          break;
        }
        case 3: {
          nextAction = actions['Arm_Cat|Idle_3']
          idleCount.current += 1
          break;
        }
        case 4: {
          nextAction = actions['Arm_Cat|Idle_4']
          idleCount.current += 1
          break;
        }
        case 5: {
          nextAction = actions['Arm_Cat|Idle_5']
          idleCount.current += 1
          break;
        }
        case 6: {
          nextAction = actions['Arm_Cat|Idle_6']
          idleCount.current = 0
          break;
        }
      }

      if (nextAction) {
        nextAction.clampWhenFinished = false
      }
    } else if (catHome === '/about') {
      if (!e) {
        nextAction = actions['Arm_Cat|Lie_belly_start']
        timeScale = TIME_SCALE / 1.5        
      } else {
        const dieRoll = Math.floor(Math.random() * 6)

        switch (dieRoll) {
          case 1:
          case 2:
          default: {
            nextAction = actions['Arm_Cat|Lie_belly_loop_2']
            break;
          }
          case 3:
          case 4: {
            nextAction = actions['Arm_Cat|Lie_belly_loop_1']
            break;
          }
          case 5:
          case 6: {
            nextAction = actions['Arm_Cat|Lie_belly_loop_3']
            break;
          }
        }
      }

      if (nextAction) {
        nextAction.clampWhenFinished = true
      }
    } else if (catHome === '/skills') {
      nextAction = actions['Arm_Cat|Swim_Idle']
      timeScale = TIME_SCALE / 1.5
    } else if (catHome === '/work') {
      if (!e) {
        nextAction = actions['Arm_Cat|Lie_side_start']
        timeScale = TIME_SCALE / 1.5        
      } else {
        nextAction = actions['Arm_Cat|Lie_side_loop_1']
      }
      
      if (nextAction) {
        nextAction.clampWhenFinished = true
      }
    } else if (catHome === '/contact') {
      nextAction = actions['Arm_Cat|JumpAir_up']
    } else {
      nextAction = actions['Arm_Cat|Idle_1']
    }

    if (nextAction) {
      nextAction.reset()
        .setEffectiveTimeScale(timeScale)
        .setLoop(LoopOnce, 1)
        .play()
    }
  }, [actions, catHome])

  useEffect(() => {
    mixer.addEventListener('finished', handleNextClip)
    handleNextClip()
    
    return () => mixer.removeEventListener('finished', handleNextClip)
  }, [actions, handleNextClip, mixer, names])

  return (
    <group
      dispose={null}
      ref={groupRef}
      {...otherProps}
    >
      <group rotation={[-Math.PI / 2, 0, 0]} scale={[4.28, 4.28, 4.28]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <primitive object={nodes._rootJoint} />
            <skinnedMesh
              material={material}
              // @ts-ignore
              geometry={nodes.Object_58.geometry}
              // @ts-ignore
              skeleton={nodes.Object_58.skeleton}
              castShadow
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(CatPath)

export default MultiCat
