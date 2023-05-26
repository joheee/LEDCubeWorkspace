import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { IndexContext } from "../config/Context"
import { defaultEightBound, defaultIsPhotoModal, defaultSixteenBound } from "../config/Variable"
import { useKeyPressed } from "../hooks/KeyPressed"
import { BoxFrameInterface, drawDataURIOnCanvas } from "../hooks/LocalStorages"


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
        if(canvas) drawDataURIOnCanvas(URL.createObjectURL(currFile), canvas!, indexContext)
    }

    const canvasRef = useRef<HTMLCanvasElement>(null)
  
    return (
        !indexContext.isPhotoModal ? null :
        <div className="modal-container">
            <div className="default-card flex-column-center photo-container">
                <div className="flex-row-space-between">
                    <div className="">photo generator</div>
                    <button onClick={() => indexContext.setIsPhotoModal!(!indexContext.isPhotoModal)}>x</button>
                </div>
                <div className="image-container">
                    <canvas className="canvas-photo" ref={canvasRef}></canvas>
                </div>
                <div className="flex-row-space-between">
                    <input type="file" name="" id="" onChange={e => handleImageChange(e.target.files!)}/>
                </div>
            </div>
        </div>
    )
}