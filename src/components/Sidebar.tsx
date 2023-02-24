import { BackgroundColor } from '../config/Color'
import { HexColorPicker } from "react-colorful"
import './Sidebar.css'
import { useEffect, useState } from 'react'

interface backgroundColorCard {
    hex: string
}

function BackgroundColorCard(color:backgroundColorCard) {

    const handleChangeBackground = () => {
        document.body.style.backgroundColor = `${color.hex}`
    }

    return (
        <div onClick={handleChangeBackground} className="background-color-card" style={{
            backgroundColor:color.hex
        }}></div>
    )
}

export default function Sidebar(){

    const [color, setcolor] = useState('#000000')
    useEffect(() => {
        document.body.style.backgroundColor = color
    }, [color])

    return (
        <div className="sidebar-container"> 

            <div className="layer-container">
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>7</button>
                <button>8</button>
            </div>

            <div className="full-view-button-container">
                <button>full view</button>
            </div>

            {/* <div className="background-container">
                {
                    BackgroundColor.map((item, i) => (
                        <BackgroundColorCard hex={item}/>
                    ))
                }
            </div> */}

            <HexColorPicker color={color} onChange={setcolor} />
        </div>
    )
}