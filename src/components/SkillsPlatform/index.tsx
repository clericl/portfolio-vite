import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useLocation } from "react-router-dom"
import { useMediaQuery } from "../../utils/useMediaQuery"
import { PlatformProps } from "../Platform"
import { Group } from "three"
import Floor from "../Floor"
import SkillBox from "../SkillBox"
import MessageBoard from "../MessageBoard"

import html from '../../assets/skills/html.png'
import css from '../../assets/skills/css.png'
import js from '../../assets/skills/js.png'
import react from '../../assets/skills/react.png'
import sql from '../../assets/skills/sql.png'
import ts from '../../assets/skills/ts.png'
import threejs from '../../assets/skills/threejs.png'
import aframe from '../../assets/skills/aframe.png'
import eighth from '../../assets/skills/8thwall.png'
import d3 from '../../assets/skills/d3.png'
import aws from '../../assets/skills/aws.png'
import gcp from '../../assets/skills/gcp.png'
import MultiCat from "../MultiCat"

const SKILLS = {
  d3: {
    imagePath: d3,
    title: 'D3.js'
  },
  threejs: {
    imagePath: threejs,
    title: 'Three.js'
  },
  aframe: {
    imagePath: aframe,
    title: 'A-FRAME'
  },
  eighth: {
    imagePath: eighth,
    title: '8th Wall'
  },
  ts: {
    imagePath: ts,
    title: 'TypeScript'
  },
  sql: {
    imagePath: sql,
    title: 'SQL'
  },
  aws: {
    imagePath: aws,
    title: 'Amazon Web Services'
  },
  gcp: {
    imagePath: gcp,
    title: 'Google Cloud Platform'
  },
  html: {
    imagePath: html,
    title: 'HTML'
  },
  css: {
    imagePath: css,
    title: 'CSS'
  },
  js: {
    imagePath: js,
    title: 'JavaScript'
  },
  react: {
    imagePath: react,
    title: 'React.js'
  },
}

const DEFAULT_MESSAGE = 'Hover over a box!'

function SkillsPlatform({ position }: Partial<PlatformProps>) {
  const [messageText, setMessageText] = useState(DEFAULT_MESSAGE)
  const { pathname } = useLocation()
  const isDesktop = useMediaQuery('(min-width:768px)')
  const catRef = useRef<Group>(null!)

  const setBoxText = useCallback((newText: string) => {
    setMessageText(newText)
  }, [])

  const boxRenders = useMemo(() => Object.entries(SKILLS).map(([name, { imagePath, title }], index) => (
    <SkillBox
      key={name}
      name={name}
      imagePath={imagePath}
      index={index}
      title={title}
      onPointerEnter={() => setBoxText(title)}
    />
  )), [setBoxText])

  useFrame((_, delta) => {
    catRef.current.rotation.y -= delta / 2
  })

  useEffect(() => {
    setMessageText(DEFAULT_MESSAGE)
  }, [pathname])

  return (
    <group position={position}>
      <group position-x={isDesktop ? -5 : 0} position-y={isDesktop ? 0 : -3}>
        {boxRenders}
      </group>
      {isDesktop && (
        <MessageBoard
          position-y={2.5}
          position-x={6}
          width={8}
          height={5}
          open={pathname === '/skills'}
        >
          {messageText}
        </MessageBoard>
      )}
      <group ref={catRef} position-y={1} rotation-x={-Math.PI / 8}>
        <mesh position={[20, 1, 0]} onPointerEnter={() => setBoxText('Cat')}>
          <boxGeometry args={[4, 4, 8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        <MultiCat
          position={[20, 0, 0]}
          scale={[2.1, 2.1, 2.1]}
          rotation-x={Math.PI / 8}
          rotation-y={Math.PI / 15}
          rotation-z={0}
          castShadow
          catHome="/skills"
        />
      </group>
      <Floor />
    </group>
  )
}

export default SkillsPlatform
