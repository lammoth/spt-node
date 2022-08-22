import { Resolver, Query, Args } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(
    private appService: AppService
  ) {}

  @Query(() => String)
  info(): any {
    return this.appService.getInfo();
  }
}
