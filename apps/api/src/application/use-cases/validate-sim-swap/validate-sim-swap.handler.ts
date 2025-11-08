import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ValidatePhoneEvent } from '../../events/validate-phone.event';
import { CLIENT_REPOSITORY, SIM_SWAP_SERVICE } from '../../../domain/config/tokens';
import { IClientRepository } from '../../../domain/repositories/client.repository';
import { ISimSwapService } from '../../../domain/services/sim-swap.service.interface';

@EventsHandler(ValidatePhoneEvent)
@Injectable()
export class ValidateSimSwapHandler implements IEventHandler<ValidatePhoneEvent> {

	private readonly logger = new Logger(ValidateSimSwapHandler.name);

	constructor(
		@Inject(SIM_SWAP_SERVICE) private readonly simSwapService: ISimSwapService,
    @Inject(CLIENT_REPOSITORY) private readonly repository: IClientRepository
	) { }

	async handle(event: ValidatePhoneEvent): Promise<void> {
    const { clientId, phoneNumber } = event;
		this.logger.log(`Validando sim-swap para clientId: ${clientId}, teléfono: ${phoneNumber}`);

    try {
      const response = await this.simSwapService.checkSimSwap({ phoneNumber });

      if (!response.swapped) {
        this.logger.log(`El número ${phoneNumber} del cliente ${clientId} no ha sido intercambiado en 10 días`);
        // Marcar el onb como seguro
      }
    } 
    catch (error) {
      this.logger.error(error);
    }

    const client = await this.repository.findById(clientId);

    client!.status = 'BLOCKED';

    await this.repository.save(client!);
    // Marcar el onb como riesgoso y requerir más factores de verificación
	}
}
