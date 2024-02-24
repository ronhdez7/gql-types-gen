import axios from "axios";
import { GET_SCHEMA_QUERY, program, writeToFile } from "./utils";
import { IntrospectionResponse } from "../types";
import { generate } from "./generate";

export async function generateSchema(
  schemaEndpoint: string,
  outputPath: string
) {
  let data: IntrospectionResponse;
  try {
    data = (
      await axios.post(
        schemaEndpoint,
        { query: GET_SCHEMA_QUERY },
        { headers: { "Content-Type": "application/json" } }
      )
    ).data;
    if (!data.data || data.errors) {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    return program.error("Could not fetch schema");
  }

  const schema = data.data.__schema;

  let contents = "";

  // include imports
  contents += `import { __Schema, __Directive, __DirectiveLocation, __EnumValue, __Field, __InputValue, __Type, __TypeKind } from "gql-types-gen";\n\n`;

  const output = generate(schema);
  contents += output.types;
  contents += "\n\n";
  contents += output.objects;

  writeToFile(outputPath, contents);
}
