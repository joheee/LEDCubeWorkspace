import { createContext } from "react";
import { defaultBoxColor, defaultBoxColorOpened, defaultBoxIndex, defaultBoxKey, defaultBoxOpacity, defaultCurrFrame, defaultIsEightByEight, defaultOffset, defaultRefreshFrame } from "./Variable";

interface FrameInterface {
    Frames:never[],
    refetch:()=>void
}

interface IndexContextInterface {
    Index:number,
    setIndex?:(e:number) => void,
    Opacity:number,
    setOpacity?:(e:number) => void,
    IsBoxColor:boolean, 
    setIsBoxColor?:(e:boolean) => void,
    ColorBox:string,
    setColorBox?:(e:string) => void,
    BoxKey:string, 
    setBoxKey?:(e:string) => void,
    BoxOffset:number, 
    setBoxOffset?:(e:number) => void,
    CurrFrame:number, 
    setCurrFrame?:(e:number) => void,
    RefreshFrame:boolean, 
    setRefreshFrame?:(e:boolean) => void,
    IsEightByEight:boolean, 
    setIsEightByEight?:(e:boolean) => void,
    frameEight?: FrameInterface,
    frameSixteen?: FrameInterface,
}

const defaultState = {
    Index:defaultBoxIndex,
    Opacity:defaultBoxOpacity,
    IsBoxColor:defaultBoxColorOpened,
    ColorBox:defaultBoxColor,
    BoxKey:defaultBoxKey,
    BoxOffset:defaultOffset,
    CurrFrame:defaultCurrFrame,
    RefreshFrame:defaultRefreshFrame,
    IsEightByEight:defaultIsEightByEight
}

export const IndexContext = createContext<IndexContextInterface>(defaultState)