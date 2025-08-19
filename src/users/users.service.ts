import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto, token?: string) {
    const exists = await this.userModel.findOne({ email: dto.email }).lean();
    if (exists) throw new BadRequestException('Email already in use');

    const hash = await bcrypt.hash(dto.password, 10);
    const doc = await this.userModel.create({
      email: dto.email,
      password: hash,
      username: dto.username,
      roles: dto.roles?.length ? dto.roles : ['user'],
      token,
    });

 
    const obj = doc.toObject() as any;
    const { password, ...safe } = obj;
    return safe;
  }

  
  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).select('-password -token').lean();
  }

  async findAll() {
    return this.userModel.find().select('-password').lean();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).select('-password').lean();
  }

  async update(id: string, update: UpdateUserDto) {
    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }
    return this.userModel.findByIdAndUpdate(id, update, { new: true }).select('-password').lean();
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return { deleted: true };
  }
}
