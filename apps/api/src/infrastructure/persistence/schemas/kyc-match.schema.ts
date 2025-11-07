import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'kyc_match', timestamps: true })
export class KycMatch extends Document {
  @Prop({ required: true })
  client_id!: string;

  @Prop({ required: true })
  status!: string;

  @Prop()
  match?: boolean;

  @Prop()
  score?: number;

  @Prop({ type: Object })
  raw_data?: Record<string, any>;
}

export const KycMatchSchema = SchemaFactory.createForClass(KycMatch);
