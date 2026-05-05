import type { SceneProps } from "../App";
import { Pages } from "../Constants";
import { Earth } from "../Earth";
import { TooltipPoint } from "../ui/Text";


export function ClimateChangeScene(actions: SceneProps) {
    actions.foos.setOnUp(Pages.INTRO)
    actions.foos.setOnDown(Pages.BIOSPHERE)

    return (
        <group>
            <Earth worldRot={[0, 0, 0]} rotSpeed={[0, 0, 0]} position={[10,10,0]} />
            <TooltipPoint title="Carbon" text="CO2" color="red"/>
        </group>
    )
}