import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumberString } from 'class-validator';

export class OtpValidationRequestDto {
  @ApiProperty({ description: 'Identificador de cliente', example: 'e5f65db8-3f8d-4139-b3a7-47e084e506ca' })
  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @ApiProperty({ description: 'Número de teléfono', example: '543555145588' })
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @ApiProperty({ description: 'Código OTP', example: '12345' })
  @IsNumberString()
  @IsNotEmpty()
  otp!: number;
}
