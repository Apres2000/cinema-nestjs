import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PlaylistDocument = HydratedDocument<Playlist>;
export type Visibility = 'private' | 'public';

@Schema({ timestamps: true })
export class Playlist {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Movie' }], default: [] })
  movies: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  @Prop({ type: String, enum: ['private', 'public'], default: 'private' })
  visibility: Visibility;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
