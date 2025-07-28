// Release mapping constants
// Maps catalog numbers (cat_no) to Internet Archive identifiers

export const RELEASE_MAP: Record<string, string> = {
  AH001: "AH001_peter_james_-_holding_on_-_letting_go",
  AH002: "AH002_orange_crush_-_the_fields",
  AH003: "AH003_corwin_trails_-_corwin_trails",
  AH004: "AH004_the_dandelion_council_-_the_mysteries_of_bioluminescence",
  AH005: "AH005_hills_west_-_glare",
  AH006: "AH006_sora_shima_-_distancing_ep",
  AH007: "AH007_renu_-_hello_how_are_you",
  AH008: "AH008_loafeye_-_drinking_rosewater",
  AH009: "AH009_celer_-_ariill",
  AH010: "AH010_track53_-_track53",
  AH011: "AH011_GABRIEL_-_Good_Old_Days",
  AH012: "AH012_milieu_-_wasted_magic_in_the_sound",
  AH013: "AH013_sarin_sunday_-_the_lonely_hike",
  AH014: "AH014_statedlife_-_future_dream",
  AH015: "AH015_Trills_-_Citrus_Drop",
  AH016: "AH016_sinkfield_-_sun_burned_memories",
  AH017: "AH017_Lithium_Enchantment_-_Lithium_Enchantment",
  AH018: "AH018_Ophibre_-_REFERENCE",
  AH019: "AH019_Saturday_Index_-_Partly_Cloudy_EP",
  AH020: "AH020_Celer_-_Red_Seals",
  AH021: "AH021_Frequent_C_-_Broken_Sun_EP",
  AH022: "AH022_Electricwest_-_Divine_De_Vice",
  AH023: "AH023_Heroines_of_the_USSR_-_Spring_Snow",
  AH024: "AH024_Experience_Hold_-_March_Forth",
  AH025: "AH025_David_Tagg_-_Skin_Diagram",
  AH026: "AH026_jeph_jerman_tanner_menard_-_the_now_of_sound",
  AH027: "AH027_Trills_-_Fetal_Discoveries",
  AH028: "AH028_The_Dandelion_Council_-_Songs_For_Little_Night_Explorers",
  AHS001: "Various_-_Gathering_the_Rise_An_Archaic_Horizon_Exclusive_Mix",
  AH029: "AH029_Counterspark_-_Existence_EP",
  AH030: "AH030_Eluder_-_Drift",
  AH031: "AH031_Orange_Crush_-_Autumn_Reflections",
  AH032: "AH032_Melorman_-_Expressing_Thoughts",
  AH033: "AH033_Electricwest_-_MOTH3R_R3MIXES",
  AH034: "AH034_Gabriel_-_The_Gabriel_Sequence",
  AHS002: "Opake_-_Frescoed_Clouds",
  AH035: "AH035_2Percent_-_Nowcast",
  AH036: "AH036_Aeron_-_Aeron_EP",
  AH037: "AH037_Ten_and_Tracer_-_Youll_Be_A_Hero_Soon_Speaker",
  AH038: "AH038_naono_-_Sleepy_Pebbles",
  AH039: "AH039_Of_A_Star_-_Finding_Gaia",
  AH040: "Seven-Shine",
  AH041: "LogicMoon-PolygonGardenEp",
  AH042: "MentalHealthConsumerSamePlacesDifferentTimes",
  AH043: "KilledByAWord-KidsWithNoLifeManuals",
  AH044: "TheCherryBluesProjectAntarctica",
  AH045: "HeroinesOfTheU.s.s.r-AMapOfLostCauses",
  AH046: "NikSnakeF-NikSnakeF",
  AH047: "Galaktlan-SecondMemory",
  AH048: "Pixelgypsy-PerpetualMotion",
  AH049: "Plancky-CardiacCram",
  AH050: "GeminiTri-Mirror",
  AH051: "MichaelBijker-WaysToTravel",
  AH052: "CorwinTrails-93EP",
  AH053: "DomingoBlanco-HaMetafisicaBastanteNaRealidade",
  AH054: "DandelionCouncil-DreamHomes",
  AH056: "MentalHealthConsumer-EarlySpringMidnightWalksWithUs",
};

// Reverse mapping (identifier to cat_no) for convenience
export const REVERSE_RELEASE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(RELEASE_MAP).map(([catNo, identifier]) => [identifier, catNo])
);

// Utility functions for working with release mappings
export function getIdentifierByCatNo(catNo: string): string | undefined {
  return RELEASE_MAP[catNo];
}

export function getCatNoByIdentifier(identifier: string): string | undefined {
  return REVERSE_RELEASE_MAP[identifier];
}

export function isValidCatNo(catNo: string): boolean {
  return catNo in RELEASE_MAP;
}

export function isValidIdentifier(identifier: string): boolean {
  return identifier in REVERSE_RELEASE_MAP;
}

// Get all catalog numbers
export function getAllCatNos(): string[] {
  return Object.keys(RELEASE_MAP);
}

// Get all identifiers
export function getAllIdentifiers(): string[] {
  return Object.values(RELEASE_MAP);
}
