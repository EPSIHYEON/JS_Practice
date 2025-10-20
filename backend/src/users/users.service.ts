import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exists = await this.userModel.exists({ email: createUserDto.email });
    if (exists) throw new ConflictException('이미 등록된 이메일입니다.');

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    return this.userModel.create({
      email: createUserDto.email,
      passwordHash,
      nickname: createUserDto.nickname,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  findById(id: string) {
    return this.userModel.findById(id).select('-passwordHash').lean().exec();
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async update(id: string, { password }: UpdateUserDto) {
    const passwordHash = await bcrypt.hash(password, 10);
    return this.userModel
      .findByIdAndUpdate(id, { passwordHash }, { new: true })
      .select('-passwordHash')
      .lean()
      .exec();
  }
}
