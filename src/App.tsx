import { useState } from "react"
import FloatingColor from "./components/FloatingColor"
import Sidebar from "./components/Sidebar"
import ThreeRender from "./components/ThreeRender"
import Topbar from "./components/Topbar"
import { IndexContext } from "./config/Context"
import { defaultBoxColor, defaultBoxColorOpened, defaultBoxIndex, defaultBoxKey, defaultBoxOpacity, defaultCurrFrame, defaultIsEightByEight, defaultOffset, defaultRefreshFrame } from "./config/Variable"


function App() {

  // IS THERE 8X8X8 OR 16X16X16
  const [IsEightByEight, setIsEightByEight] = useState<boolean>(defaultIsEightByEight)

  // BOX AND LAYER
  const [Index, setIndex] = useState<number>(defaultBoxIndex)
  const [Opacity, setOpacity] = useState<number>(defaultBoxOpacity)
  const [IsBoxColor, setIsBoxColor] = useState<boolean>(defaultBoxColorOpened)
  const [ColorBox,setColorBox] = useState<string>(defaultBoxColor)
  const [BoxKey, setBoxKey] = useState<string>(defaultBoxKey)
  const [BoxOffset, setBoxOffset] = useState(defaultOffset)
  
  // FRAME CONFIG
  const [CurrFrame, setCurrFrame] = useState<number>(defaultCurrFrame)
  const [RefreshFrame, setRefreshFrame] = useState<boolean>(defaultRefreshFrame)

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
    setBoxOffset,
    CurrFrame, 
    setCurrFrame,
    RefreshFrame, 
    setRefreshFrame,
    IsEightByEight, 
    setIsEightByEight
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
