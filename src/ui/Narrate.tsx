import { Text } from "@react-three/drei";
import { useCSSVariable, type Page } from "../Constants";


export function Dialogue({scene, words}: {scene: Page, words: string}) {
    return (
        <group position={[0,-9.5,20]}>
            <mesh position={[0,0,-1]}>
                <planeGeometry args={[49,5]}/>
                <meshBasicMaterial color={useCSSVariable('--tooltip-bg')} opacity={.95} transparent />
            </mesh>
            <Text 
            color={useCSSVariable('--color-link')} 
            position={[0,1.5,0]}
            >
                {scene}
            </Text>
            <Text
            color={useCSSVariable('--color-forest')}
            fontSize={.7}
            >
                {words}
            </Text>
        </group>
    )
}