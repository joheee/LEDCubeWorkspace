import { useContext } from 'react'
import { boxSize, defaultBoxColor, defaultBoxOpacityMax, defaultBoxOpacityOffset, defaultOffset } from '../config/Variable'
import { IndexContext } from '../config/Context'
import { Vector3 } from 'three'
import { useFetchColorLocalStorage } from '../hooks/CustomHooks'


interface BoxItemInterface {
  position: number[],
  isFull: boolean
}

export default function Box(props: BoxItemInterface) {
  const indexContext = useContext(IndexContext)
  const position = new Vector3(props.position[0] * indexContext.BoxOffset, props.position[1] * indexContext.BoxOffset, props.position[2] * indexContext.BoxOffset)
  
  let key = ''
  for(let i=0; i<props.position.length; i++) key = key.concat(props.position[i].toString())
  const {ColorValue} = useFetchColorLocalStorage(key)
  
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