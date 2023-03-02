import { OrbitControls } from "@react-three/drei";
import { Canvas} from "@react-three/fiber";
import { useContext } from "react";
import Box from "../anim/BoxItem";
import { IndexContext } from "../config/Context";
import { Layer, LayerTotalEight, LayerTotalSixteen,  } from "../config/Mapping";
import { boxSize, FRAME_16_KEY, FRAME_8_KEY } from "../config/Variable";
import { useFetchFramesLocalStorage } from "../hooks/LocalStorages";

interface DisplayLayerInterface {
  index:number,
  isFull:boolean,
  dimension:number
}

function DisplayLayer(prop:DisplayLayerInterface) {
  return <>
    {
      Layer(prop.index, prop.dimension).map((item, i) => (
        <Box isFull={prop.isFull} position={[item[0]*boxSize,item[1]*boxSize,item[2]*boxSize]} key={i}/>
      ))
    }
  </>
}

export default function ThreeRender() {

  const indexContext = useContext(IndexContext)
  const frameEight = useFetchFramesLocalStorage(FRAME_8_KEY)
  const frameSixteen = useFetchFramesLocalStorage(FRAME_16_KEY)
  return (
    <>
      <Canvas orthographic camera={{zoom:25}}>
          <ambientLight intensity={0.5}/>
          <OrbitControls/>
          {
            indexContext.IsEightByEight ? 

            frameEight.Frames.length === 0 ? null : 
            (
              indexContext.Index === 8 ? 
              LayerTotalEight.map(i => (<DisplayLayer index={i} dimension={8} isFull={true} key={i}/>)) 
              : 
              <DisplayLayer dimension={8} index={indexContext.Index} isFull={false}/> 
            )
              
            :
            frameSixteen.Frames.length === 0 ? null :
            (
              indexContext.Index === 16 ? 
              LayerTotalSixteen.map(i => (<DisplayLayer index={i} dimension={16} isFull={true} key={i}/>)) 
              : 
              <DisplayLayer dimension={16} index={indexContext.Index} isFull={false}/>
            )
          }
      </Canvas>
    </>
  )
}