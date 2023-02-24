export const Layer = (z:number) => {
    let arr = []
    for(let x = 0; x<8; x++) {
        for(let y = 0; y<8; y++) {
            arr.push([x,y,z])
        }
    }
    return arr
}

export const LayerTotal = [0,1,2,3,4,5,6,7]