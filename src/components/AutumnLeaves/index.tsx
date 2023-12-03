import ParticleInstances from "../ParticleInstances";

import leaf1 from "../../assets/models/leaf1.glb";
import leaf2 from "../../assets/models/leaf2.glb";

function AutumnLeaves() {
  return (
    <ParticleInstances
      modelData={[
        {
          modelPath: leaf1,
          scale: 0.1,
          color: "white",
          materialName: "Maple_leaf",
          nodeName: "Maple_leaf_Maple_leaf_0",
        },
        {
          modelPath: leaf2,
          scale: 0.1,
          color: "white",
          materialName: "QS1330-W27-files1-1",
          nodeName: "QS1330-W27-files1-1",
        },
      ]}
    />
  );
}

export default AutumnLeaves;
