import { useContext } from "react"
import { IndexContext } from "../config/Context"
import { FRAME_16_KEY, FRAME_8_KEY } from "../config/Variable"
import { BoxFrameInterface } from "../hooks/LocalStorages"


function TopBarCard(prop:BoxFrameInterface) {
    const indexContext = useContext(IndexContext)
    return (
        <button onClick={() => indexContext.setCurrFrame!(prop.frame)}>
            {prop.frame}
        </button>
    )
}

export default function Topbar() {
    
    const indexContext = useContext(IndexContext)
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
    }

    function handleCreateFrame() {
        if(indexContext.IsEightByEight) {
            injectFrame(FRAME_8_KEY, frameEight.Frames) 
            frameEight.refetch()
        }
        else {
            injectFrame(FRAME_16_KEY, frameSixteen.Frames)
            frameSixteen.refetch()
        }
    } 

    return (
        <div className="topbar-container flex-start-gap">
            {
                indexContext.IsEightByEight ? 
                frameEight.Frames.map((item,i) => (
                    <TopBarCard key={i} frame={item.frame}/>
                ))
                :
                frameSixteen.Frames.map((item,i) => (
                    <TopBarCard key={i} frame={item.frame}/>
                ))
            }
            <button onClick={handleCreateFrame}>+</button>
        </div>
    )
}