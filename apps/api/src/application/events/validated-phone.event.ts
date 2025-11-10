export class ValidatedPhoneEvent {
  constructor(
    public readonly clientId: string,
    public readonly phoneNumber: string
  ) {}
}