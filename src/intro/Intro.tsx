import { Html } from '@react-three/drei'
import { type SceneProps } from '../App'
import { Pages } from '../Constants'
import { Earth } from '../Earth'

export function IntroScene(actions: SceneProps) {
    actions.foos.setOnLeft(Pages.INTRO)
    actions.foos.setOnRight(Pages.CLIMATE)

    return (
        <group>
            <Earth rotSpeed={[0,5,0]} />

            <Html position={10} >
                <h1>
                    Intro
                </h1>
            </Html>
        </group>
    )
}