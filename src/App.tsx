import { Canvas } from '@react-three/fiber'
import './App.css'
import { Earth } from './Earth.tsx'

function App() {

  return (
    <div id='canvasDiv'>
      <Canvas camera={{ position: [0, 0, -30], fov: 50 }}>
        <ambientLight intensity={1.5} /> 
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <Earth position={[10, -11, 1]} scale={1.2} />
      </Canvas>
    </div>
  )
}

export default App
