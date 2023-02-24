import { createContext } from "react";

interface IndexContextInterface {
    Index:number,
    setIndex?:(e:number) => void,
    Opacity:number,
    setOpacity?:(e:number) => void
}

const defaultState = {
    Index:8,
    Opacity:10
}

export const IndexContext = createContext<IndexContextInterface>(defaultState)