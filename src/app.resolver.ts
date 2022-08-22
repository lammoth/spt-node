import { Resolver, Query, Args } from '@nestjs/graphql';
import { AppService } from './app.service';
import { NestConfig } from ./app.model';

@Resolver()
export class AppResolver {
  constructor(
    private appService: AppService
  ) {}

  @Query(() => NestConfig)
  info(): NestConfig {
    return this.appService.getInfo();
  }
}
