import { Html } from "@react-three/drei";
import type { ThreeD } from "../Constants";
import { useState, type JSX } from "react";
import Tooltip from '../assets/icons8-info.svg?react' //<a target="_blank" href="https://icons8.com/icon/59817/info">Info</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

function Info({pos}: {pos: ThreeD}) {
    return (
        <Html position={pos} >
            <div className="info">
                <h1>Title</h1>
                <p>text</p>
            </div>
        </Html>
    )
}

export function TooltipPoint(props: JSX.IntrinsicElements['group']) {
    const [showInfo, setShowInfo] = useState(false)
    return (
        <group {...props} onClick={() => setShowInfo(!showInfo)}>
            {/* <Tooltip 
        
            /> */}
            {showInfo ? <Info pos={[0,0,0]}/>:<></>}
        </group>
    )
}