import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from './password.service';
import { GqlAuthGuard } from './gql-auth.guard';
import { CartoAuthGuard } from './carto-auth.guard';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { CartoStrategy } from './carto.strategy';
import { SecurityConfig } from 'src/common/configs/config.interface';
import cartoAuthConfig from 'src/common/configs/carto-auth.config';

@Module({
  imports: [
    ConfigModule.forFeature(cartoAuthConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    CartoStrategy,
    CartoAuthGuard,
    GqlAuthGuard,
    PasswordService,
  ],
  exports: [GqlAuthGuard, CartoAuthGuard],
})
export class AuthModule {}
