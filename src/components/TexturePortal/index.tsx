import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Texture, TextureLoader } from 'three'
import { useLocation } from 'react-router-dom'
import SwirlyPortal from '../SwirlyPortal'

import linkedin from '../../assets/contact/linkedin.png'
import email from '../../assets/contact/email.png'
import github from '../../assets/contact/github.png'
import resume from '../../assets/contact/resume.png'

function TexturePortal({ home = false, getType, videoTex, ...props }: TexturePortalProps) {
  const [type, setType] = useState('')
  const iconRef = useRef<Mesh>(null!)
  const { pathname } = useLocation()

  const texturePath = useMemo(() => {
    switch (type) {
      case 'linkedin':
        return linkedin
      case 'email':
        return email
      case 'github':
        return github
      case 'resume':
        return resume
      default:
        return null
    }
  }, [type])

  useFrame(({ clock }) => {
    if (iconRef.current) iconRef.current.position.y = Math.sin(clock.elapsedTime * 1.5) / 5
    
    if (pathname === '/contact') {
      const nextType = getType()
      if (nextType !== type) {
        setType(nextType)
      }
    }
  })

  useEffect(() => {
    new TextureLoader().load(texturePath, (loadedTex) => {
      // @ts-ignore
      if (iconRef.current) iconRef.current.material.map = loadedTex
    })
  }, [texturePath])
  
  return (
    <group {...props}>
      {!home && type && (
        <mesh
          position-z={0.02}
          ref={iconRef}
        >
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial
            transparent
            opacity={0.7}
            alphaTest={0.1}
          />
        </mesh>
      )}
      <mesh position-z={-0.03}>
        <circleGeometry args={[4, 32]} />
        <meshBasicMaterial
          map={videoTex}
          color="white"
          transparent
          opacity={0.7}
        />
      </mesh>
      <SwirlyPortal />
    </group>
  )
}

export interface TexturePortalProps {
  home?: boolean
  getType: Function
  videoTex?: Texture
}

export default TexturePortal
