import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { LoginClientCommand } from './login-client.command';
import { LoginClientResponseDto } from './login-client-response.dto';
import { IClientRepository } from '../../../domain/repositories/client.repository';
import { INumberVerificationService } from '../../../domain/services/number-verification.service.interface';
import { IDeviceSwapService } from '../../../domain/services/device-swap.service.interface';
import { CLIENT_REPOSITORY, NUMBER_VERIFICATION_SERVICE, DEVICE_SWAP_SERVICE } from '../../../domain/config/tokens';
import { ConfigService } from '@nestjs/config';

@CommandHandler(LoginClientCommand)
export class LoginClientHandler implements ICommandHandler<LoginClientCommand, LoginClientResponseDto> {

  private readonly mockNumber: string;

  private readonly logger = new Logger(LoginClientHandler.name);

  constructor(
    @Inject(CLIENT_REPOSITORY) private readonly clientRepository: IClientRepository,
    @Inject(NUMBER_VERIFICATION_SERVICE) private readonly numberVerificationService: INumberVerificationService,
    @Inject(DEVICE_SWAP_SERVICE) private readonly deviceSwapService: IDeviceSwapService,
    private readonly configService: ConfigService
  ) {
    this.mockNumber = this.configService.get<string>('DEVICE_NUMBER_VALIDATED') || '541122358032';
  }

  async execute(command: LoginClientCommand): Promise<LoginClientResponseDto> {
    const { email } = command;

    this.logger.log(`Intentando login para email: ${email}`);

    const client = await this.clientRepository.findByEmail(email);

    if (!client) {
      this.logger.error(`Cliente no encontrado con email: ${email}`);
      throw new Error('Cliente no encontrado');
    }

    if (client.status === 'BLOCKED') {
      this.logger.error(`Cliente ${client.id.value} está bloqueado`);
      throw new Error('Cliente bloqueado');
    }

    if (!client.phoneNumber) {
      this.logger.error(`Cliente ${client.id.value} no tiene teléfono registrado`);
      throw new Error('Cliente no tiene teléfono registrado');
    }

    try {
      const deviceSwapResult = await this.deviceSwapService.retrieveDate({ phoneNumber: this.mockNumber });
      this.logger.log(`Fecha de cambio de dispositivo para cliente ${client.id.value}: ${deviceSwapResult.latestDeviceChange}`);
      console.log('Enviando info a Paygilant para evaluar el riesgo...');
    } 
    catch (error) {
      this.logger.error(`Error al obtener fecha de cambio de dispositivo: ${error}`);
    }

    try {
      const result = await this.numberVerificationService.verifyPhoneNumber({ phoneNumber: client.phoneNumber });

      if (result.devicePhoneNumberVerified) {
        this.logger.log(`Login exitoso con validación silenciosa para cliente: ${client.id.value}`);
        return { 
          clientId: client.id.value,
          strategy: 'SILENT_VALIDATION', 
          state: 'VALIDATED' 
        };
      } 
      else {
        this.logger.warn(`No se pudo validar silenciosamente el teléfono para cliente: ${client.id.value}`);
      }
    } 
    catch (error) {
      this.logger.error(error);
    }

    // TODO: Save OTP code
    const code = Math.floor(10000 + Math.random() * 90000);
    this.logger.log(`Enviando código OTP para cliente: ${client.id.value}, teléfono: ${client.phoneNumber}. ${code}`);
    
    return { 
      clientId: client.id.value,
      strategy: 'OTP', 
      state: 'PENDING', 
      code 
    };
  }
}
