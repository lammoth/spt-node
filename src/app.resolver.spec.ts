import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import config from '@common/configs/config';

describe('AppResolver', () => {
  let appResolver: AppResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [config] }),
      ],
      providers: [AppResolver, AppService, ConfigService],
    }).compile();

    appResolver = app.get<AppResolver>(AppResolver);
  });

  describe('info', () => {
    it('should return Nest config', () => {
      expect(appResolver.info()).toHaveProperty('port');
    });
  });
});
