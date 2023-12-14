import { useContext, useEffect, useState } from "react"
import { generateKey } from "../anim/BoxItem"
import { FrameInterface, IndexContext, IndexContextInterface } from "../config/Context"
import { defaultBoundaries, defaultBoxColor, defaultEightBound, defaultFrameArray, defaultSixteenBound, FRAME_16_KEY, FRAME_8_KEY } from "../config/Variable"

export interface BoxAttributeInterface {
    x: number,
    y: number,
    z: number,
    red: number,
    green: number,
    blue: number,
    hexColor: string
}
  
export interface BoxInterface {
    boxKey?:string,
    attribute?:BoxAttributeInterface
}

export interface BoxFrameInterface {
    frame:number,
    box?:BoxInterface[]
}

export function useFetchColorLocalStorage(key:string){
    const [ColorValue, setColorValue] = useState<string | null>(defaultBoxColor)
    const indexContent = useContext(IndexContext)
    
    function fetchBoxes(frame:string) {
        const array = JSON.parse(localStorage.getItem(frame)!) as BoxFrameInterface[]
        if(array === null) {
            setColorValue(null)
            return;
        }
        const findFrame = array.filter(item => item.frame === indexContent.CurrFrame)[0]
        const findBox = findFrame.box?.filter(item => item.boxKey === key)[0]
        if(findBox === undefined) setColorValue(null)
        else {
            setColorValue(findBox.attribute?.hexColor!)
        }        
    }

    useEffect(() => {
        if(indexContent.IsEightByEight) fetchBoxes(FRAME_8_KEY)
        else fetchBoxes(FRAME_16_KEY)
    },[indexContent.frameEight, indexContent.frameSixteen])
    
    return {ColorValue}
}

export function useFetchFramesLocalStorage(key:string){
    const [Frames, setFrames] = useState<BoxFrameInterface[]>(defaultFrameArray)
    const [reset, setReset] = useState(false)
    const getLocalStorage = localStorage.getItem(key)

    const refetch = () => setReset(!reset)

    useEffect(() => {
        if(getLocalStorage) setFrames(JSON.parse(getLocalStorage))
        else setFrames(defaultFrameArray)
    },[getLocalStorage, reset])
    
    return {Frames, refetch}
}

interface FetchLocalDynamicInterface {
    localStorageKey:string,
    state:any,
    setState:(e:any) => void,
    defaultValue:any,
}

export function useFetchDynamicLocalStorage(prop:FetchLocalDynamicInterface) {
    const getBackgroundColor = localStorage.getItem(prop.localStorageKey)
    useEffect(() => {
        if(getBackgroundColor === null) localStorage.setItem(prop.localStorageKey, prop.state.toString())
        else prop.setState!(getBackgroundColor)
    }, [])

    useEffect(() => {
            if(prop.state !== prop.defaultValue) localStorage.setItem(prop.localStorageKey, prop.state.toString())
            const getBackgroundColor = localStorage.getItem(prop.localStorageKey)
        prop.setState!(getBackgroundColor!)
    }, [prop.state])
}

export function clearAllColorInFrame(indexContext:IndexContextInterface){
    let getCurrentCube = indexContext.IsEightByEight ? indexContext.frameEight : indexContext.frameSixteen
    if(!getCurrentCube) return
    getCurrentCube.Frames[indexContext.CurrFrame] = {frame:indexContext.CurrFrame}
    const getCurrKey = indexContext.IsEightByEight ? FRAME_8_KEY : FRAME_16_KEY
    localStorage.setItem(getCurrKey, JSON.stringify(getCurrentCube.Frames))
    getCurrentCube.refetch()   
}

