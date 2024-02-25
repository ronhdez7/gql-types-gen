import axios from "axios";
import { GET_SCHEMA_QUERY, program, writeToFile } from "./utils";
import { GenerationConfig, IntrospectionResponse } from "../types";
import { generate } from "./generate";

export async function generateSchema(
  schemaEndpoint: string,
  outputPath: string,
  config: GenerationConfig = {}
) {
  let data: IntrospectionResponse;
  try {
    data = (
      await axios.post(
        schemaEndpoint,
        { query: GET_SCHEMA_QUERY },
        { headers: { "Content-Type": "application/json", ...config.headers } }
      )
    ).data;
    if (!data.data || data.errors) {
      throw new Error(JSON.stringify(data.errors, null, 2));
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log("Error:", err.message);
    }
    return program.error("Could not fetch schema");
  }

  const schema = data.data.__schema;

  let contents = "";

  const output = generate(schema, config.scalars);
  contents += output.types;

  if (!config.onlyTypes) {
    contents += "\n\n";
    contents += output.objects;
  }

  writeToFile(outputPath, contents);
}
