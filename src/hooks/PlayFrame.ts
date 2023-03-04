import { useContext, useEffect, useState } from "react";
import { IndexContext } from "../config/Context";
import { BoxFrameInterface } from "./LocalStorages";

export function usePlayFrame(millis:number) {
    const indexContent = useContext(IndexContext)
    
    const timer = (ms:number) => new Promise(res => setTimeout(res, ms))

    async function iterates(frames:BoxFrameInterface[]){
        for(let i=0; i<frames.length; i++) {
            indexContent.setCurrFrame!(i)
            await timer(millis)
            if(i === frames.length - 1) indexContent.setCurrFrame!(0)
        }
    }

    const triggerPlay = () => iterates(indexContent.IsEightByEight ? indexContent.frameEight?.Frames! : indexContent.frameSixteen?.Frames!)
    
    return {triggerPlay}
}