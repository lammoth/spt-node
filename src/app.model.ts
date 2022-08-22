import {
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class NestConfig {
  port: number;
  defaultVersion: string;
  availableVersions: string[];
}
