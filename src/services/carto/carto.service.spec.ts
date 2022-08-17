import { Test, TestingModule } from '@nestjs/testing';
import { CartoService } from './carto.service';

describe('CartoService', () => {
  let service: CartoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartoService],
    }).compile();

    service = module.get<CartoService>(CartoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
