import { createContext } from "react";
import { defaultBoxColor, defaultBoxColorOpened, defaultBoxIndex, defaultBoxKey, defaultBoxOpacity } from "./Variable";

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
    setBoxKey?:(e:string) => void
}

const defaultState = {
    Index:defaultBoxIndex,
    Opacity:defaultBoxOpacity,
    IsBoxColor:defaultBoxColorOpened,
    ColorBox:defaultBoxColor,
    BoxKey:defaultBoxKey
}

export const IndexContext = createContext<IndexContextInterface>(defaultState)