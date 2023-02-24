import { useState } from "react"
import FloatingColor from "./components/FloatingColor"
import Sidebar from "./components/Sidebar"
import ThreeRender from "./components/ThreeRender"
import { IndexContext } from "./config/Context"
import { defaultBoxColor, defaultBoxColorOpened, defaultBoxIndex, defaultBoxKey, defaultBoxOpacity } from "./config/Variable"
import { useFetchLocalStorage } from "./hooks/CustomHooks"


function App() {

  const [Index, setIndex] = useState<number>(defaultBoxIndex)
  const [Opacity, setOpacity] = useState<number>(defaultBoxOpacity)
  const [IsBoxColor, setIsBoxColor] = useState<boolean>(defaultBoxColorOpened)
  const [ColorBox,setColorBox] = useState<string>(defaultBoxColor)
  const [BoxKey, setBoxKey] = useState<string>(defaultBoxKey)
  
  // RESET LOGIC FOR EACH VALUE OF THE BOXES
  console.log(`${BoxKey} and ${ColorBox} then ${IsBoxColor}`)

  const {ColorValue} = useFetchLocalStorage('555')
  console.log(ColorValue)

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
    setBoxKey
  }

  return (
    <IndexContext.Provider value={val}>
        <Sidebar/>
        <ThreeRender/>
        <FloatingColor/>
    </IndexContext.Provider>
  )
}

export default App
