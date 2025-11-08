import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OtpValidationRequestDto } from './otp-validation-request.dto';
import { ValidatePhoneResponseDto } from '../../../application/dtos/validate-phone-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidateOtpCommand } from '../../../application/use-cases/validate-otp/validate-otp.command';

@Controller({ path: 'otp-validation', version: '1'})
@ApiTags('Client')
export class OtpValidationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ summary: 'Try to validate otp' })
  async execute(@Body() request: OtpValidationRequestDto): Promise<ValidatePhoneResponseDto> {
    const command = new ValidateOtpCommand(request.clientId, request.phoneNumber, request.otp);
    return this.commandBus.execute(command);
  }
}
