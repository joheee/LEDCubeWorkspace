import { OpacityMax } from '../config/Color'
import { HexColorPicker } from "react-colorful"
import './Sidebar.css'
import { useContext, useEffect, useState } from 'react'
import { LayerTotal } from '../config/Mapping'
import { IndexContext } from '../config/Context'

export default function Sidebar(){
    const [color, setcolor] = useState('#000000')

    useEffect(() => {
        document.body.style.backgroundColor = color
    }, [color])

    const indexContext = useContext(IndexContext)

    return (
        <div className="sidebar-container flex-column-center"> 

            <div className="layer-container">
                {
                    LayerTotal.map(i => (
                        <button onClick={() => indexContext.setIndex!(i)} key={i}>{i + 1}</button>
                    ))
                }
            </div>

            <div className="full-view-button-container">
                <button onClick={() => indexContext.setIndex!(8)}>full view</button>
            </div>

            <div className="flex-column-center">
                <div className="">background color</div>
                <HexColorPicker color={color} onChange={setcolor} />
            </div>

            <div className='flex-column-center'>
                <div className="">{indexContext.Opacity/100}</div>
                <input type="range" value={indexContext.Opacity} onChange={e => indexContext.setOpacity!(Number(e.target.value))} min="0" max={OpacityMax}/>
            </div>
        </div>
    )
}