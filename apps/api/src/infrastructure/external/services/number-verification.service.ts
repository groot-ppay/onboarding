import { Injectable, HttpException, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(NumberVerificationService.name);
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
    const url = `${this.apiUrl}/number-verification/v0/verify`;
    this.logger.log(`[verifyPhoneNumber] Request: ${url} - Body: ${JSON.stringify(request)}`);

    const token = await this.tokenService.getAccessToken(this.scope);
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      this.logger.error(`[verifyPhoneNumber] Error: ${response.status} - ${JSON.stringify(error)}`);
      throw new HttpException(error.message || 'Verification failed', response.status);
    }

    const result = await response.json();
    this.logger.log(`[verifyPhoneNumber] Response: ${JSON.stringify(result)}`);
    return result;
  }

  async sharePhoneNumber(): Promise<SharePhoneNumberResponse> {
    const url = `${this.apiUrl}/number-verification/v0/device-phone-number`;
    this.logger.log(`[sharePhoneNumber] Request: ${url}`);

    const token = await this.tokenService.getAccessToken(this.scope);
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      this.logger.error(`[sharePhoneNumber] Error: ${response.status} - ${JSON.stringify(error)}`);
      throw new HttpException(error.message || 'Failed to get phone number', response.status);
    }

    const result = await response.json();
    this.logger.log(`[sharePhoneNumber] Response: ${JSON.stringify(result)}`);
    return result;
  }
}
