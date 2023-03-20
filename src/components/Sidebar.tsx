import { HexColorPicker } from "react-colorful"
import { useContext, useEffect, useState } from "react"
import { LayerTotalEight, LayerTotalSixteen } from "../config/Mapping"
import { IndexContext } from "../config/Context"
import { DEFAULT_BACKGROUND_COLOR_KEY, defaultBackroundColor, defaultBoxOpacityMax, maxOffset, DEFAULT_OPACITY_KEY, defaultBoxOpacity, DEFAULT_BOX_SPACING_KEY, defaultOffset, FRAME_8_KEY, FRAME_16_KEY} from "../config/Variable"
import { clearAllColorInFrame, useFetchDynamicLocalStorage } from "../hooks/LocalStorages"

export default function Sidebar() {

  const indexContext = useContext(IndexContext)

  // FETCH BACKGROUND
  useFetchDynamicLocalStorage({
    localStorageKey:DEFAULT_BACKGROUND_COLOR_KEY,
    state:indexContext.ColorBackground,
    setState:indexContext.setColorBackground!,
    defaultValue:defaultBackroundColor
  })
  
  // FETCH OPACITY
  useFetchDynamicLocalStorage({
    localStorageKey:DEFAULT_OPACITY_KEY,
    state:indexContext.Opacity,
    setState:indexContext.setOpacity!,
    defaultValue:defaultBoxOpacity
  })

  // FETCH BOX SPACING
  useFetchDynamicLocalStorage({
    localStorageKey:DEFAULT_BOX_SPACING_KEY,
    state:indexContext.BoxOffset,
    setState:indexContext.setBoxOffset!,
    defaultValue:defaultOffset
  })

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

  function handleFullView() {
    indexContext.IsEightByEight ? indexContext.setIndex!(8) : indexContext.setIndex!(16)
  }

  function handleClearColor() {
    clearAllColorInFrame(indexContext)
  }

  return (
    <div className="sidebar-container flex-column-center enable-scroll">
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
            <button disabled={indexContext.IsDeactivate} onClick={handleEight} className={`${indexContext.IsEightByEight ? 'button-active' : null}`} >8 x 8 x 8</button>
            <button disabled={indexContext.IsDeactivate} onClick={handleSixteen} className={`${!indexContext.IsEightByEight ? 'button-active' : null}`} >16 x 16 x 16</button>
          </div>

          <div className="">layer {indexContext.Index + 1}</div>
          <div className="grid-four-columns">
            {Layer.map((i) => (
              <button className={`${indexContext.Index === i ? 'button-active' : null}`} onClick={() => indexContext.setIndex!(i)} key={i}>
                {i + 1}
              </button>
            ))}
          </div>
          <div className="sidebar-two-grid">
            <button disabled={indexContext.IsDeactivate} onClick={() => handleClearColor()}>
              clear color
            </button>
            <button
              onClick={handleFullView}
              className={`${indexContext.IsEightByEight ? indexContext.Index === 8 ? 'button-active' : null : indexContext.Index === 16 ? 'button-active' : null }`}  
              >
              full view
            </button>
            </div>

          <div className="sidebar-two-grid">
            <button disabled={indexContext.IsDeactivate}>save</button>
            <button
              disabled={indexContext.IsDeactivate}
              onClick={() =>
                indexContext.setIsPhotoModal!(!indexContext.isPhotoModal)
              }
              >
              upload image
            </button>
          </div>
        </>
      )}
    </div>
  )
}
