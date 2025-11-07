import { randomUUID } from 'node:crypto';

export class Uuid {
  
  constructor(public readonly value: string) {
    this.ensureIsValidUuid(value);
  }

  static create(): Uuid {
    return new Uuid(randomUUID());
  }

  private ensureIsValidUuid(id: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new Error(`<${Uuid.name}> does not allow the value <${id}>`);
    }
  }

  toString(): string {
    return this.value;
  }

  equals(uuid?: Uuid): boolean {
    if (uuid === null || uuid === undefined) return false;
    if (this.constructor !== uuid.constructor) return false;
    return this.value === uuid.value;
  }
}
