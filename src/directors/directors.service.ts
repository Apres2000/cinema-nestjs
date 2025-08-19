import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Director, DirectorDocument } from './schemas/director.schema';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Injectable()
export class DirectorsService {
  constructor(@InjectModel(Director.name) private readonly model: Model<DirectorDocument>) {}

  create(dto: CreateDirectorDto) {
    return this.model.create({ ...dto, birthDate: new Date(dto.birthDate) });
  }

  findAll() {
    return this.model.find().lean();
  }

  async findOne(id: string) {
    const doc = await this.model.findById(id).lean();
    if (!doc) throw new NotFoundException('Director not found');
    return doc;
  }

  async update(id: string, dto: UpdateDirectorDto) {
    const payload: any = { ...dto };
    if (dto.birthDate) payload.birthDate = new Date(dto.birthDate);
    const doc = await this.model.findByIdAndUpdate(id, payload, { new: true }).lean();
    if (!doc) throw new NotFoundException('Director not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.model.findByIdAndDelete(id).lean();
    if (!doc) throw new NotFoundException('Director not found');
    return { ok: true };
  }
}
