import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  domain: "https://auth.carto.com",
  audience: [
    "carto-cloud-native-api",
    "https://carto-production.us.auth0.com/userinfo"
  ],
  clientId: '2s1kgx2ehVo9QcPrvdK4BOjOicret6bB',
  clientSecret: 'sasasa',
}));
