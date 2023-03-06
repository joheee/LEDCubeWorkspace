import { useCallback, useContext } from "react"
import { IndexContext } from "../config/Context"
import { defaultIsPhotoModal } from "../config/Variable"
import { useKeyPressed } from "../hooks/KeyPressed"

export function PhotoModal() {
    const indexContext = useContext(IndexContext)
    useKeyPressed('keydown', 
        useCallback((e:any) => {
            const buff = e as KeyboardEvent
            if(buff.key === 'Escape') {
                indexContext.setIsPhotoModal!(defaultIsPhotoModal)
            }
        },[])
    )

    return (
        !indexContext.isPhotoModal ? null :
        <div className="modal-container">
            <div className="default-card flex-column-center photo-container">
                <div className="flex-row-space-between">
                    <div className="">photo generator</div>
                    <button onClick={() => indexContext.setIsPhotoModal!(!indexContext.isPhotoModal)}>x</button>
                </div>
                <div className="image-container">
                    <img src="https://art.pixilart.com/50fff0d8e8679e2.png" alt="" />
                </div>
                <div className="flex-row-space-between">
                    <input type="file" name="" id="" />
                    <button>save image</button>                
                </div>
            </div>
        </div>
    )
}