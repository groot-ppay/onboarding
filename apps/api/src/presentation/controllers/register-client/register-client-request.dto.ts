import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterClientRequestDto {
  @ApiProperty({ description: 'Email', example: 'test@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}