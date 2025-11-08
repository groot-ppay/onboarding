export class ValidateOtpCommand {
  constructor(
    public readonly clientId: string,
    public readonly phoneNumber: string,
    public readonly otp: number
  ) {}
}
