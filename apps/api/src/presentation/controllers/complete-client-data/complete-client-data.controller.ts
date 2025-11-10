import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { CompleteClientDataRequestDto } from './complete-client-data-request.dto';
import { CompleteClientDataResponseDto } from '../../../application/use-cases/complete-client-data/complete-client-data-response.dto';
import { CompleteClientDataCommand } from '../../../application/use-cases/complete-client-data/complete-client-data.command';

@Controller({ path: 'client', version: '1' })
@ApiTags('Client')
export class CompleteClientDataController {

  constructor(private readonly commandBus: CommandBus) {}

  @Put(':id/complete-data')
  @ApiOperation({ summary: 'Complete client data' })
  @ApiResponse({ status: 200, description: 'Client data completed successfully', type: CompleteClientDataResponseDto })
  async execute(
    @Param('id') clientId: string,
    @Body() body: CompleteClientDataRequestDto
  ): Promise<CompleteClientDataResponseDto> {
    const command = new CompleteClientDataCommand(
      clientId,
      body.documentNumber,
      body.gender
    );
    return await this.commandBus.execute(command);
  }
}
