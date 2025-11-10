export interface LoginClientResponseDto {
  clientId: string;
  strategy: 'SILENT_VALIDATION' | 'OTP';
  state: 'VALIDATED' | 'PENDING';
  code?: number;
}
