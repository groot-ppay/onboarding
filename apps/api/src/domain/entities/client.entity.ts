import { Uuid } from '../shared/value-objects/uuid.value-object';

export type ClientEntityProps = {
  id: string;
  email: string;
  documentNumber?: string;
  gender?: string;
  names?: string;
  birthDate?: string;
  phoneNumber?: string;
  legal?: boolean;
  status: 'CREATED' | 'COMPLETED' | 'BLOCKED';
};

export class ClientEntity {
  constructor(
    public readonly id: Uuid,
    public email: string,
    public status: 'CREATED' | 'COMPLETED' | 'BLOCKED',
    public documentNumber?: string,
    public gender?: string,
    public names?: string,
    public birthDate?: string,
    public phoneNumber?: string,
    public legal?: boolean
  ) {}

  toPrimitives(): ClientEntityProps {
    return {
      id: this.id.value,
      email: this.email,
      status: this.status,
      documentNumber: this.documentNumber,
      gender: this.gender,
      names: this.names,
      birthDate: this.birthDate,
      phoneNumber: this.phoneNumber,
      legal: this.legal,
    };
  }

  static create(id: Uuid, email: string): ClientEntity {
    return new ClientEntity(id, email, 'CREATED');
  }

  static fromPrimitives(props: ClientEntityProps): ClientEntity {
    return new ClientEntity(
      new Uuid(props.id),
      props.email,
      props.status,
      props.documentNumber,
      props.gender,
      props.names,
      props.birthDate,
      props.phoneNumber,
      props.legal
    );
  }
}
