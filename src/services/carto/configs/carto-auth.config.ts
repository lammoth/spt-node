import { registerAs } from '@nestjs/config';
import { CartoAuth } from './carto-auth.config.interface';

const cartoAuthConfig: CartoAuth = {
  domain: process.env.CARTO_AUTH_DOMAIN,
  audience: process.env.CARTO_AUTH_AUDIENCE.split(','),
}

export default registerAs('auth', () => (cartoAuthConfig));
