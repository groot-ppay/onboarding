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
    this.mockNumber = this.configService.get<string>('DEVICE_NUMBER_VALIDATED') || '+222222222222';
  }

	async handle(event: ValidatedPhoneEvent): Promise<void> {
    const { clientId } = event;
		this.logger.log(`Validando device-swap para clientId: ${clientId}, teléfono: ${this.mockNumber}`);

    try {
      const response = await this.deviceSwapService.checkDeviceSwap({ phoneNumber: this.mockNumber });

      if (!response.swapped) {
        this.logger.log(`El dispositivo del cliente ${clientId} con número ${this.mockNumber} no ha sido intercambiado en 10 días`);
        // Marcar el onb como seguro
      }
    } 
    catch (error) {
      this.logger.error(error);
    }

    const client = await this.repository.findById(clientId);

    this.logger.warn(`El cliente ${clientId} ha sido bloqueado por haber intercambiado el dispositivo en 10 días`);
    this.logger.warn(`El cliente ${clientId} debe utilizar más factores de verificación. Ej: FaceRecognition`);

    client!.status = 'BLOCKED';

    await this.repository.save(client!);
    // Marcar el onb como riesgoso y requerir más factores de verificación. Ej: FaceRecognition
	}
}
