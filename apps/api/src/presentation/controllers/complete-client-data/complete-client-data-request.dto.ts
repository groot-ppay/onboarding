import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompleteClientDataRequestDto {
  @ApiProperty({ description: 'Document Number', example: '12345678' })
  @IsString()
  @IsNotEmpty()
  documentNumber!: string;

  @ApiProperty({ description: 'Gender', example: 'M' })
  @IsString()
  @IsNotEmpty()
  gender!: string;
}
