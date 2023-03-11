import { OrbitControls, PerformanceMonitor} from "@react-three/drei";
import { Canvas, useThree} from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from "react";
import Box from "../anim/BoxItem";
import { IndexContext } from "../config/Context";
import { Layer, LayerTotalEight, LayerTotalSixteen,  } from "../config/Mapping";
import { boxSize, defaultEightBound, defaultSixteenBound, FRAME_16_KEY, FRAME_8_KEY } from "../config/Variable";
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
  const [Zoom, setZoom] = useState<string>('zzz')
  
  const canvasRender = document.getElementById('canvas-render')
  window.addEventListener("resize", getSizes, false)

  function getSizes() {
    const body = document.body
    const zoom = body.clientWidth + "px x " + body.clientHeight + "px";
    setZoom(zoom)
  }

  // ZOOM NOT FINISH
  useEffect(() => {
  },[Zoom])

  return (
    <>
      <Canvas orthographic camera={{zoom:25}} id='canvas-render'>
          <ambientLight intensity={0.5}/>
          <OrbitControls/>

            {
              indexContext.IsEightByEight ? 
              
              frameEight.Frames.length === 0 ? null : 
              (
              indexContext.Index === defaultEightBound ? 
              LayerTotalEight.map(i => (<DisplayLayer index={i} dimension={defaultEightBound} isFull={true} key={i}/>)) 
              : 
              <DisplayLayer dimension={defaultEightBound} index={indexContext.Index} isFull={false}/> 
              )
              
              :
              frameSixteen.Frames.length === 0 ? null :
              (
                indexContext.Index === defaultSixteenBound ? 
                LayerTotalSixteen.map(i => (<DisplayLayer index={i} dimension={defaultSixteenBound} isFull={true} key={i}/>)) 
                : 
                <DisplayLayer dimension={defaultSixteenBound} index={indexContext.Index} isFull={false}/>
                )
              }
      </Canvas>
    </>
  )
}