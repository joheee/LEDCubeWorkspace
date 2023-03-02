import { useContext } from 'react'
import { boxSize, defaultBoxColor, defaultBoxOpacityMax, defaultBoxOpacityOffset, defaultOffset } from '../config/Variable'
import { IndexContext } from '../config/Context'
import { Vector3 } from 'three'
import { useFetchColorLocalStorage } from '../hooks/LocalStorages'



interface BoxItemInterface {
  position: number[],
  isFull: boolean
}

export function generateKey(prop:number[]){
  let key = ''.concat(prop[0].toString())
  key = key.concat('-')
  key = key.concat(prop[1].toString())
  key = key.concat('-')
  key = key.concat(prop[2].toString())
  return key
}

export default function Box(props: BoxItemInterface) {
  const indexContext = useContext(IndexContext)
  const position = new Vector3(props.position[0] * indexContext.BoxOffset, props.position[1] * indexContext.BoxOffset, props.position[2] * indexContext.BoxOffset)
  
  const key = generateKey([props.position[0], props.position[1], props.position[2]])
  const {ColorValue} = useFetchColorLocalStorage(key)
  // console.log(key)

  const handleClick =()=> {
    if(!props.isFull) {
      indexContext.setIsBoxColor!(true)
      indexContext.setBoxKey!(key)
    }
  }
  return (
    <mesh
      position={position}
      onClick={handleClick}>
      <boxGeometry args={[boxSize, boxSize, boxSize]} attach='geometry'/>
      <meshBasicMaterial attach='material' transparent={true} color={ColorValue ? ColorValue : defaultBoxColor} opacity={ColorValue ? (indexContext.Opacity + defaultBoxOpacityOffset)/defaultBoxOpacityMax : indexContext.Opacity/defaultBoxOpacityMax}/>
    </mesh>
  )
}