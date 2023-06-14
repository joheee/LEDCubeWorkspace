import { doc, setDoc } from "@firebase/firestore";
import { useContext } from "react"
import { IndexContext } from "../config/Context"
import { db, realtimeDatabase } from "../config/Firebase";
import { defaultBoxIndex, FRAME_16_KEY, FRAME_8_KEY } from "../config/Variable";
import { BoxFrameInterface, useFetchFramesLocalStorage } from "./LocalStorages";
import toast from 'react-hot-toast'
import { ref, set, update } from "firebase/database";

export function useSaveFrame(){
    const indexContext = useContext(IndexContext)

    const COLLECTION_KEY = indexContext.IsEightByEight ? FRAME_8_KEY : FRAME_16_KEY
    const boxes = useFetchFramesLocalStorage(COLLECTION_KEY)
    
    function findBoxes(box:BoxFrameInterface,b:number,j:number,k:number)  {
        const boxes = box.box
        for(let i=0;i<boxes!.length;i++){
            const each = boxes![i]
            if(each.attribute?.x===b && each.attribute?.y===j && each.attribute?.z===k) {
                return each
            }
        }
        return null
    }

    async function handleSave(ANIMATION_NAME:string, setIsLoading:(e:any)=>void){
        // hardcoded path
        ANIMATION_NAME = 'frame_cenah'
        setIsLoading(true)
        
        if(ANIMATION_NAME === '') {
            setIsLoading(false)
            toast.error('animation name must be filled!')
            return
        }
        
        let a = 0
        let obj = []
        // put to rtdb
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                for(let k=0;k<8;k++){
                    const each = findBoxes(boxes.Frames[0],i,j,k)
                    // console.log('ledState/' + `${a < 255 ? ANIMATION_NAME : "frame_cenah2"}` + `/${a}`)

                    if(each == null) {
                        obj.push({
                                r:0,
                                g:0,
                                b:0,
                                x:i,
                                y:j,
                                z:k
                        })
                        
                    } 
                    else {
                        obj.push({
                                r:Math.ceil(each.attribute?.red! / 16),
                                g:Math.ceil(each.attribute?.green! / 16),
                                b:Math.ceil(each.attribute?.blue! / 16),
                                x:i,
                                y:j,
                                z:k
                        })
                    }
                    a++
                }
            }
        }
        
        
        // put to firebase
        await setDoc(doc(db, 'testing_frame', ANIMATION_NAME), {
            array:obj
        })
        .then(() => {
            update(ref(realtimeDatabase, 'ledState/'), {
                'frame_cenah':false
            }).then(() => {
                toast.success(`Success upload animation!`)
                setIsLoading(false)
            })
            // toast.success(`Success upload ${ANIMATION_NAME}`)
        })
    }

    return { handleSave }
}