import { useCallback, useContext, useState } from "react"
import { IndexContext } from "../config/Context"
import { defaultIsSaveModal } from "../config/Variable"
import { useKeyPressed } from "../hooks/KeyPressed"
import { useSaveFrame } from "../hooks/SaveFrame"
import { LoadingAnimation } from "./LoadingAnimation"

export function SaveModal() {
    const indexContext = useContext(IndexContext)
    const {handleSave} = useSaveFrame()
    const [animation, setAnimation] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useKeyPressed('keydown', 
        useCallback((e:any) => {
            const buff = e as KeyboardEvent
            if(buff.key === 'Escape') {
                indexContext.SetIsSaveModal!(defaultIsSaveModal)
            }
        },[])
    )

    return (
        !indexContext.isSaveModal ? null :
        <div className="modal-container">
            <div className="default-card flex-column-center photo-container">
                {
                    isLoading ? <LoadingAnimation/> : 
                    <>
                        <div className="flex-row-space-between">
                            <div className="">save current animations</div>
                            <button onClick={() => indexContext.SetIsSaveModal!(!indexContext.isSaveModal)}>x</button>
                        </div>
                        <input onChange={e => setAnimation(e.target.value)} className="input-styling button-save" type='text' placeholder="give a name for your animation"/>
                        <button disabled={indexContext.IsDeactivate} className="button-save" onClick={() => handleSave(animation, setIsLoading)}>save</button>
                    </> 
                }
            </div>
        </div>
    )
}