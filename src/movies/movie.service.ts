
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private readonly model: Model<MovieDocument>) {}

  create(dto: CreateMovieDto) {
    const genres = (dto.genres || []).map((id) => new Types.ObjectId(id));
    const directors = (dto.directors || []).map((id) => new Types.ObjectId(id));
    return this.model.create({ ...dto, genres, directors });
  }

  
  findTitlesOnly() {
    return this.model.find({}, { title: 1 }).lean();
  }

  
  findAllFull() {
    return this.model.find().populate('genres').populate('directors').lean();
  }

  async findOne(id: string) {
    const doc = await this.model.findById(id).populate('genres').populate('directors').lean();
    if (!doc) throw new NotFoundException('Movie not found');
    return doc;
  }

  async update(id: string, dto: UpdateMovieDto) {
    const payload: any = { ...dto };
    if (dto.genres) payload.genres = dto.genres.map((g) => new Types.ObjectId(g));
    if (dto.directors) payload.directors = dto.directors.map((d) => new Types.ObjectId(d));
    const doc = await this.model.findByIdAndUpdate(id, payload, { new: true }).lean();
    if (!doc) throw new NotFoundException('Movie not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.model.findByIdAndDelete(id).lean();
    if (!doc) throw new NotFoundException('Movie not found');
    return { ok: true };
  }
}
