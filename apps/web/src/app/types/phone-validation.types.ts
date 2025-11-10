export type PhoneValidationStrategy = 'OTP' | 'SILENT_VALIDATION';
export type PhoneValidationState = 'PENDING' | 'VALIDATED';

export interface PhoneValidationResponsePending {
  strategy: 'OTP';
  state: 'PENDING';
  code: number;
}

export interface PhoneValidationResponseValidated {
  strategy: 'SILENT_VALIDATION';
  state: 'VALIDATED';
}

export type PhoneValidationResponse = 
  | PhoneValidationResponsePending 
  | PhoneValidationResponseValidated;
