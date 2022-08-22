import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService
  ) {}

  getInfo(): any {
    return this.configService.get<string>('nest');
  }
}
