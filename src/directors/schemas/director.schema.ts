import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DirectorDocument = HydratedDocument<Director>;

@Schema({ timestamps: true })
export class Director {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: Date, required: true })
  birthDate: Date;
}

export const DirectorSchema = SchemaFactory.createForClass(Director);