export function clearFrame(indexContext:IndexContextInterface){
    let getCurrentFrame = indexContext.IsEightByEight ? indexContext.frameEight : indexContext.frameSixteen
    if(!getCurrentFrame) return
    let currFrameIndex = indexContext.CurrFrame
    let filterFrame = getCurrentFrame.Frames.filter(item => {
        return item.frame !== currFrameIndex
    })
    filterFrame = filterFrame.map((item,i) => {
        item.frame = i
        return item
    })
    
    const getCurrKey = indexContext.IsEightByEight ? FRAME_8_KEY : FRAME_16_KEY
    if(filterFrame.length < 1) {
        localStorage.removeItem(getCurrKey)
        getCurrentFrame.refetch()
        return
    } 
    localStorage.setItem(getCurrKey, JSON.stringify(filterFrame))
    getCurrentFrame.refetch()
    if(indexContext.CurrFrame !== 0) indexContext.setCurrFrame!(indexContext.CurrFrame - 1)
}

function returnDataImage(canvas:HTMLCanvasElement,context:CanvasRenderingContext2D, dimension:number) : ImageDataSettings[]{
    let res = []
    for(let i=0;i<dimension;i++){
        for(let j=0;j<dimension;j++){
            const imgd = context!.getImageData(i, j, canvas.width, canvas.height);
            res.push(imgd)
        }
    }
    return res
}
interface ImageDataInterface {
    data:any,
    colorSpace:string,
    height:number,
    width:number
}
function componentToHex(c:number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
function rgbToHex(r:number, g:number, b:number) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
export function drawDataURIOnCanvas(strDataURI:string, canvas:HTMLCanvasElement, indexContext:IndexContextInterface) {
    var img = new window.Image()
    img.addEventListener("load", function () {

        const context =canvas.getContext("2d")
        context!.clearRect(0, 0, canvas.width, canvas.height)
        canvas.width = img.width
        canvas.height = img.height
        const dimension = indexContext.IsEightByEight ? defaultEightBound :defaultSixteenBound
        context!.drawImage(img, 0, 0, dimension, dimension)
        
        const imageArray = returnDataImage(canvas, context!, dimension) as ImageDataInterface[]
        let boxFrame : FrameInterface|undefined = indexContext.IsEightByEight ? indexContext.frameEight : indexContext.frameSixteen
        if(boxFrame){
            if(indexContext.IsEightByEight) {
                let currBoxFrame : BoxInterface[] = []
                for(let j=0;j<defaultEightBound / defaultBoundaries;j++){
                    imageArray.forEach((item,i) => {
                        let boxes : BoxInterface = {}
                        boxes.attribute = {
                            x:Math.floor(i/dimension),
                            y:i%dimension,
                            z:j,
                            hexColor:rgbToHex(item.data[0],item.data[1],item.data[2]),
                            red:item.data[0],
                            green:item.data[1],
                            blue:item.data[2]
                        }
                        boxes.boxKey = generateKey([boxes.attribute.x,boxes.attribute.y,boxes.attribute.z])
                        currBoxFrame.push(boxes)
                    })
                }
                boxFrame.Frames[indexContext.CurrFrame].box = currBoxFrame
                const currFrameKey = indexContext.IsEightByEight ? FRAME_8_KEY:FRAME_16_KEY
                localStorage.setItem(currFrameKey, JSON.stringify(boxFrame.Frames))
                boxFrame.refetch()
            } else {
                let currBoxFrame : BoxInterface[] = []
                for(let j=0;j<defaultSixteenBound  / (defaultBoundaries*2);j++){
                    imageArray.forEach((item,i) => {
                        let boxes : BoxInterface = {}
                        boxes.attribute = {
                            x:Math.floor(i/dimension),
                            y:i%dimension,
                            z:j,
                            hexColor:rgbToHex(item.data[0],item.data[1],item.data[2]),
                            red:item.data[0],
                            green:item.data[1],
                            blue:item.data[2]
                        }
                        boxes.boxKey = generateKey([boxes.attribute.x,boxes.attribute.y,boxes.attribute.z])
                        currBoxFrame.push(boxes)
                    })
                }
                boxFrame.Frames[indexContext.CurrFrame].box = currBoxFrame
                const currFrameKey = indexContext.IsEightByEight ? FRAME_8_KEY:FRAME_16_KEY
                localStorage.setItem(currFrameKey, JSON.stringify(boxFrame.Frames))
                boxFrame.refetch()
            }
        }
    })
    img.setAttribute("src", strDataURI);
 }