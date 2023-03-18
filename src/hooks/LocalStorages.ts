import { useContext, useEffect, useState } from "react"
import { IndexContext, IndexContextInterface } from "../config/Context"
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

interface FetchLocalDynamicInterface {
    localStorageKey:string,
    state:any,
    setState:(e:any) => void,
    defaultValue:any,
}

export function useFetchDynamicLocalStorage(prop:FetchLocalDynamicInterface) {
    const getBackgroundColor = localStorage.getItem(prop.localStorageKey)
    useEffect(() => {
        if(getBackgroundColor === null) localStorage.setItem(prop.localStorageKey, prop.state.toString())
        else prop.setState!(getBackgroundColor)
    }, [])

    useEffect(() => {
            if(prop.state !== prop.defaultValue) localStorage.setItem(prop.localStorageKey, prop.state.toString())
            const getBackgroundColor = localStorage.getItem(prop.localStorageKey)
        prop.setState!(getBackgroundColor!)
    }, [prop.state])
}

export function clearAllColorInFrame(indexContext:IndexContextInterface){
    let getCurrentCube = indexContext.IsEightByEight ? indexContext.frameEight : indexContext.frameSixteen
    if(!getCurrentCube) return
    getCurrentCube.Frames[indexContext.CurrFrame] = {frame:indexContext.CurrFrame}
    const getCurrKey = indexContext.IsEightByEight ? FRAME_8_KEY : FRAME_16_KEY
    localStorage.setItem(getCurrKey, JSON.stringify(getCurrentCube.Frames))
    getCurrentCube.refetch()   
}

export function clearFrame(indexContext:IndexContextInterface){
    let getCurrentFrame = indexContext.IsEightByEight ? indexContext.frameEight : indexContext.frameSixteen
    if(!getCurrentFrame) return
    let currFrameIndex = indexContext.CurrFrame
    let filterFrame = getCurrentFrame.Frames.filter(item => {
        return item.frame !== currFrameIndex
    })
    filterFrame = filterFrame.map((item,i) => {
        item.frame = i
        return item
    })
    
    const getCurrKey = indexContext.IsEightByEight ? FRAME_8_KEY : FRAME_16_KEY
    if(filterFrame.length < 1) {
        localStorage.removeItem(getCurrKey)
        getCurrentFrame.refetch()
        return
    } 
    localStorage.setItem(getCurrKey, JSON.stringify(filterFrame))
    getCurrentFrame.refetch()
    if(indexContext.CurrFrame !== 0) indexContext.setCurrFrame!(indexContext.CurrFrame - 1)
}