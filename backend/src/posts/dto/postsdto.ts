import { IsNotEmpty, IsString } from 'class-validator';

export class PostsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdatePostDto extends PostsDto {}
