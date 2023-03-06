import { useCallback, useContext, useEffect, useState } from "react"
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

    useKeyPressed('keydown', 
        useCallback((e:any) => {
            const buff = e as KeyboardEvent
            if(buff.key === 'Escape') {
                indexContext.setIsBoxColor!(defaultBoxColorOpened)
            }
        },[])
    )
    
    const handleClickSave = () => {
        indexContext.setColorBox!(ColorInput)
        const currentSavedColor = new LED(indexContext.BoxKey, ColorInput)
        currentSavedColor.appendLocalStorage(indexContext.CurrFrame, indexContext.IsEightByEight, indexContext.IsEightByEight ? indexContext.frameEight?.Frames! : indexContext.frameSixteen?.Frames!)
        handleClickExit()
    }

    const handleClickRemove = () => {
        const currentSavedColor = new LED(indexContext.BoxKey, ColorValue!)
        currentSavedColor.removeFromLocalStorage(indexContext.CurrFrame, indexContext.IsEightByEight, indexContext.IsEightByEight ? indexContext.frameEight?.Frames! : indexContext.frameSixteen?.Frames!)
        handleClickExit()
    }

    const handleClickExit = () => {
        indexContext.setIsBoxColor!(defaultBoxColorOpened)
        indexContext.setColorBox!(defaultBoxColor)
        indexContext.setBoxKey!(defaultBoxKey)
        setColorInput(defaultBoxColor)
        indexContext.frameEight?.refetch()
        indexContext.frameSixteen?.refetch()
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
                <button onClick={handleClickSave}>save</button>
                {
                    ColorValue === null ? null :
                    <button onClick={handleClickRemove}>remove</button>
                }
            </div>
        </div>
}