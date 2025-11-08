import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'client', timestamps: true })
export class Client extends Document {
  @Prop({ required: true, unique: true })
  declare id: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop()
  document_number?: string;

  @Prop()
  gender?: string;

  @Prop()
  names?: string;

  @Prop()
  birth_date?: Date;

  @Prop()
  phone_number?: string;

  @Prop()
  legal?: boolean;

  @Prop({ required: true })
  status!: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
