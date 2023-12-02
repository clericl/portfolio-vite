import { useVideoTexture } from "@react-three/drei"
import TexturePortal, { TexturePortalProps } from "../TexturePortal"

import catPortal from '../../assets/contact/cat-portal.mp4'

function HomePortal(props: TexturePortalProps) {
  const catPortalTex = useVideoTexture(catPortal)

  return (
    <TexturePortal {...props} home videoTex={catPortalTex} />
  )
}

export default HomePortal
