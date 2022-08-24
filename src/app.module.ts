import { GraphQLModule } from '@nestjs/graphql';
import { Logger, Module} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import config from '@common/configs/config';
import { loggingMiddleware } from 'src/common/middleware/logging.middleware';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';
import { CartoService } from '@services/carto/carto.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config], envFilePath: '.env' }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware(new Logger('PrismaMiddleware'))], // configure your prisma middleware
      },
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),

    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, CartoService],
})
export class AppModule {}
