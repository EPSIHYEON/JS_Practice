import {
  Get,
  Body,
  Controller,
  Post,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsDto, UpdatePostDto } from './dto/postsdto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

type AuthenticatedRequest = Request & {
  user?: {
    _id?: unknown;
    id?: unknown;
  };
};

const getUserId = (req: AuthenticatedRequest): string | undefined => {
  const raw = req.user?._id ?? req.user?.id;
  if (!raw) return undefined;
  if (typeof raw === 'string') return raw;
  if (
    typeof raw === 'object' &&
    raw !== null &&
    typeof (raw as { toString?: unknown }).toString === 'function'
  ) {
    const value = (raw as { toString(): unknown }).toString();
    return typeof value === 'string' ? value : undefined;
  }
  return undefined;
};

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('me/likes-summary')
  @UseGuards(JwtAuthGuard)
  likeSummary(@Req() req: AuthenticatedRequest) {
    const userId = getUserId(req);
    if (!userId) {
      throw new UnauthorizedException('인증 정보가 유효하지 않습니다');
    }
    return this.postsService.getAuthorLikeSummary(userId);
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    const viewerId = getUserId(req);
    return this.postsService.findAll(viewerId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  findMine(@Req() req: AuthenticatedRequest) {
    const userId = getUserId(req);
    if (!userId) {
      throw new UnauthorizedException('인증 정보가 유효하지 않습니다');
    }
    return this.postsService.findMine(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const viewerId = getUserId(req);
    return this.postsService.findOne(id, viewerId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: PostsDto, @Req() req: AuthenticatedRequest) {
    const userId = getUserId(req);
    if (!userId) {
      throw new UnauthorizedException('인증 정보가 유효하지 않습니다');
    }
    return this.postsService.create(dto, userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = getUserId(req);
    if (!userId) {
      throw new UnauthorizedException('인증 정보가 유효하지 않습니다');
    }
    return this.postsService.update(id, userId, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const userId = getUserId(req);
    if (!userId) {
      throw new UnauthorizedException('인증 정보가 유효하지 않습니다');
    }
    return this.postsService.remove(id, userId);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  toggleLike(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const userId = getUserId(req);
    if (!userId) {
      throw new UnauthorizedException('인증 정보가 유효하지 않습니다');
    }
    return this.postsService.toggleLike(id, userId);
  }
}
