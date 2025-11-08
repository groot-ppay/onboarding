import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class PhoneValidationRequestDto {
  @ApiProperty({ description: 'Identificador de cliente', example: 'e5f65db8-3f8d-4139-b3a7-47e084e506ca' })
  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @ApiProperty({ description: 'Número de teléfono', example: '543555145588' })
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;
}
