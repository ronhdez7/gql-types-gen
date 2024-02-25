# Graphql Types Generator

Generates types from a remote graphql schema.

Intended to be used with gql-typed-query-builder (not published yet). This is why it generates a schema object along with types. To use by itself to just generate types, use the '-t' option.

## Installation

Install package from npm:

```bash
npm install gql-types-gen --save-dev
```

```bash
yarn add -D gql-types-gen
```

```bash
pnpm add -D gql-types-gen
```

## Usage

The following is an example command using all options

```
npx gql-gen -s <schema-endpoint> -o <output-path> -t -h "Authorization: Bearer ..." -h "Accept: application/json" -s "Json: object" -s "Date: Date"
```

Generate programmatically

```js
import { generateSchema } from "gql-types-gen";

await generateSchema(schemaEndpoint, outputPath, {
  onlyTypes: true,
  headers: { Authorization: "Bearer ..." },
  scalars: { Json: "object" },
});
```

Get generated output

```js

// generate(schema, custom-scalars)
import { generate } from "gql-types-gen";

// output = { types: string, objects: string }
const { types, objects } = generate(
	{ types: [...], queryType: { name: "Query" }, ... },
	{ Json: "object" })
```

## Options

This tool can take the following options:

```
-s, --schema <endpoint>  Required: Takes url where schema is located
-o, --output <path>      Required: Takes path where types will be generated
-t, --types              Only generate types (default: false)
-h, --header <value>     Add headers (default: [])
-c, --scalar <value>     Define type for custom scalar (default: [])
```

## Examples

Generates output file with types and an object that represents the graphql schema. [View output](examples/countries.ts)

```
npx gql-gen --schema https://countries.trevorblades.com --output examples/countries.ts
```

Only generates types and defines custom scalars. [View output](examples/pokemon.ts)

```
npx gql-gen -s https://graphql-pokeapi.graphcdn.app/ -o ./examples/pokemon.ts -t -c "JSON: object" -c "JSONObject: { name: string, age: string }"
```
