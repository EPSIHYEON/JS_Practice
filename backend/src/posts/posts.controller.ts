import { Get, Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsDto } from './dto/postsdto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Post()
  create(@Body() dto: PostsDto) {
    return this.postsService.create(dto);
  }
}
