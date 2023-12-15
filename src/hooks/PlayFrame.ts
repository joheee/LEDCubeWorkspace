import { useContext, useState } from "react";
import { IndexContext } from "../config/Context";
import { defaultIsDeactivate } from "../config/Variable";
import { BoxFrameInterface } from "./LocalStorages";
import { useSaveFrame } from "./SaveFrame";

export function usePlayFrame(millis:number) {
    const indexContext = useContext(IndexContext)
    const {handleSave} = useSaveFrame()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const timer = (ms:number) => new Promise(res => setTimeout(res, ms))

    async function iterates(frames:BoxFrameInterface[]){
        indexContext.setIsDeactivate!(true)
        for(let i=0; i<frames.length; i++) {
            indexContext.setCurrFrame!(i)
            await handleSave(setIsLoading, i)
            await timer(millis)
            if(i === frames.length - 1) indexContext.setCurrFrame!(0)
        }
        indexContext.setIsDeactivate!(defaultIsDeactivate)
    }

    const triggerPlay = () => iterates(indexContext.IsEightByEight ? indexContext.frameEight?.Frames! : indexContext.frameSixteen?.Frames!)
    
    return {triggerPlay}
}