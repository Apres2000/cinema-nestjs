import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  private async ensureEmailUnique(email: string, excludeId?: string) {
    const query: any = { email };
    if (excludeId && Types.ObjectId.isValid(excludeId)) {
      query._id = { $ne: new Types.ObjectId(excludeId) };
    }
    const exists = await this.userModel.exists(query);
    if (exists) throw new ConflictException('Email already in use');
  }

  async create(dto: CreateUserDto) {
    await this.ensureEmailUnique(dto.email);

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      email: dto.email,
      username: dto.username,
      password: hashed,        
      role: dto.role ?? 'member',
    });

    const obj = user.toObject();
    delete (obj as any).password; 
    return obj;
  }

  async findAll() {
    const users = await this.userModel.find().lean();
    return users.map((u) => {
      delete (u as any).password;
      return u;
    });
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('User not found');
    const user = await this.userModel.findById(id).lean();
    if (!user) throw new NotFoundException('User not found');
    delete (user as any).password;
    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean();
  }

  async update(id: string, dto: UpdateUserDto) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('User not found');

    if (dto.email) {
      await this.ensureEmailUnique(dto.email, id);
    }

    const update: any = {};
    if (dto.email !== undefined) update.email = dto.email;
    if (dto.username !== undefined) update.username = dto.username;
    if (dto.role !== undefined) update.role = dto.role;

    if (dto.password) {
      update.password = await bcrypt.hash(dto.password, 10); // 👈 кладём в password
    }

    const updated = await this.userModel
      .findByIdAndUpdate(id, { $set: update }, { new: true })
      .lean();

    if (!updated) throw new NotFoundException('User not found');

    delete (updated as any).password;
    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('User not found');
    const res = await this.userModel.findByIdAndDelete(id).lean();
    if (!res) throw new NotFoundException('User not found');
    return { ok: true };
  }

 
  async validateUserCredentials(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).lean();
    if (!user || !user.password) return null;

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;

    const copy: any = { ...user };
    delete copy.password;
    return copy;
  }
}
