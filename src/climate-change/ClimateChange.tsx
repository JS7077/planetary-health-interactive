import { Earth } from "../Earth";


export function ClimateChangeScene() {
    return (
        <group>
            <Earth worldRot={[0, 0, 0]} rotSpeed={{dirs: [0, 0, 0]}} />
        </group>
    )
}