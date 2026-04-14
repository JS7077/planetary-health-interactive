import { Canvas } from '@react-three/fiber'
import './App.css'



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
    <Canvas>
      <perspectiveCamera args={[90, 90, 90]}/>
      <Box />
    </Canvas>
  )
}

export default App
