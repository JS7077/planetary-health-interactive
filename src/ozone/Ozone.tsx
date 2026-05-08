import { useState } from "react";
import type { SceneProps } from "../App";
import { Pages, useCSSVariable, type ThreeD } from "../Constants";
import { Earth } from "../Earth";
import { TooltipPoint } from "../ui/Text";
import { RadiationSquiggle } from "./Ray";
import { Forcefield } from "./Shield";
import { Sun } from "./Sun";

const TOOLTIPS = {
    DEF: {
        title: 'Definition',
        text: "Ozone (O3) in the stratosphere filters out ultraviolet radiation that is harmful to biological systems. ",
        position: [0,0,0] as ThreeD
    }
}

export function OzoneScene(actions: SceneProps) {
    actions.foos.setOnUp(Pages.NOVEL_ENTS)
    actions.foos.setOnDown(Pages.OCEAN_ACID)

    const [hasOzone, setHasOzone] = useState(true);

    const earthX = -10;

    const tipColor = useCSSVariable('color-sea')
    const tooltips = Object.values(TOOLTIPS).map(tip => <TooltipPoint title={tip.title} text={tip.text} position={tip.position} color={tipColor} />)

    return (
        <group>
            <group>
                <Earth worldRot={[Math.PI * -0.5, 0, 0]} position={[earthX, 0, 0]} scale={1.1} rotSpeed={[0, 0.05, 0]}/>
                {hasOzone && <Forcefield radius={9} position={[earthX, 0, 1]} />}
            </group>

            <group>
                <Sun position={[27, 0, 0]}/>
                <group>
                    <RadiationSquiggle position={[4.76, 2.8456, 4]} rotation={[0.013, 0.3, -Math.PI / 1.89]} scale={3.186}/>
                    <RadiationSquiggle position={[4.28, 0, 3]} rotation={[0.23, 0, Math.PI / 2]} scale={3.2}/>
                    <RadiationSquiggle position={[4.89, -3.03642, 0]} rotation={[0, -0.12, Math.PI / 1.8]} scale={3.32}/>
                </group>
            </group>

            {tooltips}
            <TooltipPoint title="Ozone Degradation"
            text="Certain chemicals that we release into the atmosphere, such as chlorofluorocarbons (CFCs), cause ozone molecules to break apart, depleting the ozone layer."
            color={useCSSVariable('--color-sea')} position={[1,1,0]} doOnClick={() => setHasOzone(false)} />
        </group>
    )
}