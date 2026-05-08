import { Html } from "@react-three/drei";
import type { Runnable, ThreeD } from "../Constants";
import { useState, type JSX } from "react";
import Tooltip from '../assets/icons8-info.svg?react' //<a target="_blank" href="https://icons8.com/icon/59817/info">Info</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

function Info({pos, title, text}: {pos: ThreeD, title: string, text: string}) {
    return (
        <Html position={pos} >
            <div className="info">
                <h1>{title}</h1>
                <div className="text">
                    <p>{text}</p>
                </div>
            </div>
        </Html>
    )
}

export function TooltipPoint({title, text, color, doOnClick=() => {return}, ...props}: 
    {title: string, text: string, color?: string, doOnClick?: Runnable} & JSX.IntrinsicElements['group']) {
    const [showInfo, setShowInfo] = useState(false)
    return (
        <group {...props} >
            {showInfo && <Info pos={[1.5,1,0]} title={title} text={text} />}
            <Html>
                <div className='tooltip' 
                onClick={(e) => {
                    e.stopPropagation()
                    setShowInfo(!showInfo)
                    doOnClick()
                }} >
                    <Tooltip fill={color} />
                </div>
            </Html>
        </group>
    )
}