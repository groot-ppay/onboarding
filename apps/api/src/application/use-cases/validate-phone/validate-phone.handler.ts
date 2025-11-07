import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ValidatePhoneCommand } from './validate-phone.command';
import { ValidatePhoneResponseDto } from './validate-phone-response.dto';
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

    try {
      const client = await this.repository.findById(clientId);

      if (!client) {
        throw new Error('Client not found');
      }

      const result = await this.numberVerificationService.verifyPhoneNumber({ phoneNumber });

      if (result.devicePhoneNumberVerified) {
        this.logger.log(`Teléfono validado silenciosamente para clientId: ${clientId}, teléfono: ${phoneNumber}`);

        client.phoneNumber = phoneNumber;

        await this.repository.save(client);

        return { strategy: 'SILENT_VALIDATION', state: 'VALIDATED' };
      }
      else {
        this.logger.log(`Enviando código por SMS para clientId: ${clientId}, teléfono: ${phoneNumber}`);
        return { strategy: 'OTP', state: 'PENDING', code: Math.floor(10000 + Math.random() * 90000) };
      }
    } 
    catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
