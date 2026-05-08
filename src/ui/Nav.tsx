import { useEffect, useState } from 'react';
import * as THREE from 'three'
import { useCSSVariable, type Runnable } from '../Constants';

function Button({ onClick, isUp }: { onClick: Runnable, isUp?: boolean }) {
    const r = 5;

    const h = 4, l = 4, w = 1.5
    const shape = new THREE.Shape()
    shape.lineTo(l, h)
    shape.lineTo(2 * l, 0)
    shape.lineTo(2 * l, -w)
    shape.lineTo(l, h - w)
    shape.lineTo(0, -w)
    shape.lineTo(0, 0)

    const [hover, setHover] = useState(false)
    useEffect(() => {document.body.style.cursor = hover ? 'pointer' : 'auto'}, [hover])

    return (
        <group 
        rotation={[0,0,isUp?0:Math.PI]} 
        scale={hover?.31:.3} 
        position={[2, 10 * (isUp?1:-1), 0]} 
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        >
            <group scale={[1, .85, 1]} onClick={onClick} >
                <mesh rotation={[Math.PI/2, 0, 0]} >
                    <cylinderGeometry args={[r,r, 2]} />
                    <meshToonMaterial color={useCSSVariable('--color-sea')} transparent opacity={.75} />
                </mesh>
                <mesh position={[-l, -r/5, 0]} >
                    <meshToonMaterial color='black' />
                    <extrudeGeometry args={[shape, {depth: 1}]} />
                </mesh>
                <mesh rotation={[Math.PI/2,0,0]} position={[0,0,0]} visible={hover} >
                    <cylinderGeometry args={[r,r,2]} />
                    <meshToonMaterial color={'gray'} />
                </mesh>
            </group>
        </group>
    )
}

export function Buttons({onUp, onDown}: { onUp: Runnable, onDown: Runnable} ) {
    return (
        <group>
            <Button onClick={onUp} isUp />
            <Button onClick={onDown} />
        </group>
    )
}