import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
// import { CartoService } from 'src/services/carto/carto.service';
// import { CartoAuthGuard } from 'src/services/carto/carto-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly cartoService: CartoService
  ) {}

  @Get('info')
  info(): any {
    return this.appService.getInfo();
  }

  // @UseGuards(CartoAuthGuard)
  // @Get('services/carto/test')
  // async cartoTest(@Request() req): Promise<any> {
  //   return await this.cartoService.jobs(req.headers.authorization);
  // }
}
