import { createContext } from "react";
import { BoxFrameInterface } from "../hooks/LocalStorages";
import { defaultBackroundColor, defaultBoxColor, defaultBoxColorOpened, defaultBoxIndex, defaultBoxKey, defaultBoxOpacity, defaultCurrFrame, defaultDeleteShortCut, defaultIsBoxSelected, defaultIsDeactivate, defaultIsEightByEight, defaultIsPhotoModal, defaultOffset, defaultPaintShortCut, defaultRefreshFrame } from "./Variable";

export interface FrameInterface {
    Frames:BoxFrameInterface[],
    refetch:()=>void
}

export interface IndexContextInterface {
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
    setIsPhotoModal?:(e:boolean) => void,
    ColorBackground:string,
    setColorBackground?:(e:string) => void,
    IsDeleteShortCut:boolean, 
    setIsDeleteShortCut?:(e:boolean) => void,
    IsBoxSelected:boolean, 
    setIsBoxSelected?:(e:boolean) => void,
    IsPaintShortCut:boolean, 
    setIsPaintShortCut?:(e:boolean) => void,
    IsDeactivate:boolean, 
    setIsDeactivate?:(e:boolean) => void
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
    ColorBackground:defaultBackroundColor,
    IsDeleteShortCut:defaultDeleteShortCut,
    IsBoxSelected:defaultIsBoxSelected, 
    IsPaintShortCut:defaultPaintShortCut,
    IsDeactivate:defaultIsDeactivate
}

export const IndexContext = createContext<IndexContextInterface>(defaultState)