import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: parseInt(process.env.NEST_PORT, 3000) || 3000,
    defaultVersion: process.env.NEST_DEFAULT_VERSION.toString() || "1",
    availableVersions: [process.env.NEST_DEFAULT_VERSION.toString() || "1",],
  },
  cors: {
    enabled: true,
  },
  http: {
    timeout: parseInt(process.env.HTTP_TIMEOUT, 5000) || 5000,
    maxRedirects: parseInt(process.env.HTTP_MAX_REDIRECTS, 5) || 5,
  },
  swagger: {
    enabled: Boolean(process.env.SWAGGER_ENABLED),
    title: process.env.SWAGGER_TITLE,
    description: process.env.SWAGGER_DESCRIPTION,
    version: process.env.SWAGGER_VERSION,
    path: process.env.SWAGGER_PATH,
  },
  graphql: {
    playgroundEnabled: Boolean(process.env.GRAPHQL_PLAYGROUND_ENABLED),
    debug: Boolean(process.env.GRAPHQL_DEBUG),
    schemaDestination: process.env.GRAPHQL_SCHEMA_DST,
    sortSchema: Boolean(process.env.GRAPHQL_SCHEMA_SORT),
  },
  security: {
    expiresIn: process.env.AUTH_EXPIRATION,
    refreshIn: process.env.AUTH_REFRESH,
    bcryptSaltOrRound: process.env.AUTH_SALT,
  },
  carto: {
    baseUrl: process.env.CARTO_BASE_URL,
    sqlUrl: process.env.CARTO_SQL_URL,
    connection: process.env.CARTO_CONNECTION,
  },
};

export default (): Config => config;
