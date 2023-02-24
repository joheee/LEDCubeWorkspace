import { useContext, useState } from "react"
import { HexColorPicker } from "react-colorful"
import { IndexContext } from "../config/Context"
import { defaultBoxColor, defaultBoxColorOpened, defaultBoxKey } from "../config/Variable"
import { LED } from "../model/LED"

export default function FloatingColor() {

    const indexContext = useContext(IndexContext)
    const [ColorInput, setColorInput] = useState(defaultBoxColor)

    const handleClickSave = () => {
        indexContext.setColorBox!(ColorInput)
        const currentSavedColor = new LED(indexContext.BoxKey, ColorInput)
        currentSavedColor.appendLocalStorage()
        // handleClickExit()
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
            <button onClick={handleClickSave}>save</button>
        </div>
}