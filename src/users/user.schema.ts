import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  username: string;

  @Prop({ type: String, enum: ['admin', 'member'], default: 'member', index: true })
  role: 'admin' | 'member';

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Playlist' }], default: [] })
  playlists: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
