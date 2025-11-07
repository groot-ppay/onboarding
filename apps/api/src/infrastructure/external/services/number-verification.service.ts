import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  INumberVerificationService,
  VerifyPhoneNumberRequest,
  VerifyPhoneNumberResponse,
  SharePhoneNumberResponse,
} from '../../../domain/services/number-verification.service.interface';
import { TokenService } from './token.service';

@Injectable()
export class NumberVerificationService implements INumberVerificationService {
  private readonly apiUrl: string;
  private readonly scope: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService
  ) {
    this.apiUrl = this.configService.get<string>('API_URL', '');
    this.scope = this.configService.get<string>('NUMBER_VERIFICATION_SCOPE', '');
  }

  async verifyPhoneNumber(request: VerifyPhoneNumberRequest): Promise<VerifyPhoneNumberResponse> {
    const token = await this.tokenService.getAccessToken(this.scope);
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${this.apiUrl}/number-verification/v0/verify`, {
      method: 'POST',
      headers,
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new HttpException(error.message || 'Verification failed', response.status);
    }

    return response.json();
  }

  async sharePhoneNumber(): Promise<SharePhoneNumberResponse> {
    const token = await this.tokenService.getAccessToken(this.scope);
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(`${this.apiUrl}/number-verification/v0/device-phone-number`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new HttpException(error.message || 'Failed to get phone number', response.status);
    }

    return response.json();
  }
}
