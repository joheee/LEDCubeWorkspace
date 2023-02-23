import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Box from "./anim/BoxItem";
import { Layer } from "./config/Mapping";
import { boxSize } from "./config/Variable";

function Controls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return <OrbitControls args={[camera, domElement]} />;
}

function DisplayLayer({num}:any) {
  return <>
    {
      Layer(num).map((item, i) => (
        <Box position={[item[0]*boxSize,item[1]*boxSize,item[2]*boxSize]} key={i}/>
      ))
    }
  </>
}

function App() {


  return (
    <Canvas orthographic camera={{zoom:40}}>
      <ambientLight />
      <Controls />
      <DisplayLayer num={0}/>
      <DisplayLayer num={1}/>
      <DisplayLayer num={2}/>
      <DisplayLayer num={3}/>
      <DisplayLayer num={4}/>
      <DisplayLayer num={5}/>
      <DisplayLayer num={6}/>
      <DisplayLayer num={7}/>
    </Canvas>
  )
}

export default App
