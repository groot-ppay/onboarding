import { Inject } from '@nestjs/common';
import { ClientEntity } from '../../../domain/entities/client.entity';
import { IClientRepository } from '../../../domain/repositories/client.repository';
import { Uuid } from '../../../domain/shared/value-objects/uuid.value-object';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterClientCommand } from './register-client.command';
import { RegisterClientResponseDto } from './register-client-response.dto';
import { CLIENT_REPOSITORY } from '../../../domain/config/tokens';

@CommandHandler(RegisterClientCommand)
export class RegisterClientHandler implements ICommandHandler<RegisterClientCommand> {

  constructor(@Inject(CLIENT_REPOSITORY) private readonly clientRepository: IClientRepository) {}

  async execute(command: RegisterClientCommand): Promise<RegisterClientResponseDto> {

    const clientId = Uuid.create();

    const client = ClientEntity.create(clientId, command.email);
    
    await this.clientRepository.save(client);
    
    return { clientId: clientId.value };
  }
}
