import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>) {}

  async create(dto: CreateMovieDto) {
    
    const movie = await this.movieModel.create({
      title: dto.title,
      year: dto.year,
      duration: dto.duration,
      genres: dto.genres ?? [],
      directors: dto.directors ?? [],
    });
    return movie.toObject();
  }

  
  async findAllDetailed() {
    return this.movieModel
      .find()
      .populate('genres', 'name')
      .populate('directors', 'name birthDate')
      .lean();
  }

  async findAllTitles() {
    return this.movieModel.find({}, { title: 1, _id: 1 }).lean();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Movie not found');
    const movie = await this.movieModel
      .findById(id)
      .populate('genres', 'name')
      .populate('directors', 'name birthDate')
      .lean();
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async update(id: string, dto: UpdateMovieDto) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Movie not found');
    const updated = await this.movieModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            ...(dto.title !== undefined ? { title: dto.title } : {}),
            ...(dto.year !== undefined ? { year: dto.year } : {}),
            ...(dto.duration !== undefined ? { duration: dto.duration } : {}),
            ...(dto.genres !== undefined ? { genres: dto.genres } : {}),
            ...(dto.directors !== undefined ? { directors: dto.directors } : {}),
          },
        },
        { new: true },
      )
      .populate('genres', 'name')
      .populate('directors', 'name birthDate')
      .lean();

    if (!updated) throw new NotFoundException('Movie not found');
    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Movie not found');
    const res = await this.movieModel.findByIdAndDelete(id).lean();
    if (!res) throw new NotFoundException('Movie not found');
    return { ok: true };
  }
}
