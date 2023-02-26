import { hexBound } from "../config/Variable"

export class LED {
    x:number
    y:number
    z:number
    color:string
    constructor(key:string, color:string) {
        this.x = parseInt(key[0])
        this.y = parseInt(key[1])
        this.z = parseInt(key[2])
        this.color = color
    }
    
    extractRGB() {
        const hexCode = this.color.replace('#','')
        const red = parseInt(hexCode[0] + hexCode[1], hexBound)
        const green = parseInt(hexCode[1] + hexCode[2], hexBound)
        const blue = parseInt(hexCode[3] + hexCode[4], hexBound)
        return {
            'red':Math.round(red/hexBound),
            'green':Math.round(green/hexBound),
            'blue':Math.round(blue/hexBound)
        }
    }

    generateKey() {
        let key = ''
        key = key.concat(this.x.toString())
        key = key.concat(this.y.toString())
        key = key.concat(this.z.toString())
        return key
    }

    appendLocalStorage() {
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
        localStorage.setItem(key, JSON.stringify(packageStructure))
        return `success add/update ${key} to local storage`
    }

    removeFromLocalStorage() {
        let key = this.generateKey()
        localStorage.removeItem(key)
        return `success remove ${key} from local storage`
    }
}
