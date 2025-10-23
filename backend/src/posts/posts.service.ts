import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { PostsDto, UpdatePostDto } from './dto/postsdto';

type LikeIdentifier = Types.ObjectId | string | { toString(): string };

type PlainPost = Record<string, unknown> & {
  likedBy?: LikeIdentifier[];
};

type PostResponse = Omit<PlainPost, 'likedBy'> & {
  likesCount: number;
  liked?: boolean;
};

const hasToObject = (
  value: PostDocument | PlainPost,
): value is { toObject(): unknown } =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as { toObject?: unknown }).toObject === 'function';

const isPlainPost = (value: unknown): value is PlainPost => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const likedBy = (value as { likedBy?: unknown }).likedBy;
  return likedBy === undefined || Array.isArray(likedBy);
};

const toPlainPost = (doc: PostDocument | PlainPost): PlainPost => {
  let raw: unknown;
  if (hasToObject(doc)) {
    raw = doc.toObject();
  } else {
    raw = doc;
  }
  if (!isPlainPost(raw)) {
    throw new TypeError('Post document conversion failed');
  }
  return raw;
};

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  private toResponse(
    doc: PostDocument | PlainPost,
    viewerId?: string,
  ): PostResponse {
    const plain = toPlainPost(doc);
    const { likedBy, ...rest } = plain;
    const likedByEntries = Array.isArray(likedBy) ? likedBy : [];
    const likedByArray = likedByEntries.map((likeId) => {
      if (likeId instanceof Types.ObjectId) return likeId.toString();
      if (typeof likeId === 'string') return likeId;
      return String(likeId ?? '');
    });
    return {
      ...rest,
      likesCount: likedByArray.length,
      liked: viewerId ? likedByArray.includes(viewerId) : undefined,
    };
  }

  async findOne(id: string, viewerId?: string) {
    const post = await this.postModel
      .findById(id)
      .populate('author', 'username')
      .lean()
      .exec();
    if (!post) throw new NotFoundException('게시글을 찾을 수 없습니다');
    return this.toResponse(post, viewerId);
  }

  async findAll(viewerId?: string) {
    const posts = await this.postModel
      .find()
      .sort({ createdAt: -1 })
      .populate('author', 'username')
      .lean()
      .exec();
    return posts.map((post) => this.toResponse(post, viewerId));
  }

  async findMine(authorId: string) {
    const viewerId = authorId;
    const posts = await this.postModel
      .find({ author: new Types.ObjectId(authorId) })
      .sort({ createdAt: -1 })
      .populate('author', 'username')
      .lean()
      .exec();
    return posts.map((post) => this.toResponse(post, viewerId));
  }

  async update(id: string, authorId: string, data: UpdatePostDto) {
    const post = await this.postModel.findById(id).exec();
    if (!post) throw new NotFoundException('게시글을 찾을 수 없습니다');
    if (post.author?.toString() !== authorId) {
      throw new ForbiddenException('본인 게시글만 수정할 수 있습니다');
    }
    post.set(data);
    await post.save();
    await post.populate('author', 'username');
    return this.toResponse(post, authorId);
  }

  async create(data: PostsDto, authorId: string) {
    const created = await this.postModel.create({ ...data, author: authorId });
    await created.populate('author', 'username');
    return this.toResponse(created, authorId);
  }

  async remove(id: string, authorId: string) {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다');
    }
    if (post.author?.toString() !== authorId) {
      throw new ForbiddenException('본인 게시글만 삭제할 수 있습니다');
    }
    await post.deleteOne();
    return { success: true };
  }

  async toggleLike(id: string, userId: string) {
    const post = await this.postModel.findById(id).exec();
    if (!post) throw new NotFoundException('게시글을 찾을 수 없습니다');

    const userObjectId = new Types.ObjectId(userId);
    const likedIndex = post.likedBy.findIndex((likeId) =>
      likeId.equals(userObjectId),
    );
    let liked: boolean;
    if (likedIndex > -1) {
      post.likedBy.splice(likedIndex, 1);
      liked = false;
    } else {
      post.likedBy.push(userObjectId);
      liked = true;
    }
    await post.save();
    await post.populate('author', 'username');
    const response = this.toResponse(post, userId);
    return { ...response, liked };
  }

  async getAuthorLikeSummary(authorId: string) {
    const [aggregated] = await this.postModel.aggregate<{
      totalLikes: number;
      postCount: number;
    }>([
      {
        $match: { author: new Types.ObjectId(authorId) },
      },
      {
        $group: {
          _id: null,
          totalLikes: { $sum: { $size: '$likedBy' } },
          postCount: { $sum: 1 },
        },
      },
    ]);

    return {
      totalLikes: aggregated?.totalLikes ?? 0,
      postCount: aggregated?.postCount ?? 0,
    };
  }
}
