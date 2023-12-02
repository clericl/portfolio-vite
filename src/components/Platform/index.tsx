import { useMemo } from "react"
import { useMediaQuery } from "../../utils/useMediaQuery"
import { Vector3 } from "@react-three/fiber"
import AboutPlatform from "../AboutPlatform"
import ContactPlatform from "../ContactPlatform"
import HomePlatform from "../HomePlatform"
import Floor from "../Floor"
import MobileBubble from "../MobileBubble"
import SkillsPlatform from "../SkillsPlatform"
import WorkPlatform from "../WorkPlatform"

function Platform({ title, ...props }: PlatformProps) {
  const isDesktop = useMediaQuery('(min-width:768px)')

  const DesktopPlatformComponent = useMemo(() => {
    switch (title) {
      case '/':
        return HomePlatform
      case '/about':
        return AboutPlatform
      case '/skills':
        return SkillsPlatform
      case '/work':
        return WorkPlatform
      case '/contact':
        return ContactPlatform
      default:
        return (props: Partial<PlatformProps>) => (
          <group {...props}>
            <Floor />
          </group>
        )
    }
  }, [title])

  const MobilePlatformComponent = useMemo(() => {
    switch (title) {
      case '/':
        return HomePlatform
      case '/about':
        return (props: Partial<PlatformProps>) => <MobileBubble bubbleId="about" {...props} />
      case '/skills':
        return (props: Partial<PlatformProps>) => <MobileBubble bubbleId="skills" {...props} />
      case '/work':
        return (props: Partial<PlatformProps>) => <MobileBubble bubbleId="work" {...props} />
      case '/contact':
        return (props: Partial<PlatformProps>) => <MobileBubble bubbleId="contact" {...props} />
      default:
        return MobileBubble
    }
  }, [title])

  return (
    isDesktop ? (
      <DesktopPlatformComponent {...props} />
    ) : (
      <MobilePlatformComponent {...props} />
    )
  ) 
}

export interface PlatformProps {
  position?: Vector3
  title: string
}

export default Platform
