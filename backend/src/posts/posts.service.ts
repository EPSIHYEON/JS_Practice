import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { PostsDto } from './dto/postsdto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async findAll() {
    return this.postModel.find().lean().exec();
  }

  async create(data: PostsDto) {
    return this.postModel.create(data);
  }
}
