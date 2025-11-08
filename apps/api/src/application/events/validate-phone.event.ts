export class ValidatePhoneEvent {
  constructor(
    public readonly clientId: string,
    public readonly phoneNumber: string
  ) {}
}