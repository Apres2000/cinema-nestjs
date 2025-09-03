import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel(Playlist.name)
    private readonly playlistModel: Model<PlaylistDocument>,
  ) {}

  
  private uniqIds(ids: (string | Types.ObjectId)[] = []) {
    const set = new Set(ids.map((x) => String(x)));
    return Array.from(set).map((s) => new Types.ObjectId(s));
  }

  async create(ownerId: string, dto: CreatePlaylistDto) {
    const doc = await this.playlistModel.create({
      name: dto.name,
      owner: new Types.ObjectId(ownerId),
      isPublic: false, 
      movies: this.uniqIds(dto.movies),
    });
    return doc.toObject();
  }

  
  async findPublic() {
    return this.playlistModel
      .find({ isPublic: true })
      .populate('owner', 'email username')
      .populate('movies', 'title')
      .lean();
  }

  
  async findForUser(userId: string) {
    return this.playlistModel
      .find({
        $or: [{ isPublic: true }, { owner: new Types.ObjectId(userId) }],
      })
      .populate('owner', 'email username')
      .populate('movies', 'title')
      .lean();
  }

  async findOneFor(userId: string | null, id: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Playlist not found');

    const pl = await this.playlistModel
      .findById(id)
      .populate('owner', 'email username')
      .populate('movies', 'title')
      .lean();

    if (!pl) throw new NotFoundException('Playlist not found');

    
    if (!pl.isPublic) {
      if (!userId || String(pl.owner?._id ?? pl.owner) !== String(userId)) {
        throw new ForbiddenException('Недостаточно прав');
      }
    }
    return pl;
  }

  async update(id: string, dto: UpdatePlaylistDto, actingUserId: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Playlist not found');

    const pl = await this.playlistModel.findById(id);
    if (!pl) throw new NotFoundException('Playlist not found');

    if (String(pl.owner) !== String(actingUserId)) {
      throw new ForbiddenException('Редактировать может только владелец');
    }

    if (dto.name !== undefined) pl.name = dto.name;
    if (dto.isPublic !== undefined) pl.isPublic = dto.isPublic;
    if (dto.movies !== undefined) pl.movies = this.uniqIds(dto.movies);

    await pl.save();

    return this.playlistModel
      .findById(pl._id)
      .populate('owner', 'email username')
      .populate('movies', 'title')
      .lean();
  }

  async remove(id: string, actingUserId: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Playlist not found');

    const pl = await this.playlistModel.findById(id);
    if (!pl) throw new NotFoundException('Playlist not found');

    if (String(pl.owner) !== String(actingUserId)) {
      throw new ForbiddenException('Удалять может только владелец');
    }

    await pl.deleteOne();
    return { ok: true };
  }
}
