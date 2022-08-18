export interface Config {
  nest: NestConfig;
  http: HttpConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  graphql: GraphqlConfig;
  security: SecurityConfig;
  carto: CartoConfig;
}

export interface NestConfig {
  port: number;
  defaultVersion: string;
  availableVersions: string[];
}

export interface HttpConfig {
  timeout: number;
  maxRedirects: number;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  schemaDestination: string;
  sortSchema: boolean;
}

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}

export interface CartoConfig {
  baseUrl: string;
  sqlUrl: string;
  connection: string;
  auth: CartoAuth;
}

export interface CartoAuth {
  domain: string;
  audience: string[];
  clientId: string;
  clientSecret: string;
}
