import ParticleInstances from "../ParticleInstances"

import snowflake1 from '../../assets/models/snowflake1.glb'
import snowflake2 from '../../assets/models/snowflake2.glb'

function WinterSnowflakes() {
  return (
    <ParticleInstances
      modelData={[
        {
          modelPath: snowflake1,
          scale: 0.15,
          color: '#7ea3d6',
          materialName: 'Default_OBJ',
          nodeName: 'Object_2',
        },
        {
          modelPath: snowflake2,
          scale: 0.0005,
          color: '#7ea3d6',
          materialName: 'Mat_Snowflake',
          nodeName: 'Snowflake_Mat_Snowflake_0',
        },
      ]}
    />
  )
}

export default WinterSnowflakes
