import { useContext } from "react"
import { IndexContext } from "../config/Context"

export function PhotoModal() {
    const indexContext = useContext(IndexContext)
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