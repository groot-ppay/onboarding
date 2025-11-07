import { IsString, IsNotEmpty } from 'class-validator';

export class PhoneValidationRequestDto {
  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;
}
