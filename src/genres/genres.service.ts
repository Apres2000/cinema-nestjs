import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre, GenreDocument } from './schemas/genre.schema';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genre.name)
    private readonly genreModel: Model<GenreDocument>,
  ) {}

  
  async findAll() {
    return this.genreModel.find().lean();
  }

 
  async create(dto: CreateGenreDto) {
    const exists = await this.genreModel.exists({ name: dto.name });
    if (exists) {
      throw new ConflictException('Genre name must be unique');
    }
    const doc = await this.genreModel.create({ name: dto.name });
    return doc.toObject();
  }
}
