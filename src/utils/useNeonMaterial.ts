import { useMemo } from 'react'
import { Color, ColorRepresentation, MeshPhysicalMaterial } from 'three'

import NeonMaterial from '../assets/materials/NeonMaterial.json'

function useNeonMaterial(
  color?: ColorRepresentation,
  emissive?: ColorRepresentation
) {
  const neonMaterial = useMemo(() => {
    const newMaterial = new MeshPhysicalMaterial()
    // @ts-ignore
    newMaterial.setValues(NeonMaterial)

    if (color) {
      newMaterial.color = new Color(color)
    }
    
    if (emissive) {
      newMaterial.emissive = new Color(emissive)
    }

    return newMaterial
  }, [color, emissive])

  return neonMaterial
}

export default useNeonMaterial
