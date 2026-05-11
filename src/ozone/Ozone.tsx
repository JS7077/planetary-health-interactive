import { useState, type Dispatch, type SetStateAction } from "react";
import type { SceneProps } from "../App";
import { Pages, useCSSVariable, type ThreeD } from "../Constants";
import { Earth } from "../Earth";
import { TooltipPoint } from "../ui/Text";
import { RadiationSquiggle } from "./Ray";
import { Forcefield } from "./Shield";
import { Sun } from "./Sun";

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

    let shownTips = [TOOLTIPS.DEF]
    const [hasOzone, setHasOzone] = useState(true);
    const [isClicked, setIsClicked] = useState(Object.values(TOOLTIPS).map(() => false)) as [boolean[], Dispatch<SetStateAction<boolean[]>>]

    const earthX = -10;

    const tipColor = useCSSVariable('--color-sea')
    const tooltips = Object.values(shownTips).map(tip => 
    <TooltipPoint title={tip.title} text={tip.text} position={tip.position} color={tipColor} key={tip.key}
    doOnClick={() => setIsClicked(arr => {arr[tip.key] = true; return arr;})} 
    />)

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

            {tooltips.filter(tip => !isClicked[tip.key as unknown as number])}
            console.log(isClicked)
        </group>
    )
}