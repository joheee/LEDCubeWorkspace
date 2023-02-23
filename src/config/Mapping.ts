export const Layer = (z:number) => {
    let arr = []
    for(let x = 0; x<8; x++) {
        for(let y = 0; y<8; y++) {
            arr.push([x,y,z])
        }
    }
    return arr
}