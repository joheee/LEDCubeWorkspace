import { useContext } from "react"
import { IndexContext } from "../config/Context"
import { realtimeDatabase } from "../config/Firebase";
import { FRAME_16_KEY, FRAME_8_KEY } from "../config/Variable";
import { BoxFrameInterface, useFetchFramesLocalStorage } from "./LocalStorages";
import toast from 'react-hot-toast'
import { ref, update } from "firebase/database";

export function useSaveFrame(){

    const indexContext = useContext(IndexContext)
    const COLLECTION_KEY = indexContext.IsEightByEight ? FRAME_8_KEY : FRAME_16_KEY
    const boxes = useFetchFramesLocalStorage(COLLECTION_KEY)
    
    function findBoxes(box:BoxFrameInterface,b:number,j:number,k:number)  {
        const boxes = box.box
        
        if(boxes === undefined) return
        
        for(let i=0;i<boxes!.length;i++){
            const each = boxes![i]
            if(each.attribute?.x===b && each.attribute?.y===j && each.attribute?.z===k) {
                return each
            }
        }
        return null
    }
    
    function convertB64Encoded(frame:BoxFrameInterface[], currFrame?: number|null) {
        let a = 0
        let objNormal = []
        
        for(let i=7;i>=0;i--){
            for(let j=0;j<8;j++){
                for(let k=7;k>=0;k--){
                    const each = findBoxes(frame[currFrame === undefined ? indexContext.CurrFrame : currFrame!],k,i,j)

                    if(each == null) {
                        objNormal.push({
                                r:0,
                                g:0,
                                b:0,
                        })
                        
                    } 
                    else {
                        objNormal.push({
                                r:Math.floor(each.attribute?.red! / 16),
                                g:Math.floor(each.attribute?.green! / 16),
                                b:Math.floor(each.attribute?.blue! / 16),
                        })
                    }
                    a++
                }
            }
        }

        let fifKArray : number[] = []
        objNormal.map(item => {
            fifKArray.push(item.r)
            fifKArray.push(item.g)
            fifKArray.push(item.b)
        })

        return btoa(String.fromCharCode.apply(null, fifKArray))
    }

    async function handleSave(setIsLoading:(e:any)=>void, currFrame?: number|null){

        setIsLoading(true)
        
        await update(ref(realtimeDatabase, 'ledState/'), {
            'frame_cenah':convertB64Encoded(boxes.Frames, currFrame),
            on:true,
            selected:'frame_cenah'
        })
        .then(() => {
            toast.success(`Success upload animation`)
            setIsLoading(false)
        })
    }

    return { handleSave }
}