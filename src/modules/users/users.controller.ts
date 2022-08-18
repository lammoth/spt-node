import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CartoService } from 'src/services/carto/carto.service';
import { CartoAuthGuard } from 'src/modules/auth/carto-auth.guard';
//import { AuthGuard } from '@nestjs/passport';

// import { UserPasswordData } from './users.model';

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
  //@UseGuards(AuthGuard('carto'))
  @Get('cartotest')
  async test_carto(): Promise<any> {
    //return await this.cartoService.jobs();
  }
}
