import { FRAME_8_KEY } from "../config/Variable"
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
    
    const {Frames, refetch} = useFetchFramesLocalStorage(FRAME_8_KEY)

    function handleCreateFrame() {
        if(Frames.length === 0) {
            localStorage.setItem(FRAME_8_KEY, JSON.stringify([0]))
        } else {
            let arr = []
            Frames.forEach(item => {
                arr.push(item)
            })
            arr.push(Frames.length)
            localStorage.setItem(FRAME_8_KEY,JSON.stringify(arr))
        }
        refetch()
    } 

    return (
        <div className="topbar-container flex-start-gap">
            {
                Frames.map((item,i) => (
                    <TopBarCard key={i} index={item}/>
                ))
            }
            <button className="" onClick={handleCreateFrame}>+</button>
        </div>
    )
}