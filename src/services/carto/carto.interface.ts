export enum CartoMethods {
  get = "get",
  post = "post",
  delete = "delete"
}

export interface CartoMethod {
  type: CartoMethods;
}

export interface CartoQueryPayload {
  timeoutms: number;
}

export interface CartoQueryOptions {
  timeoutms: number;
}

export interface CartoJobPayload {
  metadata: string;
}

export interface CartoJobOptions {
  timeoutms: number;
}

export interface CartoJobListOptions {
  created_since: string;
  user_id: string;
}
