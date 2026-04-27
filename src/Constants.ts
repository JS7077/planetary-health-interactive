export const Page = {
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
export type Page = typeof Page[keyof typeof Page]

export const pageQuery = 'page';