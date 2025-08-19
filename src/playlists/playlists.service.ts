import { Injectable, ForbiddenException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';

@Injectable()
export class PlaylistsService {
  constructor(@InjectModel(Playlist.name) private readonly model: Model<PlaylistDocument>) {}

  create(ownerId: string, name: string, visibility: 'private' | 'public' = 'private') {
    return this.model.create({ owner: new Types.ObjectId(ownerId), name, visibility });
  }

  
  findMine(ownerId: string) {
    return this.model.find({ owner: ownerId }).populate('movies').lean();
  }

  
  findPublic() {
    return this.model.find({ visibility: 'public' }).select('-owner').lean();
  }

  async findOneForViewer(id: string, viewerId?: string) {
    const pl = await this.model.findById(id).populate('movies').lean();
    if (!pl) throw new NotFoundException('Playlist not found');
    if (pl.visibility === 'public') return pl;
    if (viewerId && pl.owner && String(pl.owner) === String(viewerId)) return pl;
    throw new ForbiddenException('Private playlist');
  }

  private async assertOwner(id: string, ownerId: string) {
    const pl = await this.model.findById(id).lean();
    if (!pl) throw new NotFoundException('Playlist not found');
    if (String(pl.owner) !== String(ownerId)) throw new ForbiddenException('Not your playlist');
    return pl;
  }

  async addMovie(id: string, ownerId: string, movieId: string) {
    await this.assertOwner(id, ownerId);
    const _id = new Types.ObjectId(movieId);
    const updated = await this.model.findOneAndUpdate(
      { _id: id, movies: { $ne: _id } },   
      { $push: { movies: _id } },
      { new: true }
    ).populate('movies').lean();
    if (!updated) throw new ConflictException('Movie already in playlist or playlist not found');
    return updated;
  }

  async removeMovie(id: string, ownerId: string, movieId: string) {
    await this.assertOwner(id, ownerId);
    const _id = new Types.ObjectId(movieId);
    const updated = await this.model.findByIdAndUpdate(
      id,
      { $pull: { movies: _id } },
      { new: true }
    ).populate('movies').lean();
    if (!updated) throw new NotFoundException('Playlist not found');
    return updated;
  }

  async setVisibility(id: string, ownerId: string, visibility: 'private' | 'public') {
    await this.assertOwner(id, ownerId);
    return this.model.findByIdAndUpdate(id, { visibility }, { new: true }).lean();
  }

  async remove(id: string, ownerId: string) {
    await this.assertOwner(id, ownerId);
    await this.model.findByIdAndDelete(id);
    return { ok: true };
  }
}
