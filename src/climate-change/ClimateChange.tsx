import type { SceneProps } from "../App";
import { Pages } from "../Constants";
import { Earth } from "../Earth";
import { TooltipPoint } from "../ui/Text";


export function ClimateChangeScene({actions}: SceneProps) {
    actions.setOnLeft(Pages.INTRO)
    actions.setOnRight(Pages.BIOSPHERE)

    return (
        <group>
            <Earth worldRot={[0, 0, 0]} rotSpeed={[0, 0, 0]} position={[10,10,0]} />
            <TooltipPoint title="Carbon" text="CO2" color="red"/>
        </group>
    )
}