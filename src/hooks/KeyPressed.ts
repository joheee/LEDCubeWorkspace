import { useCallback, useEffect, useLayoutEffect, useRef } from "react"

export function useKeyPressed(type:string, func:(e:any) => void){
    useEffect(()=>{
        window.addEventListener(type, func)
        return () => {
            window.removeEventListener(type,func)
        }
    },[])
}