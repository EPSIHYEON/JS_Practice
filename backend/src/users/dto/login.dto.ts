import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  password: string;
}
