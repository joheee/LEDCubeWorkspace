import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PlaneGeometry } from "three";
import Box from "../anim/BoxItem";
import { Layer } from "../config/Mapping";
import { boxSize } from "../config/Variable";
import Sidebar from "./Sidebar";


function DisplayLayer({num}:any) {
  return <>
    {
      Layer(num).map((item, i) => (
        <Box position={[item[0]*boxSize,item[1]*boxSize,item[2]*boxSize]} key={i}/>
      ))
    }
  </>
}

export default function ThreeRender() {
    return (
      <>
        <Canvas orthographic camera={{zoom:25}}>
            <ambientLight intensity={0.5}/>
            <OrbitControls/>
            <DisplayLayer num={0}/>
            <DisplayLayer num={1}/>
            <DisplayLayer num={2}/>
            <DisplayLayer num={3}/>
            <DisplayLayer num={4}/>
            <DisplayLayer num={5}/>
            <DisplayLayer num={6}/>
            <DisplayLayer num={7}/>
        </Canvas>
      </>
    )
}