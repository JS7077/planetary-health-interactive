import { useEffect, useState } from "react";

export const Pages = {
    INTRO: 'Introduction',
    CLIMATE: 'Climate Change',
    BIOSPHERE: 'Biosphere Integrity',
    BIOGEO_FLOWS: 'Biogeochemical Flows',
    LAND: 'Land Use',
    WATER: 'Freshwater Use',
    NOVEL_ENTS: 'Novel Entities',
    OZONE: 'Ozone',
    OCEAN_ACID: 'Ocean Acidification',
    AEROSOLS: 'Aerosols'

} as const 
export type Page = typeof Pages[keyof typeof Pages]

export const PAGE_QUERY: string = 'page';

export type ThreeD = [x: number, y: number, z: number]

export function useCSSVariable(variableName: string): string {
  // 1. Initialize state with the actual value immediately
  const [color, setColor] = useState(() => {
    if (typeof window !== 'undefined') {
      const style = getComputedStyle(document.documentElement)
      return style.getPropertyValue(variableName).trim() || '#ffffff'
    }
    return '#ffffff'
  })

  useEffect(() => {
    const handleUpdate = () => {
      const style = getComputedStyle(document.documentElement)
      const value = style.getPropertyValue(variableName).trim()
      if (value && value !== color) {
        setColor(value)
      }
    }

    // Optional: If you change themes by adding a class to body, 
    // you could listen for that change here with a MutationObserver.
    handleUpdate()
  }, [variableName, color])

  return color
}
