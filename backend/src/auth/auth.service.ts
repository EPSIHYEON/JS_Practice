import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { access } from 'fs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByUsername(email);
    if (!user)
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다',
      );

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다',
      );

    return user;
  }

  async login(user: any) {
    const payload = { sub: user._id.toString(), username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const created = await this.userService.create(createUserDto);
    return this.login(created);
  }
}
