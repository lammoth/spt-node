import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CartoService } from 'src/services/carto/carto.service';
import { CartoAuthGuard } from 'src/services/carto/carto-auth.guard';
import { CartoMethod, CartoJobPayload } from 'src/services/carto/carto.interface';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cartoService: CartoService
  ) {}

  @UseGuards(CartoAuthGuard)
  @Get()
  async info(@Request() req): Promise<any> {
    // return await this.cartoService.query(
    //   req.headers.authorization,
    //   "select sum(1) from app_initiative_analysisaudience",
    //   <CartoMethod>{ type: "get" }
    // );
    // return await this.cartoService.job(
    //   req.headers.authorization,
    //   <CartoMethod>{ type: "post" },
    //   "select sum(1) from app_initiative_analysisaudience"
    // );
    return await this.cartoService.job(
      req.headers.authorization,
      <CartoMethod>{ type: "get" },
      undefined,
      undefined,
      "757fa49c-b326-4d44-8850-dafb811e1a20"
    )
    //return await this.cartoService.jobs(req.headers.authorization);
  }
}
