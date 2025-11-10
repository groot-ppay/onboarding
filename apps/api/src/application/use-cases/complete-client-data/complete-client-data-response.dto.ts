import { ApiProperty } from '@nestjs/swagger';

export class CompleteClientDataResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;
}
