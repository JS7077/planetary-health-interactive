import { useMemo, useRef, type JSX } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Forcefield = ({ radius = 1.6, shieldColor = '#000000', holeScale=10, holeThreshold=.3, ...props }: 
    JSX.IntrinsicElements['mesh'] & {radius?: number, shieldColor?: string, holeScale?: number, holeThreshold?: number}) => {
  const meshRef = useRef(null)
  
  const initUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(shieldColor) },
    uRadius: { value: radius },
    uHoleScale: { value: holeScale }, // Size of the holes
    uHoleThreshold: { value: holeThreshold } // How many holes (0.0 to 1.0)
  }), [radius, shieldColor, holeScale, holeThreshold])
  const uniforms = useRef(initUniforms)

  useFrame((state) => {
    uniforms.current.uTime.value = state.clock.elapsedTime
    uniforms.current.uColor.value.set(shieldColor)
  })

  return (
    <mesh ref={meshRef} {...props}>
      {/* Slightly larger than the sun/planet radius */}
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        uniforms={initUniforms}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColor;
          uniform float uHoleScale;
          uniform float uHoleThreshold;

          // Simple 3D Noise Function
          float hash(vec3 p) {
            p = fract(p * 0.3183099 + 0.1);
            p *= 17.0;
            return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
          }

          float noise(vec3 x) {
            vec3 i = floor(x);
            vec3 f = fract(x);
            f = f * f * (3.0 - 2.0 * f);
            return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                           mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                       mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                           mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
          }

          void main() {
            // 1. Create the "Holes" using noise
            float n = noise(vPosition * uHoleScale + uTime * 0.5);
            if (n < uHoleThreshold) discard; // This cuts the holes

            // 2. Fresnel Effect (Glowing edges)
            vec3 viewDirection = normalize(cameraPosition - vPosition);
            float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);

            // 3. Hexagonal / Grid flicker (optional extra detail)
            float flicker = sin(uTime * 2.0 + vPosition.y * 10.0) * 0.1 + 0.9;

            gl_FragColor = vec4(uColor, fresnel * flicker);
          }
        `}
      />
    </mesh>
  )
}