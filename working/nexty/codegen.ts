import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "http://localhost:5000/graphql",
  documents: ["src/**/*.(ts|tsx)"],
  watch: true,
  watchConfig: {
    usePolling: true,
    interval: 1000,
  },
  verbose: true,
  generates: {
    "./src/graphql/urql/": {
      // "./src/graphql/__generated__/": {
      preset: "client-preset",

      // plugins: ["typescript"],
      plugins: [],
      // plugins: [
      //   "typescript",
      //   "typescript-operations",
      //   "typescript-react-apollo",
      // ],

      config: {
        withHooks: true,
        // withHOC: true,
        // nonOptionalTypename: true,
        maybeValue: "T | null | undefined",
        avoidOptionals: true,
        constEnums: true,
        // withRefetchFn: true,
        skipTypename: true,
        // typesPrefix: "SHIT",
        // typesSuffix: "SHIT",
        // enumsAsTypes: true,

        useTypeImports: true,
        strictScalars: true,
        defaultScalarType: "unknown",

        scalars: {
          JSON: "string",
          Date: "string",
          DateTime: "string",
          Long: "BigInt",
          Upload: "string",
        },
      },

      // presetConfig: {
      //   gqlTagName: "gql",
      // },
    },
  },
  ignoreNoDocuments: true,
}

export default config
