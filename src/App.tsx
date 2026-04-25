import { Canvas } from '@react-three/fiber'
import './App.css'
import { Earth } from './Earth.tsx'
import { Sun } from './ozone/Sun.tsx'
import { RadiationSquiggle } from './ozone/Ray.tsx'

function App() {

  return (
    <div id='canvasDiv'>
      <Canvas orthographic camera={{ zoom: 30, position: [0, 0, 100], fov: 50 }}>
        <ambientLight intensity={1.5} /> 
        <directionalLight position={[10, 10, 5]} intensity={2} />

        <Earth worldRot={[Math.PI * -0.5, 0, 0]} position={[-10, -11, 1]} scale={1.1} />

        <Sun position={[27, 0, 0]}/>
        <RadiationSquiggle position={[4, 0, 0]} rotation={[0, 0, Math.PI / 2]}/>
      </Canvas>
    </div>
  )
}

export default App
