import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { boxSize } from '../config/Variable'


export default function Box(props: any) {
    
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    

    return (
      <mesh
        {...props}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[boxSize, boxSize, boxSize]} attach='geometry'/>
        <meshBasicMaterial attach='material' color={hovered ? 'hotpink' : 'orange'} transparent={true} opacity={0.1}/>
      </mesh>
    )
  }