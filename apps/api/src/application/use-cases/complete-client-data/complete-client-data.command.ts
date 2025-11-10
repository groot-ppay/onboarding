export class CompleteClientDataCommand {
  constructor(
    public readonly clientId: string,
    public readonly documentNumber: string,
    public readonly gender: string
  ) {}
}
