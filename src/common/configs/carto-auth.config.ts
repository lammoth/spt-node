import { registerAs } from '@nestjs/config';
import { CartoAuth } from './carto-auth.config.interface';

const cartoAuthConfig: CartoAuth = {
  domain: "https://auth.carto.com",
  audience: [
    "carto-cloud-native-api",
    "https://carto-production.us.auth0.com/userinfo"
  ],
}

export default registerAs('auth', () => (cartoAuthConfig));
