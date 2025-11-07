import { ClientEntity } from "../entities/client.entity";

export interface IClientRepository {
  save(entity: ClientEntity): Promise<void>;
  findById(clientId: string): Promise<ClientEntity | null>;
}