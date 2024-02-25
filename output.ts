export type JSON = object;

export type JSONObject = {name: string, age: string};

export type BaseResponse = {
message: String | null,
status: Boolean | null,
response: JSON | null,
params: JSON | null,
};

export type String = string;

export type Boolean = string;

export type BaseList = {
count: Int | null,
next: String | null,
previous: String | null,
results: BaseName | null[] | null,
status: Boolean | null,
message: String | null,
};

export type Int = number;

export type Ability = {
ability: BaseName | null,
is_hidden: Boolean | null,
slot: Int | null,
};

export type GameIndex = {
game_index: Int | null,
version: BaseName | null,
};

export type VersionDetail = {
rarity: Int | null,
version: BaseName | null,
};

export type HeldItem = {
item: BaseName | null,
version_details: VersionDetail | null[] | null,
};

export type VersionGroupDetail = {
level_learned_at: Int | null,
move_learn_method: BaseName | null,
version_group: BaseName | null,
};

export type Move = {
move: BaseName | null,
version_group_details: VersionGroupDetail | null[] | null,
};

export type Sprite = {
back_default: String | null,
back_female: String | null,
back_shiny: String | null,
back_shiny_female: String | null,
front_default: String | null,
front_female: String | null,
front_shiny: String | null,
front_shiny_female: String | null,
};

export type Stat = {
base_stat: Int | null,
effort: Int | null,
stat: BaseName | null,
};

export type Type = {
slot: Int | null,
type: BaseName | null,
};

export type BaseName = {
id: Int | null,
url: String | null,
name: String | null,
};

export type Pokemon = {
abilities: Ability | null[] | null,
base_experience: Int | null,
forms: BaseName | null[] | null,
game_indices: GameIndex | null[] | null,
height: Int | null,
held_items: HeldItem | null[] | null,
id: Int | null,
is_default: Boolean | null,
location_area_encounters: String | null,
moves: Move | null[] | null,
name: String | null,
order: Int | null,
species: BaseName | null,
sprites: Sprite | null,
stats: Stat | null[] | null,
types: Type | null[] | null,
weight: Int | null,
status: Boolean | null,
message: String | null,
};

export type PokemonItem = {
id: Int | null,
url: String | null,
name: String | null,
image: String | null,
artwork: String | null,
dreamworld: String | null,
};

export type PokemonList = {
count: Int | null,
next: String | null,
previous: String | null,
nextOffset: Int | null,
prevOffset: Int | null,
params: JSON | null,
results: PokemonItem | null[] | null,
status: Boolean | null,
message: String | null,
};

export type Query = {
abilities: BaseList | null,
ability: [{
ability: String,
},
BaseResponse | null
],
berries: BaseList | null,
berry: [{
berry: String,
},
BaseResponse | null
],
eggGroups: BaseList | null,
eggGroup: [{
eggGroup: String,
},
BaseResponse | null
],
encounterMethods: BaseList | null,
encounterMethod: [{
encounterMethod: String,
},
BaseResponse | null
],
evolutionChains: BaseList | null,
evolutionChain: [{
id: String,
},
BaseResponse | null
],
evolutionTriggers: BaseList | null,
evolutionTrigger: [{
name: String,
},
BaseResponse | null
],
genders: BaseList | null,
gender: [{
gender: String,
},
BaseResponse | null
],
growthRates: BaseList | null,
growthRate: [{
growthRate: String,
},
BaseResponse | null
],
locations: BaseList | null,
location: [{
location: String,
},
BaseResponse | null
],
moves: BaseList | null,
move: [{
move: String,
},
BaseResponse | null
],
natures: BaseList | null,
nature: [{
nature: String,
},
BaseResponse | null
],
pokemons: [{
limit: Int | null,
offset: Int | null,
},
PokemonList | null
],
pokemon: [{
name: String,
},
Pokemon | null
],
regions: BaseList | null,
region: [{
region: String,
},
BaseResponse | null
],
species: BaseList | null,
types: BaseList | null,
};

export enum CacheControlScope {
PUBLIC = "PUBLIC",
PRIVATE = "PRIVATE",
};

export type Upload = any;
