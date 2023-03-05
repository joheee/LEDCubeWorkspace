import { useContext, useEffect } from "react"
import { IndexContext } from "../config/Context"


export function useKeyPressed(keyPress:string, type:string, func:() => void){
    
    const handleKeyPressed = ({key}:any) => {
        if(key === keyPress) {
            func()
        }
    }

    useEffect(()=>{
        window.addEventListener(type, handleKeyPressed)
    },[])
}   