import { Canvas } from '@react-three/fiber'
import './App.css'
import { OzoneScene } from './ozone/Ozone.tsx'
import { Sidebar } from './ui/Sidebar.tsx'
import { useSearchParams } from 'react-router-dom'
import { Page, PAGE_QUERY } from './Constants.ts'
import { ClimateChangeScene } from './climate-change/ClimateChange.tsx'
import { Button } from './ui/Nav.tsx'

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  let scene;
  switch(searchParams.get(PAGE_QUERY) as Page) {
    case Page.CLIMATE: scene = <ClimateChangeScene />; break
    case Page.OZONE: scene = <OzoneScene />; break
    default: scene = <group />
  }

  return (
    <div id='main'>
      <Sidebar setSearchParams={setSearchParams} />

      <Canvas orthographic camera={{ zoom: 30, position: [0, 0, 100], fov: 50 }} >
        <ambientLight intensity={1.5} /> 
        <directionalLight position={[10, 10, 5]} intensity={2} />

        <Button rotateX={Math.PI} position={[-10, 0, 0]} />
        <Button position={[10, 0, 0]} />

        {scene}
      </Canvas>
    </div>
  )
}

export default App
