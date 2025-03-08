import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://discord.com',
  redirectUri: "http://localhost:4200",
  clientId: '1147830116970405948',
  responseType: 'code',
  scope: 'email identify',
  showDebugInformation: true,
  oidc: false,
  loginUrl: 'https://discord.com/api/oauth2/authorize',
  tokenEndpoint: 'https://discord.com/api/oauth2/token'
};