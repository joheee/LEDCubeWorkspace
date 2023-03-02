import { useContext, useEffect, useState } from "react"
import { HexColorPicker } from "react-colorful"
import { IndexContext } from "../config/Context"
import { defaultBoxColor, defaultBoxColorOpened, defaultBoxKey } from "../config/Variable"
import { useKeyPressed } from "../hooks/KeyPressed"
import { useFetchColorLocalStorage } from "../hooks/LocalStorages"
import { LED } from "../model/LED"

export default function FloatingColor() {

    const indexContext = useContext(IndexContext)
    const [ColorInput, setColorInput] = useState(defaultBoxColor)
    const {ColorValue} = useFetchColorLocalStorage(indexContext.BoxKey)    
    useKeyPressed('Escape', 'keydown')

    const handleClickSave = () => {
        indexContext.setColorBox!(ColorInput)
        const currentSavedColor = new LED(indexContext.BoxKey, ColorInput)
        currentSavedColor.appendLocalStorage()
        handleClickExit()
    }

    const handleClickRemove = () => {
        const currentSavedColor = new LED(indexContext.BoxKey, ColorValue!)
        currentSavedColor.removeFromLocalStorage()
        handleClickExit()
    }

    const handleClickExit = () => {
        indexContext.setIsBoxColor!(defaultBoxColorOpened)        
        indexContext.setColorBox!(defaultBoxColor)
        indexContext.setBoxKey!(defaultBoxKey)
        setColorInput(defaultBoxColor)
    }


    return indexContext.IsBoxColor === false ? null :
        <div className="flex-column-center absolute-float">
            <div className="flex-row-space-between">
                <div className="">LED {indexContext.BoxKey}</div>
                <button onClick={handleClickExit}>exit</button>
            </div>
            <HexColorPicker color={ColorInput} onChange={setColorInput} />
            <input className="input-styling" type='text' value={ColorInput} onChange={(e)=>setColorInput(e.target.value)}/>
            <div className="flex-row-space-between">
                {
                    ColorValue === null ? null :
                    <button onClick={handleClickRemove}>remove</button>
                }
                <button onClick={handleClickSave}>save</button>
            </div>
        </div>
}