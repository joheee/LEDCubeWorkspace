import { FRAME_16_KEY, FRAME_8_KEY, hexBound } from "../config/Variable"
import { BoxFrameInterface } from "../hooks/LocalStorages"

export class LED {
    x:number
    y:number
    z:number
    color:string
    constructor(key:string, color:string) {
        const keyArr = key.split('-')
        this.x = parseInt(keyArr[0])
        this.y = parseInt(keyArr[1])
        this.z = parseInt(keyArr[2])
        this.color = color
    }
    
    extractRGB() {
        const hexCode = this.color.replace('#','')
        console.log(hexCode)
        const red = parseInt(hexCode[0] + hexCode[1], hexBound)
        const green = parseInt(hexCode[2] + hexCode[3], hexBound)
        const blue = parseInt(hexCode[4] + hexCode[5], hexBound)
        return {
            'red':Math.round(red),
            'green':Math.round(green),
            'blue':Math.round(blue)
        }
    }

    generateKey() {
        let key = ''.concat(this.x.toString())
        key = key.concat('-')
        key = key.concat(this.y.toString())
        key = key.concat('-')
        key = key.concat(this.z.toString())
        return key
    }

    appendLocalStorage(currFrame:number, iSeight:boolean, array:BoxFrameInterface[]) {
        const rgb = this.extractRGB()
        const packageStructure = {
            'x':this.x,
            'y':this.y,
            'z':this.z,
            'red':rgb.red,
            'green':rgb.green,
            'blue':rgb.blue,
            'hexColor':this.color
        }
        let key = this.generateKey()
        let box = {
            boxKey : key,
            attribute : packageStructure
        }
        const findArrayIndex = array.findIndex(item => item.frame === currFrame)
        const findBoxIndex = array[findArrayIndex].box?.findIndex(box => box.boxKey === key)
        if(array[findArrayIndex].box?.length === 0 || array[findArrayIndex].box === undefined) {
            array[findArrayIndex].box! = [box]
        } else if(findBoxIndex !== -1) {
            array[findArrayIndex].box![findBoxIndex!].attribute = {
                x:this.x,
                y:this.y,
                z:this.z,
                red:rgb.red,
                green:rgb.green,
                blue:rgb.blue,
                hexColor:this.color
            }
        }
        else {
            array[findArrayIndex].box?.push(box)
        }
        iSeight ? localStorage.setItem(FRAME_8_KEY, JSON.stringify(array)) : localStorage.setItem(FRAME_16_KEY, JSON.stringify(array))
        
        return `success add/update ${key} to local storage`
    }
    
    removeFromLocalStorage(currFrame:number, iSeight:boolean, array:BoxFrameInterface[]) {
        let key = this.generateKey()
        const findArrayIndex = array.findIndex(item => item.frame === currFrame)
        const findBoxIndex = array[findArrayIndex].box?.findIndex(box => box.boxKey === key)
    
        if(findBoxIndex === undefined) return 
        array[findArrayIndex].box! = array[findArrayIndex].box!.filter(item => item.boxKey !== key)
        iSeight ? localStorage.setItem(FRAME_8_KEY, JSON.stringify(array)) : localStorage.setItem(FRAME_16_KEY, JSON.stringify(array))
        
        return `success remove ${key} from local storage`
    }
}
