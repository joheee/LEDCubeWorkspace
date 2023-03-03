import { useContext, useEffect, useState } from "react"
import { IndexContext } from "../config/Context"
import { defaultBoxColor, defaultFrameArray, FRAME_16_KEY, FRAME_8_KEY } from "../config/Variable"

export interface BoxAttributeInterface {
    x: number,
    y: number,
    z: number,
    red: number,
    green: number,
    blue: number,
    hexColor: string
}
  
export interface BoxInterface {
    boxKey?:string,
    attribute?:BoxAttributeInterface
}

export interface BoxFrameInterface {
    frame:number,
    box?:BoxInterface[]
}
  

export function useFetchColorLocalStorage(key:string){
    const [ColorValue, setColorValue] = useState<string | null>(defaultBoxColor)
    const indexContent = useContext(IndexContext)
    
    function fetchBoxes(frame:string) {
        const array = JSON.parse(localStorage.getItem(frame)!) as BoxFrameInterface[]
        if(array === null) {
            setColorValue(null)
            return;
        }
        const findFrame = array.filter(item => item.frame === indexContent.CurrFrame)[0]
        const findBox = findFrame.box?.filter(item => item.boxKey === key)[0]
        if(findBox === undefined) setColorValue(null)
        else {
            setColorValue(findBox.attribute?.hexColor!)
        }        
    }

    useEffect(() => {
        if(indexContent.IsEightByEight) fetchBoxes(FRAME_8_KEY)
        else fetchBoxes(FRAME_16_KEY)
    },[indexContent.frameEight, indexContent.frameSixteen])
    
    return {ColorValue}
}

export function useFetchFramesLocalStorage(key:string){
    const [Frames, setFrames] = useState<BoxFrameInterface[]>(defaultFrameArray)
    const [reset, setReset] = useState(false)
    const getLocalStorage = localStorage.getItem(key)

    const refetch = () => setReset(!reset)

    useEffect(() => {
        if(getLocalStorage) setFrames(JSON.parse(getLocalStorage))
        else setFrames(defaultFrameArray)
    },[getLocalStorage, reset])
    
    return {Frames, refetch}
}