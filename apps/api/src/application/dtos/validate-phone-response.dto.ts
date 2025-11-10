import { ApiProperty } from '@nestjs/swagger';

export class ValidatePhoneResponseDto {
  @ApiProperty({ example: 'SILENT_VALIDATION', enum: ['SILENT_VALIDATION', 'OTP'] })
  strategy!: 'SILENT_VALIDATION' | 'OTP';

  @ApiProperty({ example: 'VALIDATED', enum: ['PENDING', 'VALIDATED'] })
  state!: 'PENDING' | 'VALIDATED';

  @ApiProperty({ example: 123456, required: false })
  code?: number;
}
