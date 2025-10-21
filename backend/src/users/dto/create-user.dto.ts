import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(1)
  password: string;

  @IsNotEmpty()
  username: string;
}
