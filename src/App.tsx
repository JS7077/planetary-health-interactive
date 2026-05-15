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
import { Dialogue } from './ui/Narrate.tsx'
import { INFO } from './info.ts'

export interface SceneProps {foos: { setOnLeft: Dispatch<Page>, setOnRight: Dispatch<Page> }}
export interface SceneInfo {
    id: number
    content: string[]
}

function App() {
  const [onLeft, setOnLeft] = useState('')
  const [onRight, setOnRight] = useState('')
  const actions = useMemo(() => ({
    setOnLeft, setOnRight
  }), [])

  const [infoIndex, setInfoIndex] = useState(0)

  const [searchParams, setSearchParams] = useSearchParams()
  let page = searchParams.get(PAGE_QUERY) as Page
  if(!page) page = Pages.INTRO
  const info = INFO.get(page)!

  let scene;
  switch(page) {
    case Pages.INTRO: scene = <IntroScene foos={actions} />; break
    case Pages.CLIMATE: scene = <ClimateChangeScene foos={actions}/>; break
    case Pages.OZONE: scene = <OzoneScene foos={actions} />; break
    default: scene = <IntroScene foos={actions} />
  }

  function button(isLeft: boolean) {
    console.log('first', infoIndex)
    setInfoIndex(isLeft?infoIndex-1:infoIndex+1)
    console.log('second', infoIndex)
    if(infoIndex >= info.length) {
      setSearchParams([[PAGE_QUERY,onRight]])
      console.log('right', onRight)
      setInfoIndex(0);
    } else if(infoIndex < 0) {
      setSearchParams([[PAGE_QUERY, onLeft]])
      console.log('left', onLeft)
      setInfoIndex(INFO.get(onLeft as Page)!.length - 1)
    }
  }

  return (
    <div id='main' className={page===Pages.OZONE?'space':''} >
      <Canvas orthographic camera={{ zoom: 30, position: [0, 0, 100], fov: 50 }} >
        <ambientLight intensity={1.5} /> 
        <directionalLight position={[10, 10, 5]} intensity={2} />

        <Manager setSearchParams={setSearchParams} />
        <Buttons onLeft={()=>button(true)} onRight={()=>button(false)} />

        <Dialogue 
        scene={page} 
        words={info[infoIndex]} 
        />

        {scene}
      </Canvas>
    </div>
  )
}

export default App
