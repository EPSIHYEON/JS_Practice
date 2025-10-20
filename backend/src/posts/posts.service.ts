import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { PostsDto, UpdatePostDto } from './dto/postsdto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async findOne(id: string) {
    const post = await this.postModel.findById(id).lean().exec();
    if (!post) throw new NotFoundException('게시글을 찾을 수 없습니다');
    return post;
  }

  async findAll() {
    return this.postModel.find().lean().exec();
  }

  async update(id: string, data: UpdatePostDto) {
    const post = await this.postModel
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .lean()
      .exec();
    if (!post) throw new NotFoundException('게시글을 찾을 수 없습니다');

    return post;
  }

  async create(data: PostsDto) {
    return this.postModel.create(data);
  }

  async remove(id: string) {
    const deleted = await this.postModel.findByIdAndDelete(id).lean().exec();
    if (!deleted) {
      throw new NotFoundException('게시글을 찾을 수 없습니다');
    }
    return { success: true };
  }
}
