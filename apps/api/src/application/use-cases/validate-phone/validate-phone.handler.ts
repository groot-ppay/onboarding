import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ValidatePhoneCommand } from './validate-phone.command';
import { ValidatePhoneResponseDto } from '../../dtos/validate-phone-response.dto';
import { INumberVerificationService } from '../../../domain/services/number-verification.service.interface';
import { CLIENT_REPOSITORY, NUMBER_VERIFICATION_SERVICE } from '../../../domain/config/tokens';
import { IClientRepository } from '../../../domain/repositories/client.repository';

@CommandHandler(ValidatePhoneCommand)
export class ValidatePhoneHandler implements ICommandHandler<ValidatePhoneCommand, ValidatePhoneResponseDto> {

  private readonly logger = new Logger(ValidatePhoneHandler.name);

  constructor(
    @Inject(NUMBER_VERIFICATION_SERVICE) private readonly numberVerificationService: INumberVerificationService,
    @Inject(CLIENT_REPOSITORY) private readonly repository: IClientRepository
  ) {}

  async execute(command: ValidatePhoneCommand): Promise<ValidatePhoneResponseDto> {
    const { clientId, phoneNumber } = command;

    const client = await this.repository.findById(clientId);

    if (!client) {
      throw new Error('Cliente no encontrado');
    }

    try {
      const result = await this.numberVerificationService.verifyPhoneNumber({ phoneNumber });

      if (result.devicePhoneNumberVerified) {
        this.logger.log(`Teléfono validado silenciosamente para clientId: ${clientId}, teléfono: ${phoneNumber}`);

        client.phoneNumber = phoneNumber;

        await this.repository.save(client);

        return { strategy: 'SILENT_VALIDATION', state: 'VALIDATED' };
      }
      else {
        this.logger.warn(`No se pudo validar silenciosamente el teléfono para clientId: ${clientId}, teléfono: ${phoneNumber}`);
      }
    } 
    catch (error) {
      this.logger.error(error);
    }

    // TODO: Save OTP code
    this.logger.log(`Enviando código por SMS para clientId: ${clientId}, teléfono: ${phoneNumber}`);
    return { strategy: 'OTP', state: 'PENDING', code: Math.floor(10000 + Math.random() * 90000) };
  }
}
