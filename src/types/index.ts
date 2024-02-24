import { __Schema } from "./schema";

export * from "./schema";
export * from "./type-kinds";

/* Graphql Response */
interface GraphqlErrorLocation {
  line: number;
  column: number;
}

export interface GraphqlError {
  message: string;
  locations?: GraphqlErrorLocation[];
  path?: (string | number)[];
  extensions?: Record<string, any>;
}

export interface GraphqlResponse<T> {
  data?: T | null;
  errors?: GraphqlError[] | null;
}

export type IntrospectionResponse = GraphqlResponse<{ __schema: __Schema }>;

/* CLI */
export type OptionFlags = {
  schema: string;
  output: string;
  types?: boolean;
};
