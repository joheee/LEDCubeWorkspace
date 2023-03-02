import { useContext } from "react"
import { IndexContext } from "../config/Context"
import { FRAME_16_KEY, FRAME_8_KEY } from "../config/Variable"
import { useFetchFramesLocalStorage } from "../hooks/LocalStorages"

interface TopBarCardInterface {
    index:number
}

function TopBarCard(prop:TopBarCardInterface) {
    return (
        <button className="">
            {prop.index}
        </button>
    )
}

export default function Topbar() {
    
    const indexContext = useContext(IndexContext)
    const frameEight = indexContext.frameEight!
    const frameSixteen = indexContext.frameSixteen!

    function injectFrame(frame:string, arr:never[]){
        if(arr.length === 0) localStorage.setItem(frame, JSON.stringify([0]))
        else {
            let res = []
            arr.forEach(item => {
                res.push(item)
            })
            res.push(arr.length)

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
                    <TopBarCard key={i} index={item}/>
                ))
                :
                frameSixteen.Frames.map((item,i) => (
                    <TopBarCard key={i} index={item}/>
                ))
            }
            <button onClick={handleCreateFrame}>+</button>
        </div>
    )
}