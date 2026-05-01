import { useMemo, useRef, type JSX } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from '@react-three/drei';

// Simple GLSL Noise for the squiggle
const noiseGLSL = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ; m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
`;

export function RadiationSquiggle(props: JSX.IntrinsicElements['mesh']) {
  const meshRef = useRef(null)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#ff5500') }
  }), [])
  const uniformsRef = useRef(uniforms)

  useFrame((state) => {
    uniformsRef.current.uTime.value = state.clock.elapsedTime
  })

  return (
    <Float speed={100} rotationIntensity={0} floatingRange={[.23,.22]} >
      <mesh ref={meshRef} {...props} >
          {/* High segment count is vital for smooth squiggles */}
          <planeGeometry args={[0.05, 4, 1, 128]} />
          <shaderMaterial
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          uniforms={uniforms}
          vertexShader={`
              varying vec2 vUv;
              uniform float uTime;
              ${noiseGLSL}
              void main() {
              vUv = uv;
              vec3 pos = position;
              // Distortion math: Frequency * position + Time
              float noise = snoise(vec2(pos.y * 2.0, uTime * 0.5));
              pos.x += noise * 0.2 * (uv.y); // Squiggle more at the tip
              pos.z += sin(pos.y * 5.0 + uTime * 2.0) * 0.1;
              
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
              }
          `}
          fragmentShader={`
              varying vec2 vUv;
              uniform vec3 uColor;
              void main() {
              // Fade out at edges and ends
              float strength = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
              strength *= smoothstep(0.0, 0.5, vUv.x) * smoothstep(1.0, 0.5, vUv.x);
              gl_FragColor = vec4(uColor, strength * 0.8);
              }
          `}
          />
      </mesh>
    </Float>
  )
}