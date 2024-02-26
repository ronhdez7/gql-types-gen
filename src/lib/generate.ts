import { CustomConfig } from "../types";
import {
  __EnumValue,
  __Field,
  __InputValue,
  __Schema,
  __Type,
  __TypeKind,
} from "../types/schema";
import { Scalar, Union } from "../types/type-kinds";
import { requiredObject, requiredType } from "./utils";

export function generate(
  schema: __Schema,
  customScalars: CustomConfig = {}
): GenerationOutput {
  return new Generator(schema, customScalars).generate();
}

type GenerationOutput = {
  types: string;
  objects: string;
};

class Generator {
  private types = "";
  private objects = "";
  private readonly BUILTIN_TYPES = [
    "__Schema",
    "__Type",
    "__TypeKind",
    "__Field",
    "__InputValue",
    "__EnumValue",
    "__Directive",
    "__DirectiveLocation",
  ];
  private readonly BUILTIN_SCALARS = {
    String: "string",
    Int: "number",
    ID: "string",
    Boolean: "string",
    Float: "number",
  } as Record<string, string>;

  constructor(
    private readonly schema: __Schema,
    private readonly customScalars: CustomConfig = {}
  ) {}

  generate(): GenerationOutput {
    this.types += "export type Schema = {\n";
    this.objects += "export const schema = {\n";

    for (const type of this.schema.types) {
      const output = this.handleType(type, true);
      if (!output) continue;

      // types
      this.types += `${type.name}: ${output.types};\n\n`;

      // js
      this.objects += `${type.name}: ${output.objects},`;
    }

    this.types += "}";
    this.objects += "} as const";

    return { types: this.types, objects: this.objects };
  }

  handleType(type: __Type, define = false): GenerationOutput | null {
    if (type.name && this.BUILTIN_TYPES.includes(type.name)) return null;

    let types: string;
    let objects: string;

    const typeName = `Schema["${type.name}"]`;

    switch (type.kind) {
      case __TypeKind.SCALAR:
        if (define) {
          types = this.handleScalar(type);
          objects = `""`;
        } else {
          types = `${typeName} | null`;
          objects = `"${type.name}"`;
        }
        break;

      case __TypeKind.OBJECT:
        if (define && type.fields) {
          const output = this.handleFields(type.fields);
          types = `{\n${output.types}}`;
          objects = `{\n${output.objects}}`;
        } else {
          types = `${typeName} | null`;
          objects = `"${type.name}"`;
        }
        break;

      case __TypeKind.NON_NULL:
        {
          const output = this.handleType(type.ofType);
          types = output ? requiredType(output.types) : "any";
          objects = output ? requiredObject(output.objects) : `""`;
        }
        break;

      case __TypeKind.LIST:
        {
          const output = this.handleType(type.ofType);
          types = `(${output?.types ?? "any"})[] | null`;
          objects = `[${output?.objects ?? ""}]`;
        }
        break;

      case __TypeKind.INPUT_OBJECT:
        if (define && type.inputFields) {
          const output = this.handleFields(type.inputFields);
          types = `{\n${output.types}}`;
          objects = `{\n${output.objects}}`;
        } else {
          types = `${typeName} | null`;
          objects = `"${type.name}"`;
        }
        break;

      case __TypeKind.ENUM:
        if (define && type.enumValues) {
          const output = this.handleEnums(type.enumValues);
          types = `{\n${output.types}}`;
          objects = `{\n${output.objects}}`;
        } else {
          types = `${typeName} | null`;
          objects = `"${type.name}"`;
        }
        break;

      case __TypeKind.UNION:
        if (define && type.possibleTypes) {
          const output = this.handleUnion(type);
          types = output.types;
          objects = output.objects;
        } else {
          types = typeName;
          objects = `"${type.name}"`;
        }
        break;

      default:
        types = "any";
        objects = `""`;
        break;
    }

    return { types, objects };
  }

  handleScalar(type: Scalar) {
    return (
      this.customScalars[type.name] ?? this.BUILTIN_SCALARS[type.name] ?? "any"
    );
  }

  handleFields(fields: (__Field | __InputValue)[]): GenerationOutput {
    let types = "";
    let objects = "";

    for (const field of fields) {
      types += `${field.name}: `;
      objects += `${field.name}: `;
      const output = this.handleType(field.type);

      if ("args" in field && field.args && field.args.length > 0) {
        types += `[{\n`;
        objects += `[{\n`;
        for (const arg of field.args) {
          const argOutput = this.handleType(arg.type);
          types += `${arg.name}: ${argOutput?.types ?? "any"},\n`;
          objects += `${arg.name}: ${argOutput?.objects ?? ""},\n`;
        }
        types += `},\n${output?.types ?? "any"}\n],\n`;
        objects += `},\n${output?.objects ?? ""}\n],\n`;
      } else {
        types += `${output?.types ?? "any"},\n`;
        objects += `${output?.objects ?? ""},\n`;
      }
    }

    return { types, objects };
  }

  handleEnums(enums: __EnumValue[]): GenerationOutput {
    let types = "";
    let objects = "";

    for (const e of enums) {
      types += `${e.name}: "${e.name}",\n`;
      objects += `${e.name}: "ENUM",\n`;
    }

    return { types, objects };
  }

  handleUnion(type: Union): GenerationOutput {
    let types = "";
    let objects = "[";

    if (!type.possibleTypes || type.possibleTypes.length === 0) {
      return { types, objects: objects + "]" };
    }

    for (let i = 0; i < type.possibleTypes.length; i++) {
      const output = this.handleType(type.possibleTypes[i]!);
      if (!output) continue;

      types += requiredType(output.types);
      objects += requiredObject(output.objects);

      const isLast = i === type.possibleTypes.length - 1;
      types += isLast ? "" : " | ";
      objects += isLast ? "]" : ", ";
    }

    if (types === "") types = "any";
    if (!objects.endsWith("]")) objects += "]";

    return { types, objects };
  }
}
