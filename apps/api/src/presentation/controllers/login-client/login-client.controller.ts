import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { LoginClientRequestDto } from './login-client-request.dto';
import { LoginClientResponseDto } from '../../../application/use-cases/login-client/login-client-response.dto';
import { LoginClientCommand } from '../../../application/use-cases/login-client/login-client.command';

@Controller({ path: 'client', version: '1' })
@ApiTags('Client')
export class LoginClientController {

  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  @ApiOperation({ summary: 'Login client' })
  @ApiResponse({ status: 201, description: 'Login result', type: LoginClientResponseDto })
  async execute(@Body() body: LoginClientRequestDto): Promise<LoginClientResponseDto> {
    const command = new LoginClientCommand(body.email);
    return await this.commandBus.execute(command);
  }
}
