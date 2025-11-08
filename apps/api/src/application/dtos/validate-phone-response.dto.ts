export class ValidatePhoneResponseDto {
  strategy!: 'SILENT_VALIDATION' | 'OTP';
  state!: 'PENDING' | 'VALIDATED';
  code?: number
}
