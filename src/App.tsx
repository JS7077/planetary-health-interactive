import { Canvas } from '@react-three/fiber'
import './App.css'
import { OzoneScene } from './ozone/Ozone.tsx'
import { Sidebar } from './Sidebar.tsx'
import { useSearchParams } from 'react-router-dom'
import { Page, pageQuery } from './Constants.ts'

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  switch(searchParams.get(pageQuery) as Page) {
    case Page.INTRO: 
  }

  return (
    <div id='main'>
      <Sidebar />

      <Canvas orthographic camera={{ zoom: 30, position: [0, 0, 100], fov: 50 }} >
        <ambientLight intensity={1.5} /> 
        <directionalLight position={[10, 10, 5]} intensity={2} />

        <OzoneScene />
      </Canvas>
    </div>
  )
}

export default App
