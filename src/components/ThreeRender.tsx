import { OrbitControls } from "@react-three/drei";
import { Canvas} from "@react-three/fiber";
import { useContext } from "react";
import Box from "../anim/BoxItem";
import { IndexContext } from "../config/Context";
import { Layer, LayerTotal } from "../config/Mapping";
import { boxSize } from "../config/Variable";

interface DisplayLayerInterface {
  index:number,
  isFull:boolean
}

function DisplayLayer(prop:DisplayLayerInterface) {
  return <>
    {
      Layer(prop.index).map((item, i) => (
        <Box isFull={prop.isFull} position={[item[0]*boxSize,item[1]*boxSize,item[2]*boxSize]} key={i}/>
      ))
    }
  </>
}

export default function ThreeRender() {

  const indexContext = useContext(IndexContext)

  return (
    <>
      <Canvas orthographic camera={{zoom:25}}>
          <ambientLight intensity={0.5}/>
          <OrbitControls/>
          {
            indexContext.Index === 8 ? 
              LayerTotal.map(i => (
                <DisplayLayer index={i} isFull={true} key={i}/>
              )) 
              : <DisplayLayer index={indexContext.Index} isFull={false}/>
          }
      </Canvas>
    </>
  )
}