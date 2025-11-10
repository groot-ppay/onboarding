import { ApiProperty } from '@nestjs/swagger';

export class RegisterClientResponseDto {
  @ApiProperty({ example: 'e5f65db8-3f8d-4139-b3a7-47e084e506ca' })
  clientId!: string;
}