import { Injectable, HttpException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IDeviceSwapService,
  RetrieveDateRequest,
  RetrieveDateResponse,
  CheckDeviceSwapRequest,
  CheckDeviceSwapResponse,
} from '../../../domain/services/device-swap.service.interface';
import { TokenService } from './token.service';

@Injectable()
export class DeviceSwapService implements IDeviceSwapService {
  private readonly logger = new Logger(DeviceSwapService.name);
  private readonly apiUrl: string;
  private readonly scope: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService
  ) {
    this.apiUrl = this.configService.get<string>('API_URL', '');
    this.scope = this.configService.get<string>('DEVICE_SWAP_SCOPE', '');
  }

  async retrieveDate(request: RetrieveDateRequest): Promise<RetrieveDateResponse> {
    const url = `${this.apiUrl}/device-swap/v0.2/retrieve-date`;
    this.logger.log(`[retrieveDate] Request: ${url} - Body: ${JSON.stringify(request)}`);

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
      this.logger.error(`[retrieveDate] Error: ${response.status} - ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message || 'Failed to retrieve device swap date',
        response.status
      );
    }

    const result = await response.json();
    this.logger.log(`[retrieveDate] Response: ${JSON.stringify(result)}`);
    return result;
  }

  async checkDeviceSwap(request: CheckDeviceSwapRequest): Promise<CheckDeviceSwapResponse> {
    const url = `${this.apiUrl}/device-swap/v0.2/check`;
    this.logger.log(`[checkDeviceSwap] Request: ${url} - Body: ${JSON.stringify(request)}`);

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
      this.logger.error(`[checkDeviceSwap] Error: ${response.status} - ${JSON.stringify(error)}`);
      throw new HttpException(
        error.message || 'Failed to check device swap',
        response.status
      );
    }

    const result = await response.json();
    this.logger.log(`[checkDeviceSwap] Response: ${JSON.stringify(result)}`);
    return result;
  }
}
