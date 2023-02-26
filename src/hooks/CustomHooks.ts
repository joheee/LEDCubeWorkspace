import { useContext, useEffect, useState } from "react"
import { IndexContext } from "../config/Context"
import { defaultBoxColor, defaultBoxColorOpened } from "../config/Variable"

export function useFetchColorLocalStorage(key:string){
    const [ColorValue, setColorValue] = useState<string | null>(defaultBoxColor)
    const getLocalStorage = localStorage.getItem(key)

    useEffect(() => {
        if(getLocalStorage) setColorValue(JSON.parse(getLocalStorage).hexColor)
        else setColorValue(null)
    },[getLocalStorage])

    return {ColorValue}
}

export function useKeyPressed(keyPress:string, type:string){
    
    const indexContext = useContext(IndexContext)

    const handleKeyPressed = ({key}:any) => {
        if(key === keyPress) {
            indexContext.setIsBoxColor!(defaultBoxColorOpened)       
        }
    }

    useEffect(()=>{
        window.addEventListener(type, handleKeyPressed)
    },[])
}