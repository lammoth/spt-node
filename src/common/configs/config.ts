import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 3000,
    defaultVersion: '1',
    availableVersions: ['1',],
  },
  cors: {
    enabled: true,
  },
  http: {
    timeout: 5000,
    maxRedirects: 5,
  },
  swagger: {
    enabled: true,
    title: 'SPT',
    description: 'Carto SPT API',
    version: '0.0.1',
    path: 'api_docs',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
  carto: {
    baseUrl: 'https://gcp-us-east1.api.carto.com',
    sqlUrl: '/v3/sql',
    connection: 'test'
  },
};

export default (): Config => config;
