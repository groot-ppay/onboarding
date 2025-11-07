import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'client', timestamps: true })
export class Client extends Document {
  @Prop({ required: true, unique: true })
  client_id!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  document_number!: string;

  @Prop({ required: true })
  gender!: string;

  @Prop({ required: true })
  names!: string;

  @Prop({ required: true })
  birth_date!: Date;

  @Prop({ required: true })
  phone_number!: string;

  @Prop({ required: true })
  legal!: boolean;

  @Prop({ required: true })
  status!: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
