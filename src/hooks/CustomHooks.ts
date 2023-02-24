import { useEffect, useState } from "react"
import { defaultBoxColor } from "../config/Variable"

export function useFetchLocalStorage(key:string){
    const [ColorValue, setColorValue] = useState<string>(defaultBoxColor)
    const getLocalStorage = localStorage.getItem(key)

    useEffect(() => {
        if(getLocalStorage) setColorValue(JSON.parse(getLocalStorage).hexColor)
        else setColorValue(defaultBoxColor)
    },[getLocalStorage])

    return {ColorValue}
}