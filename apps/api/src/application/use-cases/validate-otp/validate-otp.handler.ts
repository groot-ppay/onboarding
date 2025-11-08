import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ValidateOtpCommand } from './validate-otp.command';
import { CLIENT_REPOSITORY } from '../../../domain/config/tokens';
import { IClientRepository } from '../../../domain/repositories/client.repository';
import { ValidatePhoneResponseDto } from '../../dtos/validate-phone-response.dto';

@CommandHandler(ValidateOtpCommand)
export class ValidateOtpHandler implements ICommandHandler<ValidateOtpCommand, ValidatePhoneResponseDto> {

  private readonly logger = new Logger(ValidateOtpHandler.name);

  constructor(
    @Inject(CLIENT_REPOSITORY) private readonly repository: IClientRepository
  ) { }

  async execute(command: ValidateOtpCommand): Promise<ValidatePhoneResponseDto> {
    const { clientId, phoneNumber } = command;

    const client = await this.repository.findById(clientId);

    if (!client) {
      throw new Error('Cliente no encontrado');
    }

    // TODO: Check OTP Code
    this.logger.log(`Teléfono validado para clientId: ${clientId}, teléfono: ${phoneNumber}`);

    client.phoneNumber = phoneNumber;

    await this.repository.save(client);

    return { strategy: 'OTP', state: 'VALIDATED' };
  }
}
