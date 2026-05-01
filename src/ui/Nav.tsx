import * as THREE from 'three'

function Button({ onClick, isUp }: { onClick: ()=>void, isUp?: boolean }) {
    const r = 5;

    const h = 4, l = 4, w = 1.5
    const shape = new THREE.Shape()
    shape.lineTo(l, h)
    shape.lineTo(2 * l, 0)
    shape.lineTo(2 * l, -w)
    shape.lineTo(l, h - w)
    shape.lineTo(0, -w)
    shape.lineTo(0, 0)

    return (
        <group rotation={[0,0,isUp?0:Math.PI]} scale={.4} position={[2, 10 * (isUp?1:-1), 0]} >
            <group scale={[1, .85, 1]} onClick={onClick} >
                <mesh rotation={[Math.PI/2, 0, 0]} >
                    <cylinderGeometry args={[r,r, 2]} />
                    <meshToonMaterial color={'teal'} />
                </mesh>
                <mesh position={[-l, -r/5, 0]} >
                    <meshToonMaterial color='black' />
                    <extrudeGeometry args={[shape, {depth: 1}]} />
                </mesh>
            </group>
        </group>
    )
}

export function Buttons({onUp, onDown}: { onUp: ()=>void, onDown: ()=>void} ) {
    return (
        <group>
            <Button onClick={onUp} isUp />
            <Button onClick={onDown} />
        </group>
    )
}