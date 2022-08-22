import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CartoService } from 'src/services/carto/carto.service';
import { CartoAuthGuard } from 'src/services/carto/carto-auth.guard';
import { CartoMethod, CartoJobPayload } from 'src/services/carto/carto.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cartoService: CartoService
  ) {}

  @Get('info')
  info(): any {
    return this.appService.getInfo();
  }

  @UseGuards(CartoAuthGuard)
  @Get('services/carto/test')
  async cartoTest(@Request() req): Promise<any> {
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
