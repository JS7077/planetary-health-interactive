import type { JSX } from "react";


export function Sun(props: JSX.IntrinsicElements['group']) {
    return (
        <group {...props}>
            <mesh>
                <shaderMaterial />
                <sphereGeometry />
            </mesh>
        </group>
    )
}