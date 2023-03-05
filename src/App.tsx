import { useState } from "react"
import FloatingColor from "./components/FloatingColor"
import { PhotoModal } from "./components/PhotoModal"
import Sidebar from "./components/Sidebar"
import ThreeRender from "./components/ThreeRender"
import Topbar from "./components/Topbar"
import { IndexContext } from "./config/Context"
import { defaultBackroundColor, defaultBoxColor, defaultBoxColorOpened, defaultBoxIndex, defaultBoxKey, defaultBoxOpacity, defaultCurrFrame, defaultIsEightByEight, defaultIsPhotoModal, defaultOffset, defaultRefreshFrame, FRAME_16_KEY, FRAME_8_KEY } from "./config/Variable"
import { useFetchFramesLocalStorage } from "./hooks/LocalStorages"


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

  // GET ALL POSSIBLE FRAMES
  const frameEight = useFetchFramesLocalStorage(FRAME_8_KEY)
  const frameSixteen = useFetchFramesLocalStorage(FRAME_16_KEY)

  // PHOTO MODAL
  const [isPhotoModal, setIsPhotoModal] = useState<boolean>(defaultIsPhotoModal)

  // BACKGROUND COLOR
  const [ColorBackground,setColorBackground] = useState<string>(defaultBackroundColor)

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
    setIsEightByEight,
    frameEight,
    frameSixteen,
    isPhotoModal, 
    setIsPhotoModal,
    ColorBackground,
    setColorBackground
  }

  return (
    <IndexContext.Provider value={val}>
        <PhotoModal/>
        <Sidebar/>
        <Topbar/>
        <ThreeRender/>
        <FloatingColor/>
    </IndexContext.Provider>
  )
}

export default App
