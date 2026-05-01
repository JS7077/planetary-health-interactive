import type { SetURLSearchParams } from "react-router-dom";
import { Pages, PAGE_QUERY, type Page } from "../Constants";
import { Html } from "@react-three/drei";

export function Sidebar({setSearchParams}: {setSearchParams: SetURLSearchParams}) {
    const pages = Object.values(Pages) as Page[]
    const items = pages.map(pg => <Item pg={pg} setSearchParams={setSearchParams} />)

    return (
        <Html position={[-24,12,0]} >
            <nav>
                <ol>
                    {items}
                </ol>
            </nav>
        </Html>
    )
}

function Item({pg, setSearchParams}: {pg: Page, setSearchParams: SetURLSearchParams}) {
    return (
        <li>
            <button onClick={()=>{
                setSearchParams([[PAGE_QUERY, pg]])
            }}>
                {pg}
            </button>
        </li>
    )
}