import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  private readonly authUrl: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly tokenCache = new Map<string, { token: string; expiry: number }>();

  constructor(private readonly configService: ConfigService) {
    this.authUrl = this.configService.get<string>('AUTH_URL', '');
    this.clientId = this.configService.get<string>('CLIENT_ID', '');
    this.clientSecret = this.configService.get<string>('CLIENT_SECRET', '');
  }

  async getAccessToken(scope: string): Promise<string> {
    const cached = this.tokenCache.get(scope);
    if (cached && Date.now() < cached.expiry) {
      return cached.token;
    }

    const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      scope,
    });

    const response = await fetch(this.authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new HttpException('Failed to obtain access token', response.status);
    }

    const data = await response.json();
    const expiry = Date.now() + (data.expires_in - 60) * 1000;
    
    this.tokenCache.set(scope, { token: data.access_token, expiry });
    return data.access_token;
  }
}
