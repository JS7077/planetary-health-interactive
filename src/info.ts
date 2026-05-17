import { Pages, type Page } from "./Constants"

const INTRO_INFO = [
    ''
]

const CLIMATE_INFO = [
    ''
]

const BIOSPHERE_INFO = [
    ''
]

const BIOGEO_FLOWS_INFO = [
    ''
]

const LAND_INFO = [
    ''
]

const WATER_INFO = [
    ''
]

const NOVEL_ENTS_INFO = [
    ''
]

const OZONE_INFO = [
    "Ozone is a molecule made of three oxygen atoms primarily located in the stratosphere that acts as a shield to prevent large portions of harmful ultraviolet (UV) rays from reaching the surface.",
    'Industrialization caused us to start releasing many more chemicals into the atmosphere, including chlorofluorocarbons and others that break ozone molecules apart.',

]

const OCEAN_ACID_INFO = [
    ''
]

const AEROSOLS_INFO = [
    ''
]

export const INFO = new Map<Page, string[]>([
    [Pages.INTRO, INTRO_INFO],
    [Pages.CLIMATE, CLIMATE_INFO],
    [Pages.BIOSPHERE, BIOSPHERE_INFO],
    [Pages.BIOGEO_FLOWS, BIOGEO_FLOWS_INFO],
    [Pages.LAND, LAND_INFO],
    [Pages.WATER, WATER_INFO],
    [Pages.NOVEL_ENTS, NOVEL_ENTS_INFO],
    [Pages.OZONE, OZONE_INFO],
    [Pages.OCEAN_ACID, OCEAN_ACID_INFO],
    [Pages.AEROSOLS, AEROSOLS_INFO]
])