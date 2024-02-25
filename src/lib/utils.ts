import * as path from "path";
import * as fs from "fs";
import { Command } from "commander";
import { HeadersConfig } from "../types";

export const program = new Command();

export function requiredType(value: string): string {
  if (value.endsWith("| null")) {
    return value.slice(0, -6).trim();
  }

  return value;
}

export function requiredObject(value: string): string {
  return value.slice(0, -1) + "!" + value.slice(-1);
}

export function writeToFile(outputPath: string, content: string) {
  const dirname = path.dirname(outputPath);

  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
  fs.writeFileSync(outputPath, content);
}

export function parseHeaders(headers: string[]): HeadersConfig {
  const parsedHeaders: HeadersConfig = {};
  for (const header of headers) {
    const [name, value] = header.split(":");
    if (name === undefined || value === undefined) continue;
    parsedHeaders[name.trim()] = value.trim();
  }

  return parsedHeaders;
}

export const GET_SCHEMA_QUERY = `fragment FullType on __Type {
  kind
  name
  fields(includeDeprecated: true) {
    name
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}
fragment InputValue on __InputValue {
  name
  type {
    ...TypeRef
  }
  defaultValue
}
fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
query IntrospectionQuery {
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    types {
      ...FullType
    }
    directives {
      name
      locations
      args {
        ...InputValue
      }
    }
  }
}`
  .split("\n")
  .join(" ");
