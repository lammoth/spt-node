import { Injectable } from '@nestjs/common';
import type {
  NestConfig,
} from 'src/common/configs/config.interface';

@Injectable()
export class AppService {
  getInfo(): any {
    return {};
  }
}
