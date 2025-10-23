import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  imageData?: string;
}

export class UpdatePostDto extends PostsDto {}
