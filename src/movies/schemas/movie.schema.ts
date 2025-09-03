import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema({ timestamps: true })
export class Movie {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  duration: number; 

  
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Genre' }], default: [] })
  genres: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Director' }], default: [] })
  directors: Types.ObjectId[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
