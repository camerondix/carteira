
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8880/graphql",
  documents: "src/**/*.tsx",
  generates: {
    "./src/gql/generated/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
