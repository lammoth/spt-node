import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PasswordService } from 'src/modules/auth/password.service';
import { CartoService } from 'src/services/carto/carto.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersResolver,
    UsersService,
    PasswordService,
  ],
})
export class UsersModule {}
