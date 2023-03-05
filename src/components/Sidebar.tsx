import { HexColorPicker } from "react-colorful"
import { useContext, useEffect, useState } from "react"
import { LayerTotalEight, LayerTotalSixteen } from "../config/Mapping"
import { IndexContext } from "../config/Context"
import {
  defaultBackroundColor,
  defaultBoxOpacityMax,
  maxOffset,
} from "../config/Variable"
import { useFetchBackground } from "../hooks/LocalStorages"
import { BACKGROUND_COLOR } from "../config/Variable"

export default function Sidebar() {

  const indexContext = useContext(IndexContext)
  useFetchBackground()

  if(localStorage.getItem(BACKGROUND_COLOR) !== defaultBackroundColor) localStorage.setItem(BACKGROUND_COLOR, localStorage.getItem(BACKGROUND_COLOR)!)
  else localStorage.setItem(BACKGROUND_COLOR, defaultBackroundColor)

  useEffect(() => {
    document.body.style.backgroundColor = indexContext.ColorBackground
  }, [indexContext.ColorBackground])

  function handleEight() {
    indexContext.setIsEightByEight!(true)
    indexContext.frameEight?.refetch()
  }
  function handleSixteen() {
    indexContext.setIsEightByEight!(false)
    indexContext.frameSixteen?.refetch()
  }

  const [Layer, setLayer] = useState<number[]>([])

  const handleChangeColor = (color: string) => {
    indexContext.setColorBackground!(color);
  }

  useEffect(() => {
    if (indexContext.IsEightByEight) {
      setLayer(LayerTotalEight)
      indexContext.setIndex!(8)
    } else {
      setLayer(LayerTotalSixteen)
      indexContext.setIndex!(16)
    }
  }, [indexContext.IsEightByEight])

  return (
    <div className="sidebar-container flex-column-center">
      <div className="flex-column-center">
        <div className="">background color</div>
        <HexColorPicker
          color={indexContext.ColorBackground}
          onChange={handleChangeColor}
        />
      </div>

      {indexContext.frameEight?.Frames.length === 0 &&
      indexContext.frameSixteen?.Frames.length === 0 ? null : (
        <>
          <div className="flex-column-center">
            <div className="">box opacity {indexContext.Opacity / 100}</div>
            <input
              type="range"
              value={indexContext.Opacity}
              onChange={(e) => indexContext.setOpacity!(Number(e.target.value))}
              min="0"
              max={defaultBoxOpacityMax}
            />
          </div>

          <div className="flex-column-center">
            <div className="">box spacing {indexContext.BoxOffset}</div>
            <input
              type="range"
              value={indexContext.BoxOffset}
              onChange={(e) =>
                indexContext.setBoxOffset!(Number(e.target.value))
              }
              min="1"
              max={maxOffset}
            />
          </div>

          <div className="">
            current cube {indexContext.IsEightByEight ? "8 by 8" : "16 by 16"}
          </div>
          <div className="flex-row-center">
            <button onClick={handleEight}>8 x 8 x 8</button>
            <button onClick={handleSixteen}>16 x 16 x 16</button>
          </div>

          <div className="">layer {indexContext.Index + 1}</div>
          <div className="grid-four-columns">
            {Layer.map((i) => (
              <button onClick={() => indexContext.setIndex!(i)} key={i}>
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              indexContext.IsEightByEight
                ? indexContext.setIndex!(8)
                : indexContext.setIndex!(16)
            }
          >
            full view
          </button>

          <button
            onClick={() =>
              indexContext.setIsPhotoModal!(!indexContext.isPhotoModal)
            }
          >
            upload image
          </button>
          <button>save list of frame</button>
        </>
      )}
    </div>
  )
}
