import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ISimSwapService,
  RetrieveDateRequest,
  RetrieveDateResponse,
  CheckSimSwapRequest,
  CheckSimSwapResponse,
} from '../../../domain/services/sim-swap.service.interface';
import { TokenService } from './token.service';

@Injectable()
export class SimSwapService implements ISimSwapService {
  private readonly apiUrl: string;
  private readonly scope: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService
  ) {
    this.apiUrl = this.configService.get<string>('API_URL', '');
    this.scope = this.configService.get<string>('SIM_SWAP_SCOPE', '');
  }

  async retrieveDate(
    request: RetrieveDateRequest,
    correlator?: string
  ): Promise<RetrieveDateResponse> {
    const token = await this.tokenService.getAccessToken(this.scope);
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    if (correlator) {
      headers['x-correlator'] = correlator;
    }

    const response = await fetch(`${this.apiUrl}/sim-swap/v0/retrieve-date`, {
      method: 'POST',
      headers,
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new HttpException(
        error.message || 'Failed to retrieve SIM swap date',
        response.status
      );
    }

    return response.json();
  }

  async checkSimSwap(
    request: CheckSimSwapRequest,
    correlator?: string
  ): Promise<CheckSimSwapResponse> {
    const token = await this.tokenService.getAccessToken(this.scope);
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    if (correlator) {
      headers['x-correlator'] = correlator;
    }

    const response = await fetch(`${this.apiUrl}/sim-swap/v0/check`, {
      method: 'POST',
      headers,
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new HttpException(
        error.message || 'Failed to check SIM swap',
        response.status
      );
    }

    return response.json();
  }
}
