import type { SetURLSearchParams } from "react-router-dom";
import { Page, PAGE_QUERY } from "../Constants";

export function Sidebar({setSearchParams}: {setSearchParams: SetURLSearchParams}) {
    const pages = Object.values(Page) as Page[]
    const items = pages.map(pg => <Item pg={pg} setSearchParams={setSearchParams} />)

    return (
        <nav>
            <ol>
                {items}
            </ol>
        </nav>
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