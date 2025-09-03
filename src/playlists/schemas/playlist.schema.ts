import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PlaylistDocument = Playlist & Document;

@Schema({ timestamps: true })
export class Playlist {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Movie' }], default: [] })
  movies: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  owner: Types.ObjectId;

  @Prop({ type: Boolean, default: false }) 
  isPublic: boolean;
}
export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
