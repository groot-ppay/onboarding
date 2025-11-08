export class ValidatePhoneCommand {
  constructor(
    public readonly clientId: string,
    public readonly phoneNumber: string
  ) {}
}
