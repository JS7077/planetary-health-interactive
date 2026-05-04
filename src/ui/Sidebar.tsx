import type { SetURLSearchParams } from "react-router-dom";
import { Pages, PAGE_QUERY, type Page } from "../Constants";
import { Html, RoundedBox } from "@react-three/drei";
import { useState, type Dispatch, type JSX, type SetStateAction } from "react";
import Collapse from '../assets/collapse-svgrepo-com.svg?react' //https://www.svgrepo.com/show/459017/collapse.svg

export function Manager({setSearchParams}: {setSearchParams: SetURLSearchParams}) {
    const [isCollapsed, setIsCollapsed] = useState(true)
    return (
        isCollapsed?<Menu setIsCollapsed={setIsCollapsed} />
        :<Sidebar setIsCollapsed={setIsCollapsed} setSearchParams={setSearchParams} />
    )
}

function Sidebar({setSearchParams, setIsCollapsed}: {setSearchParams: SetURLSearchParams, setIsCollapsed: Dispatch<SetStateAction<boolean>>}) {
    const pages = Object.values(Pages) as Page[]
    const items = pages.map(pg => <Item pg={pg} setSearchParams={setSearchParams} setIsCollapsed={setIsCollapsed} />)

    const svgSide = '1.5em'

    return (
        <Html position={[-24.5,11.86,0]} >
            <nav>
                <Collapse 
                height={svgSide}
                width={svgSide}
                onClick={() => setIsCollapsed(true)}
                />
                <ol>
                    {items}
                </ol>
            </nav>
        </Html>
    )
}

function Item({pg, setSearchParams, setIsCollapsed}: {pg: Page, setSearchParams: SetURLSearchParams, setIsCollapsed: Dispatch<SetStateAction<boolean>>}) {
    return (
        <li>
            <a onClick={()=>{
                setSearchParams([[PAGE_QUERY, pg]])
                setIsCollapsed(true)
            }}>
                {pg}
            </a>
        </li>
    )
}

function Menu(setIsCollapsed: {setIsCollapsed: Dispatch<SetStateAction<boolean>>}) {
    return (
        <group position={[-23.65,11,0]} >
            <RoundedBox 
            args={[1,1,1]}
            radius={.1}
            smoothness={4}
            bevelSegments={4}
            onClick={() => setIsCollapsed.setIsCollapsed(false)} 
            >
                <meshToonMaterial color={"#8FC988"}/>
            </RoundedBox>
            <group position={[0,0,1]}>
                <MenuBar position={[0,.27,0]} />
                <MenuBar position={[0,-.27,0]} />
                <MenuBar />
            </group>
        </group>
    )
}

function MenuBar(props: JSX.IntrinsicElements['group']) {
    return (
        <group {...props} >
            <RoundedBox 
            args={[.7,.13,1]}
            radius={.05}
            smoothness={4}
            bevelSegments={4}
            >
                <meshToonMaterial color={'black'} />
            </RoundedBox>
        </group>
    )
}