import { Canvas } from '@react-three/fiber'
import './App.css'
import { OzoneScene } from './ozone/Ozone.tsx'
import { Manager } from './ui/Sidebar.tsx'
import { useSearchParams } from 'react-router-dom'
import { type Page, Pages, PAGE_QUERY } from './Constants.ts'
import { ClimateChangeScene } from './climate-change/ClimateChange.tsx'
import { useMemo, useState, type Dispatch } from 'react'
import { Buttons } from './ui/Nav.tsx'
import { IntroScene } from './intro/Intro.tsx'

export interface SceneProps {foos: { setOnUp: Dispatch<Page>, setOnDown: Dispatch<Page> }}
export interface SceneInfo {
    id: number
    content: string[]
}

const sceneInfos = [
  
]

function App() {
  const [onLeft, setOnUp] = useState('')
  const [onRight, setOnDown] = useState('')
  const actions = useMemo(() => ({
    setOnUp, setOnDown
  }), [])

  const [infoIndex, setInfoIndex] = useState(0)

  const [searchParams, setSearchParams] = useSearchParams()
  let scene;
  switch(searchParams.get(PAGE_QUERY) as Page) {
    case Pages.INTRO: scene = <IntroScene foos={actions} />; break
    case Pages.CLIMATE: scene = <ClimateChangeScene foos={actions}/>; break
    case Pages.OZONE: scene = <OzoneScene foos={actions} />; break
    default: scene = <IntroScene foos={actions} />
  }

  return (
    <div id='main' className={searchParams.get(PAGE_QUERY)===Pages.OZONE?'space':''} >
      <Canvas orthographic camera={{ zoom: 30, position: [0, 0, 100], fov: 50 }} >
        <ambientLight intensity={1.5} /> 
        <directionalLight position={[10, 10, 5]} intensity={2} />

        <Manager setSearchParams={setSearchParams} />
        <Buttons onLeft={()=>setSearchParams([[PAGE_QUERY,onLeft]])} onRight={()=>setSearchParams([[PAGE_QUERY,onRight]])} />

        {scene}
      </Canvas>
    </div>
  )
}

export default App
