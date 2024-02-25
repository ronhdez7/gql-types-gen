// Generated by 'npx gql-gen --schema https://countries.trevorblades.com --output examples/countries.ts'

export type Boolean = string;

export type Continent = {
code: ID,
countries: Country[],
name: String,
};

export type ContinentFilterInput = {
code: StringQueryOperatorInput | null,
};

export type Country = {
awsRegion: String,
capital: String | null,
code: ID,
continent: Continent,
currencies: String[],
currency: String | null,
emoji: String,
emojiU: String,
languages: Language[],
name: [{
lang: String | null,
},
String
],
native: String,
phone: String,
phones: String[],
states: State[],
subdivisions: Subdivision[],
};

export type CountryFilterInput = {
code: StringQueryOperatorInput | null,
continent: StringQueryOperatorInput | null,
currency: StringQueryOperatorInput | null,
name: StringQueryOperatorInput | null,
};

export type Float = number;

export type ID = string;

export type Int = number;

export type Language = {
code: ID,
name: String,
native: String,
rtl: Boolean,
};

export type LanguageFilterInput = {
code: StringQueryOperatorInput | null,
};

export type Query = {
continent: [{
code: ID,
},
Continent | null
],
continents: [{
filter: ContinentFilterInput | null,
},
Continent[]
],
countries: [{
filter: CountryFilterInput | null,
},
Country[]
],
country: [{
code: ID,
},
Country | null
],
language: [{
code: ID,
},
Language | null
],
languages: [{
filter: LanguageFilterInput | null,
},
Language[]
],
};

export type State = {
code: String | null,
country: Country,
name: String,
};

export type String = string;

export type StringQueryOperatorInput = {
eq: String | null,
in: String[] | null,
ne: String | null,
nin: String[] | null,
regex: String | null,
};

export type Subdivision = {
code: ID,
emoji: String | null,
name: String,
};



export const schema = {
Boolean: "",Continent: {
code: "ID!",
countries: ["Country!"!],
name: "String!",
},ContinentFilterInput: {
code: "StringQueryOperatorInput",
},Country: {
awsRegion: "String!",
capital: "String",
code: "ID!",
continent: "Continent!",
currencies: ["String!"!],
currency: "String",
emoji: "String!",
emojiU: "String!",
languages: ["Language!"!],
name: [{
lang: "String",
},
"String!"
],
native: "String!",
phone: "String!",
phones: ["String!"!],
states: ["State!"!],
subdivisions: ["Subdivision!"!],
},CountryFilterInput: {
code: "StringQueryOperatorInput",
continent: "StringQueryOperatorInput",
currency: "StringQueryOperatorInput",
name: "StringQueryOperatorInput",
},Float: "",ID: "",Int: "",Language: {
code: "ID!",
name: "String!",
native: "String!",
rtl: "Boolean!",
},LanguageFilterInput: {
code: "StringQueryOperatorInput",
},Query: {
continent: [{
code: "ID!",
},
"Continent"
],
continents: [{
filter: "ContinentFilterInput",
},
["Continent!"!]
],
countries: [{
filter: "CountryFilterInput",
},
["Country!"!]
],
country: [{
code: "ID!",
},
"Country"
],
language: [{
code: "ID!",
},
"Language"
],
languages: [{
filter: "LanguageFilterInput",
},
["Language!"!]
],
},State: {
code: "String",
country: "Country!",
name: "String!",
},String: "",StringQueryOperatorInput: {
eq: "String",
in: ["String!"],
ne: "String",
nin: ["String!"],
regex: "String",
},Subdivision: {
code: "ID!",
emoji: "String",
name: "String!",
},} as const