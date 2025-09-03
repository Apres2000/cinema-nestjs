import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DirectorDocument = Director & Document;

@Schema({ timestamps: true })
export class Director {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: Date })
  birthDate?: Date;
}
export const DirectorSchema = SchemaFactory.createForClass(Director);
