import { useContext, useEffect } from "react"
import { FrameInterface, IndexContext, IndexContextInterface } from "../config/Context"
import { defaultCurrFrame, FRAME_16_KEY, FRAME_8_KEY } from "../config/Variable"
import { BoxFrameInterface, clearFrame } from "../hooks/LocalStorages"
import { usePlayFrame } from "../hooks/PlayFrame"


function TopBarCard(prop:BoxFrameInterface) {
    const indexContext = useContext(IndexContext)

    return (
        <button className={`${indexContext.CurrFrame === prop.frame ? 'button-active' : null}`} onClick={() => indexContext.setCurrFrame!(prop.frame)}>
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
        indexContext.setCurrFrame!(arr.length)
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

    const {triggerPlay} = usePlayFrame(100);
    function handlePlayFrame() {
        triggerPlay()
    }

    function handleDeleteFrame() {
        clearFrame(indexContext)
    }

    return (
        <div className="topbar-container topbar-grid">
            {
                indexContext.IsEightByEight ? 
                    indexContext.frameEight?.Frames.length !== 0 ? 
                        <DefaultFrame frameEight={frameEight} frameSixteen={frameSixteen} indexContext={indexContext}/>
                        : null
                    :
                    indexContext.frameSixteen?.Frames.length !== 0 ?
                        <DefaultFrame frameEight={frameEight} frameSixteen={frameSixteen} indexContext={indexContext}/>
                        : null
            }
            
            <div className="flex-start-gap">
                {
                    indexContext.IsEightByEight ?
                    indexContext.frameEight?.Frames.length !== 0 ? 
                    <div className="topbar-card">
                                <button onClick={handleDeleteFrame}>delete</button>
                            </div> : null
                        :
                        indexContext.frameSixteen?.Frames.length !== 0 ? 
                        <div className="topbar-card">
                                <button onClick={handleDeleteFrame}>delete</button>
                            </div> : null
                }
                <div className="topbar-card">
                    <button onClick={handleCreateFrame}>+</button>
                    <button onClick={() => handlePlayFrame()}>play</button>
                </div>
            </div>
        </div>
    )
}

interface DefaultFrameInterface {
    indexContext:IndexContextInterface,
    frameEight:FrameInterface,
    frameSixteen:FrameInterface
}

function DefaultFrame({indexContext,frameEight,frameSixteen}:DefaultFrameInterface){

    return <div className="flex-start-gap frame-container">
    {
        indexContext.IsEightByEight ? 
            indexContext.frameEight?.Frames.length !== 0 ? 
                <div className="topbar-card">
                    {
                        frameEight.Frames.map((item,i) => (
                            <TopBarCard key={i} frame={item.frame}/>
                            ))
                        }
                </div>
                : null
            :
            indexContext.frameSixteen?.Frames.length !== 0 ?
                <div className="topbar-card">
                    {
                        frameSixteen.Frames.map((item,i) => (
                            <TopBarCard key={i} frame={item.frame}/>
                        ))
                    }
                </div> : null
    }
</div>   
}