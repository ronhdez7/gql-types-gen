import { Kinds } from "./type-kinds";

export interface __Schema {
  description: string | null;
  types: __Type[];
  queryType: __Type;
  mutationType: __Type | null;
  subscriptionType: __Type | null;
  directives: __Directive[];
}
export interface __GenericType {
  kind: __TypeKind;
  name: string | null;
  description: string | null;
  fields: __Field[] | null;
  interfaces: __Type[] | null;
  possibleTypes: __Type[] | null;
  enumValues: __EnumValue[] | null;
  inputFields: __InputValue[] | null;
  ofType: __Type | null;
  specifiedByURL: string | null;
}

export type __Type<T extends __TypeKind = __TypeKind> = Kinds[T] & {
  kind: T;
};

export enum __TypeKind {
  SCALAR = "SCALAR",
  OBJECT = "OBJECT",
  INTERFACE = "INTERFACE",
  UNION = "UNION",
  ENUM = "ENUM",
  INPUT_OBJECT = "INPUT_OBJECT",
  LIST = "LIST",
  NON_NULL = "NON_NULL",
}
export interface __Field {
  name: string;
  description: string | null;
  args: __InputValue[];
  type: __Type;
  isDeprecated: boolean;
  deprecationReason: string | null;
}
export interface __InputValue {
  name: string;
  description: string | null;
  type: __Type;
  defaultValue: string | null;
  isDeprecated: boolean;
  deprecationReason: string | null;
}
export interface __EnumValue {
  name: string;
  description: string | null;
  isDeprecated: boolean;
  deprecationReason: string | null;
}
export interface __Directive {
  name: string;
  description: string | null;
  locations: __DirectiveLocation[];
  args: __InputValue[];
  isRepeatable: boolean;
}

export enum __DirectiveLocation {
  QUERY = "QUERY",
  MUTATION = "MUTATION",
  SUBSCRIPTION = "SUBSCRIPTION",
  FIELD = "FIELD",
  FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION",
  FRAGMENT_SPREAD = "FRAGMENT_SPREAD",
  INLINE_FRAGMENT = "INLINE_FRAGMENT",
  VARIABLE_DEFINITION = "VARIABLE_DEFINITION",
  SCHEMA = "SCHEMA",
  SCALAR = "SCALAR",
  OBJECT = "OBJECT",
  FIELD_DEFINITION = "FIELD_DEFINITION",
  ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION",
  INTERFACE = "INTERFACE",
  UNION = "UNION",
  ENUM = "ENUM",
  ENUM_VALUE = "ENUM_VALUE",
  INPUT_OBJECT = "INPUT_OBJECT",
  INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION",
}
