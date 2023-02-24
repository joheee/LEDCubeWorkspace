import { useContext, useState } from "react"
import Sidebar from "./components/Sidebar"
import ThreeRender from "./components/ThreeRender"
import { IndexContext } from "./config/Context"


function App() {

  const [Index, setIndex] = useState<number>(8)
  const [Opacity, setOpacity] = useState<number>(10)
  
  return (
    <IndexContext.Provider value={{Index, setIndex, Opacity, setOpacity}}>
        <Sidebar/>
        <ThreeRender/>
    </IndexContext.Provider>
  )
}

export default App
