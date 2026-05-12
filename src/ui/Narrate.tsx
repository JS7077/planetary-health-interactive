import { Text } from "@react-three/drei";
import { useCSSVariable } from "../Constants";


export function Dialogue() {
    return (
        <group position={[0,-9.5,20]}>
            <mesh position={[0,0,-1]}>
                <planeGeometry args={[49,5]}/>
                <meshBasicMaterial color={useCSSVariable('--tooltip-bg')} opacity={.95} transparent />
            </mesh>
            <Text color={useCSSVariable('--color-link')} >
                Narration
            </Text>
        </group>
    )
}