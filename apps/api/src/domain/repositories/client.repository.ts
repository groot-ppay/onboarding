import { ClientEntity } from "../entities/client.entity";

export interface IClientRepository {
  save(entity: ClientEntity): Promise<void>;
  get(clientId: string): Promise<ClientEntity | null>;
}