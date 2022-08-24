import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { CartoService } from './carto.service';
import config from '@common/configs/config';

describe('CartoService', () => {
  let service: CartoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [config] }),
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        })
      ],
      providers: [CartoService],
    }).compile();

    service = module.get<CartoService>(CartoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
