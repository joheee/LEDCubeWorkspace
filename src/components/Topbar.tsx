import { useContext } from "react"
import { FrameInterface, IndexContext, IndexContextInterface } from "../config/Context"
import { BoxFrameInterface } from "../hooks/LocalStorages"
import { usePlayFrame } from "../hooks/PlayFrame"
import { useTopBarHook } from "../hooks/TopBarHook"


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

    const {handleCreateFrame, handleDeleteFrame} = useTopBarHook(indexContext)

    const {triggerPlay} = usePlayFrame(500);

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
                    <button onClick={triggerPlay}>play</button>
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