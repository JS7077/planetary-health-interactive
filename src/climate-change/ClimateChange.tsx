import type { SceneProps } from "../App";
import { Pages } from "../Constants";
import { Earth } from "../Earth";


export function ClimateChangeScene(actions: SceneProps) {
    actions.foos.setOnUp(Pages.INTRO)
    actions.foos.setOnDown(Pages.BIOSPHERE)

    return (
        <group>
            <Earth worldRot={[0, 0, 0]} rotSpeed={{dirs: [0, 0, 0]}} />
        </group>
    )
}