import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'sim_swap', timestamps: true })
export class SimSwap extends Document {
  @Prop({ required: true })
  client_id!: string;

  @Prop({ required: true })
  status!: string;

  @Prop()
  changed_at?: Date;

  @Prop()
  age?: number;

  @Prop({ type: Object })
  raw_data?: Record<string, any>;
}

export const SimSwapSchema = SchemaFactory.createForClass(SimSwap);
