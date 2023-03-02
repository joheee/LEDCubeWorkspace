export const Layer = (z:number, dimension:number) => {
    let arr = []
    for(let x = 0; x<dimension; x++) {
        for(let y = 0; y<dimension; y++) {
            arr.push([x,y,z])
        }
    }
    return arr
}

export const LayerTotal = [0,1,2,3,4,5,6,7]