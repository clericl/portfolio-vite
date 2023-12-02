import { useRef } from "react";
import { Group } from "three";
import Frame from "../Frame";

import moethennessy from '../../assets/projects/moethennessy.jpg'
import rosewrapped from '../../assets/projects/rosewrapped.jpg'
import kennethcole from '../../assets/projects/kennethcole.jpg'
import arbor from '../../assets/projects/arbor.jpg'

const IMAGES = [
  {
    image: moethennessy,
    name: 'moethennessy',
  },
  {
    image: kennethcole,
    name: 'kennethcole',
  },
  {
    image: rosewrapped,
    name: 'rosewrapped',
  },
  {
    image: arbor,
    name: 'arbor',
  },
]

function Frames() {
  const ref = useRef<Group>(null!)

  return (
    <group ref={ref}>
      {IMAGES.map(({ name, image }, index) => (
        <Frame key={name} name={name} url={image} index={index} />
      ))}
    </group>
  )
}

export default Frames
