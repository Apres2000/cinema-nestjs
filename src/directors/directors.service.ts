import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Director, DirectorDocument } from './schemas/director.schema';
import { CreateDirectorDto } from './dto/create-director.dto';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectModel(Director.name)
    private readonly directorModel: Model<DirectorDocument>,
  ) {}

  
  async findAll() {
    return this.directorModel.find().lean();
  }

  
  async create(dto: CreateDirectorDto) {
    const exists = await this.directorModel.exists({ name: dto.name });
    if (exists) {
      throw new ConflictException('Director with this name already exists');
    }
    const doc = await this.directorModel.create({
      name: dto.name,
      birthDate: dto.birthDate,
    });
    return doc.toObject();
  }
}
