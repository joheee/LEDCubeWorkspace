import { useContext, useState } from 'react'
import { boxSize, offset } from '../config/Variable'
import { IndexContext } from '../config/Context'
import { OpacityMax } from '../config/Color'
import { InstancedBufferAttribute, Vector3 } from 'three'



interface BoxItemInterface {
  position: number[],
  isFull: boolean
}

export default function Box(props: BoxItemInterface) {
    const indexContext = useContext(IndexContext)
    const position = new Vector3(props.position[0] * offset, props.position[1] * offset, props.position[2] * offset)
    
    const handleClick =()=> {
      if(!props.isFull) {
        let key = ''
        for(let i=0; i<props.position.length; i++) key = key.concat(props.position[i].toString())
        indexContext.setIsBoxColor!(true)
        indexContext.setBoxKey!(key)
      }
    }

    return (
      <mesh
        position={position}
        onClick={handleClick}>
        <boxGeometry args={[boxSize, boxSize, boxSize]} attach='geometry'/>
        <meshBasicMaterial attach='material' transparent={true} opacity={indexContext.Opacity/OpacityMax}/>
      </mesh>
    )
  }