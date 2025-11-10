import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { CompleteClientDataCommand } from './complete-client-data.command';
import { CompleteClientDataResponseDto } from './complete-client-data-response.dto';
import { IClientRepository } from '../../../domain/repositories/client.repository';
import { CLIENT_REPOSITORY } from '../../../domain/config/tokens';

@CommandHandler(CompleteClientDataCommand)
export class CompleteClientDataHandler implements ICommandHandler<CompleteClientDataCommand, CompleteClientDataResponseDto> {

  private readonly logger = new Logger(CompleteClientDataHandler.name);

  constructor(
    @Inject(CLIENT_REPOSITORY) private readonly clientRepository: IClientRepository
  ) {}

  async execute(command: CompleteClientDataCommand): Promise<CompleteClientDataResponseDto> {
    const { clientId, documentNumber, gender } = command;

    this.logger.log(`Completando datos del cliente: ${clientId}`);

    const client = await this.clientRepository.findById(clientId);

    if (!client) {
      this.logger.error(`Cliente no encontrado: ${clientId}`);
      throw new Error('Cliente no encontrado');
    }

    client.documentNumber = documentNumber;
    client.gender = gender;

    await this.clientRepository.save(client);

    this.logger.log(`Datos completados exitosamente para cliente: ${clientId}`);

    console.log('Completando el resto de datos con RENAPER...');

    return { success: true };
  }
}
