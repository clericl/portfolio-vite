import { useVideoTexture } from "@react-three/drei"
import TexturePortal, { TexturePortalProps } from "../TexturePortal"

import matrix from '../../assets/contact/matrix.mp4'

function AwayPortal(props: TexturePortalProps) {
  const matrixTex = useVideoTexture(matrix)

  return (
    <TexturePortal {...props} videoTex={matrixTex} />
  )
}

export default AwayPortal
