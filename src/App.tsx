import { Canvas } from '@react-three/fiber'
import './App.css'
import { Earth } from './Earth.tsx'

function Box() {
  return (
  <mesh>
    <boxGeometry args={[1,2,3]}/>
    <meshBasicMaterial color={'green'}/>
  </mesh>
)
}




function App() {

  return (
    <div id='canvasDiv'>
      <Canvas camera={{ position: [-20, 0, -20], fov: 50 }}>
        <Box />
        <Earth position={[1, -1, 1]}/>
      </Canvas>
    </div>
  )
}

export default App
