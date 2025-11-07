import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'phone_verification', timestamps: true })
export class PhoneVerification extends Document {
  @Prop({ required: true })
  client_id!: string;

  @Prop({ required: true })
  status!: string;

  @Prop()
  reason?: string;

  @Prop()
  confidence?: number;

  @Prop({ type: Object })
  raw_data?: Record<string, any>;
}

export const PhoneVerificationSchema = SchemaFactory.createForClass(PhoneVerification);
