import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientEntity } from '../../../domain/entities/client.entity';
import { IClientRepository } from '../../../domain/repositories/client.repository';
import { ClientMapper } from '../mappers/client.mapper';
import { Client } from '../schemas/client.schema';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(
    @InjectModel(Client.name) private readonly model: Model<Client>
  ) {}

  async save(entity: ClientEntity): Promise<void> {
    const data = ClientMapper.toPersistence(entity);
    console.log("🚀 ~ ClientRepository ~ save ~ data:", data)
    
    const updateTest = await this.model.updateOne(
      { id: data.id },
      { $set: data },
      { upsert: true }
    );
    console.log("🚀 ~ ClientRepository ~ save ~ updateTest:", updateTest)
  }

  async findById(clientId: string): Promise<ClientEntity | null> {
    const doc = await this.model.findOne({ id: clientId });
    return doc ? ClientMapper.toDomain(doc) : null;
  }

  async findByEmail(email: string): Promise<ClientEntity | null> {
    const doc = await this.model.findOne({ email });
    return doc ? ClientMapper.toDomain(doc) : null;
  }
}