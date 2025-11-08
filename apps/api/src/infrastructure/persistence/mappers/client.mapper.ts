import { ClientEntity } from '../../../domain/entities/client.entity';
import { Uuid } from '../../../domain/shared/value-objects/uuid.value-object';
import { Client } from '../schemas/client.schema';

export class ClientMapper {
  public static toDomain(model: Client): ClientEntity {
    return new ClientEntity(
      new Uuid(model.id),
      model.email,
      model.status as 'CREATED' | 'COMPLETED',
      model.document_number,
      model.gender,
      model.names,
      model.birth_date?.toISOString(),
      model.phone_number,
      model.legal
    );
  }

  public static toPersistence(entity: ClientEntity): Partial<Client> {
    return {
      id: entity.id.value,
      email: entity.email,
      status: entity.status,
      document_number: entity.documentNumber,
      gender: entity.gender,
      names: entity.names,
      birth_date: entity.birthDate ? new Date(entity.birthDate) : undefined,
      phone_number: entity.phoneNumber,
      legal: entity.legal,
    };
  }
}