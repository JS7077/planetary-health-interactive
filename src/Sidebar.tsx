import type { SetURLSearchParams } from "react-router-dom";
import { Page, pageQuery } from "./Constants";

export function Sidebar(setSearchParams: SetURLSearchParams) {
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
            <button onClick={()=>setSearchParams({pageQuery: pg})}>
                {pg}
            </button>
        </li>
    )
}