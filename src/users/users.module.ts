import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PasswordService } from 'src/auth/password.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersResolver, UsersService, PasswordService],
})
export class UsersModule {}
