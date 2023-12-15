import { useCallback, useContext, useRef } from "react"
import { IndexContext } from "../config/Context"
import { defaultIsPhotoModal } from "../config/Variable"
import { useKeyPressed } from "../hooks/KeyPressed"
import { drawDataURIOnCanvas } from "../hooks/LocalStorages"
import { useTopBarHook } from "../hooks/TopBarHook"


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

    function handleImageChange(image:FileList){
        const canvas = canvasRef.current 
        const currFile = image[0]
        indexContext.SetPhoto!(URL.createObjectURL(currFile))
        if(canvas) drawDataURIOnCanvas(URL.createObjectURL(currFile), canvas!, indexContext)
    }

    const canvasRef = useRef<HTMLCanvasElement>(null)
  
    return (
        !indexContext.isPhotoModal ? null :
        <div className="modal-container">
            <div className="default-card flex-column-center photo-container">
                <div className="flex-row-space-between">
                    <div className="">choose your photo</div>
                    <button onClick={() => indexContext.setIsPhotoModal!(!indexContext.isPhotoModal)}>x</button>
                </div>
                <div className="image-container">
                    <img src={indexContext.Photo} className="w-full" />
                    <canvas className="canvas-photo" style={{display:'none'}} ref={canvasRef}></canvas>
                </div>
                <input type="file" id="images" onChange={e => handleImageChange(e.target.files!)}/>
            </div>
        </div>
    )
}