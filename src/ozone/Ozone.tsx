import { useState } from "react";
import type { SceneProps } from "../App";
import { Pages, useCSSVariable, type ThreeD } from "../Constants";
import { Earth } from "../Earth";
import { RadiationSquiggle } from "./Ray";
import { Forcefield } from "./Shield";
import { Sun } from "./Sun";
import { Dialogue } from "../ui/Narrate";

export const INFO = [
    "Ozone (O3) in the stratosphere filters out ultraviolet radiation that is harmful to biological systems.",
    "Certain chemicals that we release into the atmosphere, such as chlorofluorocarbons (CFCs), cause ozone molecules to break apart, depleting the ozone layer."
]

const TOOLTIPS = {
    DEF: {
        key: 0,
        title: 'Definition',
        text: "Ozone (O3) in the stratosphere filters out ultraviolet radiation that is harmful to biological systems.",
        position: [0,0,0] as ThreeD
    },
    DEGRADATION: {
        key: 1,
        title: "Ozone Degradation",
        text: "Certain chemicals that we release into the atmosphere, such as chlorofluorocarbons (CFCs), cause ozone molecules to break apart, depleting the ozone layer.",
        position: [1,1,0] as ThreeD,
    }
}

export function OzoneScene(actions: SceneProps) {
    actions.foos.setOnUp(Pages.NOVEL_ENTS)
    actions.foos.setOnDown(Pages.OCEAN_ACID)

    const [hasOzone, setHasOzone] = useState(true);

    const earthX = -10, earthY = 1;

    return (
        <group>
            <group>
                <Earth worldRot={[Math.PI * -0.5, 0, 0]} position={[earthX, earthY, 0]} scale={1.1} rotSpeed={[0, 0.05, 0]}/>
                {hasOzone && <Forcefield radius={9} position={[earthX, earthY, 1]} />}
            </group>

            <group>
                <Sun position={[27, 0+earthY/2, 0]}/>
                <group>
                    <RadiationSquiggle position={[5.76, 2.8456+earthY, 4]} rotation={[0.013, 0.3, -Math.PI / 1.89]} scale={3.186}/>
                    <RadiationSquiggle position={[5.28, 0+earthY, 3]} rotation={[0.23, 0, Math.PI / 2]} scale={3.2}/>
                    <RadiationSquiggle position={[5.89, -3.03642+earthY, 0]} rotation={[0, -0.12, Math.PI / 1.8]} scale={3.32}/>
                </group>
            </group>

            <Dialogue />
        </group>
    )
}