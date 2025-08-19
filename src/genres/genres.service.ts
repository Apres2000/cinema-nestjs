import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre, GenreDocument } from './schemas/genre.schema';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(@InjectModel(Genre.name) private readonly model: Model<GenreDocument>) {}

  async create(dto: CreateGenreDto) {
    try {
      return await this.model.create(dto);
    } catch (e: any) {
      if (e?.code === 11000) throw new ConflictException('Genre name must be unique');
      throw e;
    }
  }

  findAll() {
    return this.model.find().lean();
  }

  async findOne(id: string) {
    const doc = await this.model.findById(id).lean();
    if (!doc) throw new NotFoundException('Genre not found');
    return doc;
  }

  async update(id: string, dto: UpdateGenreDto) {
    const doc = await this.model.findByIdAndUpdate(id, dto, { new: true }).lean();
    if (!doc) throw new NotFoundException('Genre not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.model.findByIdAndDelete(id).lean();
    if (!doc) throw new NotFoundException('Genre not found');
    return { ok: true };
  }
}
