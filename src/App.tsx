import { useState } from "react"
import FloatingColor from "./components/FloatingColor"
import Sidebar from "./components/Sidebar"
import ThreeRender from "./components/ThreeRender"
import Topbar from "./components/Topbar"
import { IndexContext } from "./config/Context"
import { defaultBoxColor, defaultBoxColorOpened, defaultBoxIndex, defaultBoxKey, defaultBoxOpacity, defaultOffset } from "./config/Variable"
import { useKeyPressed } from "./hooks/CustomHooks"


function App() {

  const [Index, setIndex] = useState<number>(defaultBoxIndex)
  const [Opacity, setOpacity] = useState<number>(defaultBoxOpacity)
  const [IsBoxColor, setIsBoxColor] = useState<boolean>(defaultBoxColorOpened)
  const [ColorBox,setColorBox] = useState<string>(defaultBoxColor)
  const [BoxKey, setBoxKey] = useState<string>(defaultBoxKey)
  const [BoxOffset, setBoxOffset] = useState(defaultOffset)

  // RESET LOGIC FOR EACH VALUE OF THE BOXES
  console.log(`${BoxKey} and ${ColorBox} then ${IsBoxColor}`)

  const val = {
    Index, 
    setIndex, 
    Opacity, 
    setOpacity, 
    IsBoxColor, 
    setIsBoxColor,
    ColorBox,
    setColorBox,
    BoxKey, 
    setBoxKey,
    BoxOffset, 
    setBoxOffset
  }

  return (
    <IndexContext.Provider value={val}>
        <Sidebar/>
        <Topbar/>
        <ThreeRender/>
        <FloatingColor/>
    </IndexContext.Provider>
  )
}

export default App
