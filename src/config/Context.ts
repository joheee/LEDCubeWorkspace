import { createContext } from "react";
import { BoxFrameInterface } from "../hooks/LocalStorages";
import { defaultBoxColor, defaultBoxColorOpened, defaultBoxIndex, defaultBoxKey, defaultBoxOpacity, defaultCurrFrame, defaultIsEightByEight, defaultIsPhotoModal, defaultOffset, defaultRefreshFrame } from "./Variable";

interface FrameInterface {
    Frames:BoxFrameInterface[],
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
    isPhotoModal:boolean, 
    setIsPhotoModal?:(e:boolean) => void
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
    IsEightByEight:defaultIsEightByEight,
    isPhotoModal:defaultIsPhotoModal, 
}

export const IndexContext = createContext<IndexContextInterface>(defaultState)