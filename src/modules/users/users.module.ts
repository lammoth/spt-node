import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PasswordService } from 'src/modules/auth/password.service';
import { CartoService } from 'src/services/carto/carto.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersResolver,
    UsersService,
    PasswordService,
    CartoService,
  ],
})
export class UsersModule {}
