import { useEffect, useState } from "react"
import { defaultBoxColor, defaultFrameArray } from "../config/Variable"

export function useFetchColorLocalStorage(key:string){
    const [ColorValue, setColorValue] = useState<string | null>(defaultBoxColor)
    const getLocalStorage = localStorage.getItem(key)
    
    useEffect(() => {
        if(getLocalStorage) setColorValue(JSON.parse(getLocalStorage).hexColor)
        else setColorValue(null)
    },[getLocalStorage])
    
    return {ColorValue}
}

export function useFetchFramesLocalStorage(key:string){
    const [Frames, setFrames] = useState(defaultFrameArray)
    const [reset, setReset] = useState(false)
    const getLocalStorage = localStorage.getItem(key)

    const refetch = () => setReset(!reset)

    useEffect(() => {
        if(getLocalStorage) setFrames(JSON.parse(getLocalStorage))
        else setFrames(defaultFrameArray)
    },[getLocalStorage, reset])
    
    return {Frames, refetch}
}