#!/usr/bin/env node

import { OptionFlags } from "./types";
import * as path from "path";
import { generateSchema } from "./lib";
import { parseCustomOptions, program } from "./lib/utils";

function defineProgram() {
  program
    .name("gql-builder-cli")
    .description("CLI tools that generates types from a graphql schema")
    .version("0.0.1");

  program.showHelpAfterError("(add --help for additional information)");

  program.requiredOption(
    "-s, --schema <endpoint>",
    "Takes url where schema is located"
  );

  program.requiredOption(
    "-o, --output <path>",
    "Takes path (relative or absolute) where types will be generated"
  );

  program.option("-t, --types", "Only generate types");

  function collect(value: string, previous: any) {
    return previous.concat([value]);
  }
  program.option("-h, --header <value>", "Add headers", collect, []);

  program.option(
    "-c, --scalar <value>",
    "Define type for custom scalar",
    collect,
    []
  );

  program.parse();
}

function handleSchema(endpoint: string | undefined): string {
  if (endpoint === undefined) {
    return program.error("Schema endpoint was not found");
  }

  let resolvedEndpoint = "";
  try {
    resolvedEndpoint = new URL(endpoint).toString();
  } catch {
    return program.error("Schema endpoint is not a valid url");
  }

  return resolvedEndpoint;
}

function handleOutput(output: string | undefined): string {
  if (output === undefined) {
    return program.error("Output path for generation was not found");
  }

  const resolvedEndpoint = path.resolve(path.join(process.cwd(), output));
  return resolvedEndpoint;
}

async function main() {
  defineProgram();

  const options = program.opts<OptionFlags>();
  const schemaEndpoint = handleSchema(options.schema);
  const outputPath = handleOutput(options.output);
  const onlyTypes = options.types ?? false;
  const headers = options.header && parseCustomOptions(options.header);
  const scalars = options.scalar && parseCustomOptions(options.scalar);

  console.log("");
  console.log("Resolved schema endpoint:", schemaEndpoint);
  console.log("Resolved output path:", outputPath);
  console.log("Only generate types:", onlyTypes);
  console.log("Headers:", JSON.stringify(headers));
  console.log("Custom scalars:", JSON.stringify(scalars));
  console.log("");

  await generateSchema(schemaEndpoint, outputPath, {
    onlyTypes,
    headers,
    scalars,
  });
}

main();
