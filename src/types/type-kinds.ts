import {
  __EnumValue,
  __Field,
  __InputValue,
  __Type,
  __TypeKind,
} from "./schema";

export interface Kinds {
  [__TypeKind.SCALAR]: Scalar;
  [__TypeKind.OBJECT]: Object;
  [__TypeKind.UNION]: Union;
  [__TypeKind.INTERFACE]: Interface;
  [__TypeKind.ENUM]: Enum;
  [__TypeKind.INPUT_OBJECT]: InputObject;
  [__TypeKind.LIST]: List;
  [__TypeKind.NON_NULL]: NonNull;
}

export interface Scalar {
  kind: __TypeKind.SCALAR;
  name: string;
  description: string | null;
  fields: null;
  interfaces: null;
  possibleTypes: null;
  enumValues: null;
  inputFields: null;
  ofType: null;
  specifiedByURL: string | null;
}

export interface Object {
  kind: __TypeKind.OBJECT;
  name: string;
  description: string | null;
  fields: __Field[] | null;
  interfaces: __Type[];
  possibleTypes: null;
  enumValues: null;
  inputFields: null;
  ofType: null;
  specifiedByURL: null;
}

export interface Union {
  kind: __TypeKind.UNION;
  name: string;
  description: string | null;
  fields: null;
  interfaces: null;
  possibleTypes: __Type[] | null;
  enumValues: null;
  inputFields: null;
  ofType: null;
  specifiedByURL: null;
}

export interface Interface {
  kind: __TypeKind.INTERFACE;
  name: string;
  description: string | null;
  fields: __Field[];
  interfaces: __Type[];
  possibleTypes: __Type[];
  enumValues: null;
  inputFields: null;
  ofType: null;
  specifiedByURL: null;
}

export interface Enum {
  kind: __TypeKind.ENUM;
  name: string;
  description: string | null;
  fields: null;
  interfaces: null;
  possibleTypes: null;
  enumValues: [__EnumValue, ...__EnumValue[]] | null;
  inputFields: null;
  ofType: null;
  specifiedByURL: null;
}

export interface InputObject {
  kind: __TypeKind.INPUT_OBJECT;
  name: string;
  description: string | null;
  fields: null;
  interfaces: null;
  possibleTypes: null;
  enumValues: null;
  inputFields: __InputValue[] | null;
  ofType: null;
  specifiedByURL: null;
}

export interface List {
  kind: __TypeKind.LIST;
  name: null;
  description: null;
  fields: null;
  interfaces: null;
  possibleTypes: null;
  enumValues: null;
  inputFields: null;
  ofType: __Type;
  specifiedByURL: null;
}

export interface NonNull {
  kind: __TypeKind.NON_NULL;
  name: null;
  description: null;
  fields: null;
  interfaces: null;
  possibleTypes: null;
  enumValues: null;
  inputFields: null;
  ofType: __Type;
  specifiedByURL: null;
}
