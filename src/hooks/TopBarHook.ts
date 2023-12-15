import { IndexContextInterface } from "../config/Context"
import { FRAME_16_KEY, FRAME_8_KEY } from "../config/Variable"
import { BoxFrameInterface, clearFrame } from "./LocalStorages"

export function useTopBarHook (indexContext:IndexContextInterface) {
    const frameEight = indexContext.frameEight!
    const frameSixteen = indexContext.frameSixteen!

    function injectFrame(frame:string, arr:BoxFrameInterface[]){
        if(arr.length === 0) localStorage.setItem(frame, JSON.stringify([{frame:0}]))
        else {
            let res = [] as BoxFrameInterface[]
            arr.forEach(item => {
                res.push(item)
            })
            res.push({frame:arr.length})
            localStorage.setItem(frame,JSON.stringify(res))
        }
        indexContext.setCurrFrame!(arr.length)
    }

    async function handleCreateFrame() {
        if(indexContext.IsEightByEight) {
            injectFrame(FRAME_8_KEY, frameEight.Frames) 
            frameEight.refetch()
        }
        else {
            injectFrame(FRAME_16_KEY, frameSixteen.Frames)
            frameSixteen.refetch()
        }
    } 

    async function handleDeleteFrame() {
        clearFrame(indexContext)
    }

    return {handleCreateFrame, handleDeleteFrame}

}