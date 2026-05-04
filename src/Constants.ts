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