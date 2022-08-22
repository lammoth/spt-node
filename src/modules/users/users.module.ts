import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PasswordService } from 'src/modules/auth/password.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersResolver,
    UsersService,
    PasswordService,
  ],
})
export class UsersModule {}
