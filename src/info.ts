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
    "Ozone (O3) in the stratosphere filters out ultraviolet radiation that is harmful to biological systems.",
    "Certain chemicals that we release into the atmosphere, such as chlorofluorocarbons (CFCs), cause ozone molecules to break apart, depleting the ozone layer."
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