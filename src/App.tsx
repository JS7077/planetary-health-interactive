import { Canvas } from '@react-three/fiber'
import './App.css'
import { OzoneScene } from './ozone/Ozone.tsx'
import { Manager } from './ui/Sidebar.tsx'
import { useSearchParams } from 'react-router-dom'
import { type Page, Pages, PAGE_QUERY, INFO_QUERY } from './Constants.ts'
import { ClimateChangeScene } from './climate-change/ClimateChange.tsx'
import { useMemo, useState, type Dispatch } from 'react'
import { Buttons } from './ui/Nav.tsx'
import { IntroScene } from './intro/Intro.tsx'
import { Dialogue } from './ui/Narrate.tsx'
import { INFO } from './info.ts'

export interface SceneProps {actions: { setOnLeft: Dispatch<Page>, setOnRight: Dispatch<Page> }}
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

  // const [infoIndex, setInfoIndex] = useState(0)

  const [searchParams, setSearchParams] = useSearchParams()
  let page = searchParams.get(PAGE_QUERY) as Page; if(!page) page = Pages.INTRO
  let infoIndex: number; const index = searchParams.get(INFO_QUERY); if(!index) infoIndex = 0; else infoIndex = parseInt(index)
  const info = INFO.get(page)!

  let scene;
  switch(page) {
    case Pages.INTRO: scene = <IntroScene actions={actions} />; break
    case Pages.CLIMATE: scene = <ClimateChangeScene actions={actions}/>; break
    case Pages.OZONE: scene = <OzoneScene actions={actions} infoIndex={infoIndex} />; break
    default: scene = <IntroScene actions={actions} />
  }

  function button(isLeft: boolean) {
    const index = infoIndex + (isLeft?-1:+1)
    console.log(['info',info],['old index',infoIndex],['new index', index])
    if(index >= info.length) {
      setSearchParams([[PAGE_QUERY,onRight],[INFO_QUERY,'0']])
    } else if(index < 0) {
      setSearchParams([[PAGE_QUERY, onLeft],[INFO_QUERY,(INFO.get(onLeft as Page)!.length - 1)+'']])
    } else {
      setSearchParams(prev => {prev.set(INFO_QUERY, index+''); return prev})
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
