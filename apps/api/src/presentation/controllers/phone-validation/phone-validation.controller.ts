import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { PhoneValidationRequestDto } from './phone-validation-request.dto';
import { ValidatePhoneCommand } from '../../../application/use-cases/validate-phone/validate-phone.command';
import { ValidatePhoneResponseDto } from '../../../application/dtos/validate-phone-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'client/phone-validation', version: '1'})
@ApiTags('Client')
export class PhoneValidationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ summary: 'Try to validate phone' })
  async execute(@Body() request: PhoneValidationRequestDto): Promise<ValidatePhoneResponseDto> {
    const command = new ValidatePhoneCommand(request.clientId, request.phoneNumber);
    return this.commandBus.execute(command);
  }
}
