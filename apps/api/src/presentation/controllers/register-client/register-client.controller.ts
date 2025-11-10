import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterClientRequestDto } from "./register-client-request.dto";
import { RegisterClientResponseDto } from "../../../application/use-cases/register-client/register-client-response.dto";
import { RegisterClientCommand } from "../../../application/use-cases/register-client/register-client.command";
import { CommandBus } from "@nestjs/cqrs";

@Controller({ path: 'client', version: '1' })
@ApiTags('Client')
export class RegisterClientController {

  constructor(private readonly commandBus: CommandBus) { }

  @Post()
  @ApiOperation({ summary: 'Register client' })
  @ApiResponse({ status: 201, description: 'Client registered successfully', type: RegisterClientResponseDto })
  async execute(@Body() body: RegisterClientRequestDto): Promise<RegisterClientResponseDto> {
    const command = new RegisterClientCommand(body.email,);
    return await this.commandBus.execute(command);
  }
}