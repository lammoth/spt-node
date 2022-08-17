enum CartoMethods {
  get = "get",
  post = "post",
  delete = "delete"
}

export interface CartoMethod {
  method: CartoMethods;
}

export interface CartoQueryPayload {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface CartoQueryOptions {
  enabled: boolean;
}

export interface CartoJobPayload {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface CartoJobOptions {
  enabled: boolean;
}
