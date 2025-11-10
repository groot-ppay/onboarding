export type LoginStrategy = 'OTP' | 'SILENT_VALIDATION';
export type LoginState = 'PENDING' | 'VALIDATED';

export interface LoginResponsePending {
  clientId: string;
  strategy: 'OTP';
  state: 'PENDING';
  code: number;
}

export interface LoginResponseValidated {
  clientId: string;
  strategy: 'SILENT_VALIDATION';
  state: 'VALIDATED';
}

export type LoginResponse = 
  | LoginResponsePending 
  | LoginResponseValidated;
