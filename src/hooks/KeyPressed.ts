import { useContext, useEffect } from "react"
import { IndexContext } from "../config/Context"
import { defaultBoxColorOpened } from "../config/Variable"


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