import type { SceneProps } from "../App";
import { Pages, useCSSVariable } from "../Constants";
import { Earth } from "../Earth";
import { TooltipPoint } from "../ui/Text";
import { RadiationSquiggle } from "./Ray";
import { Forcefield } from "./Shield";
import { Sun } from "./Sun";


export function OzoneScene(actions: SceneProps) {
    actions.foos.setOnUp(Pages.NOVEL_ENTS)
    actions.foos.setOnDown(Pages.OCEAN_ACID)

    const earthX = -10;

    return (
        <group>
            <group>
                <Earth worldRot={[Math.PI * -0.5, 0, 0]} position={[earthX, 0, 0]} scale={1.1} rotSpeed={[0, 0.05, 0]}/>
                <Forcefield radius={9} position={[earthX, 0, 1]}  />
            </group>

            <group>
                <Sun position={[27, 0, 0]}/>
                <group>
                    <RadiationSquiggle position={[4.76, 2.8456, 4]} rotation={[0.013, 0.3, -Math.PI / 1.89]} scale={3.186}/>
                    <RadiationSquiggle position={[4.28, 0, 3]} rotation={[0.23, 0, Math.PI / 2]} scale={3.2}/>
                    <RadiationSquiggle position={[4.89, -3.03642, 0]} rotation={[0, -0.12, Math.PI / 1.8]} scale={3.32}/>
                </group>
            </group>

            <TooltipPoint title="Ozone" text="O2" position={[0,0,0]} color={useCSSVariable('--color-sea')} />
        </group>
    )
}