import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
// import { UserPasswordData } from './users.model';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  changePassword(@Body() userPasswordData: string): Promise<boolean> {
    return this.usersService.changePassword(userPasswordData);
  }
}
