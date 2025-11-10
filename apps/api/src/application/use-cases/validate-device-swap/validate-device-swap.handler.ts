import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';

import { ValidatedPhoneEvent } from '../../events/validated-phone.event';
import { CLIENT_REPOSITORY, DEVICE_SWAP_SERVICE } from '../../../domain/config/tokens';
import { IClientRepository } from '../../../domain/repositories/client.repository';
import { IDeviceSwapService } from '../../../domain/services/device-swap.service.interface';

@EventsHandler(ValidatedPhoneEvent)
@Injectable()
export class ValidateDeviceSwapHandler implements IEventHandler<ValidatedPhoneEvent> {

  private readonly mockNumber: string;

	private readonly logger = new Logger(ValidateDeviceSwapHandler.name);

	constructor(
		@Inject(DEVICE_SWAP_SERVICE) private readonly deviceSwapService: IDeviceSwapService,
    @Inject(CLIENT_REPOSITORY) private readonly repository: IClientRepository,
    private readonly configService: ConfigService
	) { 
    this.mockNumber = this.configService.get<string>('DEVICE_NUMBER_VALIDATED') || '541122358032';
  }

	async handle(event: ValidatedPhoneEvent): Promise<void> {
    const { clientId } = event;
		this.logger.log(`Validando device-swap para clientId: ${clientId}, teléfono: ${this.mockNumber}`);

    try {
      const deviceSwapResult = await this.deviceSwapService.retrieveDate({ phoneNumber: this.mockNumber });
      this.logger.log(`Fecha de cambio de dispositivo para cliente ${clientId}: ${deviceSwapResult.latestDeviceChange}`);
      console.log('Enviando info a Paygilant para evaluar el riesgo...');
    } 
    catch (error) {
      this.logger.error(error);
    }
	}
}
