import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CartoService } from 'src/services/carto/carto.service';

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

  @Get('test')
  test(): any {
    return this.cartoService.jobs();
  }

  @Post()
  changePassword(@Body() userPasswordData: string): Promise<boolean> {
    return this.usersService.changePassword(userPasswordData);
  }
}
