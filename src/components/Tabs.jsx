import { useState } from "react";
import { TablaKardex } from "./tables/TablaKadex";

export function Tabs({data}){

    const [activateTab, setActivateTab] = useState(0)

    const handleClick = (index) => {
        setActivateTab(index)
    }

    return (
      <div>
        <ul>
            <li onClick={() => handleClick(0)}>
                Kardex
            </li>

        </ul>
        <div>
            {activateTab === 0 && <TablaKardex data={data}></TablaKardex>}
        </div>
      </div>
    );

}