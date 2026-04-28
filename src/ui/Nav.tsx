import type { JSX } from "react";
import * as THREE from 'three'

export function Button(props: JSX.IntrinsicElements['group']) {
    const r = 5;

    const h = 5, l = h, w = 1
    const shape = new THREE.Shape()
    shape.lineTo(l, h)
    shape.lineTo(2 * l, 0)
    shape.lineTo(2 * l, -w)
    shape.lineTo(l, h - w)
    shape.lineTo(0, -w)
    shape.lineTo(0, 0)

    return (
        <group {...props}>
            <mesh rotation={[Math.PI/2, 0, 0]} >
                <cylinderGeometry args={[r,r, 2]} />
                <meshToonMaterial color={'teal'} />
            </mesh>
            <mesh position={[-l, 0, 0]} >
                <meshToonMaterial color='black' />
                <extrudeGeometry args={[shape, {depth: 1}]} />
            </mesh>
        </group>
    )
}