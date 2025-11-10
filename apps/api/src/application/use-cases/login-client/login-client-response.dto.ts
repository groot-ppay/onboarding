import { ApiProperty } from '@nestjs/swagger';

export class LoginClientResponseDto {
  @ApiProperty({ example: 'e5f65db8-3f8d-4139-b3a7-47e084e506ca' })
  clientId!: string;

  @ApiProperty({ example: 'SILENT_VALIDATION', enum: ['SILENT_VALIDATION', 'OTP'] })
  strategy!: 'SILENT_VALIDATION' | 'OTP';

  @ApiProperty({ example: 'VALIDATED', enum: ['VALIDATED', 'PENDING'] })
  state!: 'VALIDATED' | 'PENDING';

  @ApiProperty({ example: 123456, required: false })
  code?: number;
}
