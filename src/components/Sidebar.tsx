import { HexColorPicker } from "react-colorful"
import { useContext, useEffect, useState } from 'react'
import { LayerTotalEight, LayerTotalSixteen } from '../config/Mapping'
import { IndexContext } from '../config/Context'
import { defaultBoxOpacityMax, maxOffset } from "../config/Variable"

export default function Sidebar(){
    const [Color,setColor] = useState<string>('#000000')

    useEffect(() => {
        document.body.style.backgroundColor = Color
    }, [Color])

    const indexContext = useContext(IndexContext)

    function handleEight () {
        indexContext.setIsEightByEight!(true)
        indexContext.frameEight?.refetch()
    } 
    function handleSixteen () {
        indexContext.setIsEightByEight!(false)
        indexContext.frameSixteen?.refetch()
    }

    const [Layer, setLayer] = useState<number[]>([])

    useEffect(() => {
        if(indexContext.IsEightByEight) {
            setLayer(LayerTotalEight) 
            indexContext.setIndex!(8)
        } else {
            setLayer(LayerTotalSixteen)
            indexContext.setIndex!(16)
        }
    }, [indexContext.IsEightByEight])

    return (
        <div className="sidebar-container flex-column-center"> 

            <div className="">layer {indexContext.Index + 1}</div>
            <div className="grid-four-columns">
                {
                    Layer.map(i => (
                        <button onClick={() => indexContext.setIndex!(i)} key={i}>{i + 1}</button>
                        ))
                    }
            </div>
            <button onClick={() =>  indexContext.IsEightByEight ? indexContext.setIndex!(8) : indexContext.setIndex!(16)}>full view</button>

            <div className="flex-column-center">
                <div className="">background color</div>
                <HexColorPicker color={Color} onChange={setColor} />
            </div>

            <div className='flex-column-center'>
                <div className="">box opacity {indexContext.Opacity/100}</div>
                <input type="range" value={indexContext.Opacity} onChange={e => indexContext.setOpacity!(Number(e.target.value))} min="0" max={defaultBoxOpacityMax}/>
            </div>
            
            <div className='flex-column-center'>
                <div className="">box spacing {indexContext.BoxOffset}</div>
                <input type="range" value={indexContext.BoxOffset} onChange={e => indexContext.setBoxOffset!(Number(e.target.value))} min="1" max={maxOffset}/>
            </div>

            <div className="flex-row-center">
                <button onClick={handleEight}>8 x 8 x 8</button>
                <button onClick={handleSixteen}>16 x 16 x 16</button>
            </div>
        </div>
    )
}