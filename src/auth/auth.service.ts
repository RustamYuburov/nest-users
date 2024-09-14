import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
import { UserDto } from 'src/users/dto/user-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
  }

  async registration(userDto: UserDto) {
    const candidate = await this.userService.findByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'User with provided email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.create(userDto);
    return await this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: UserDto) {
    const user = await this.userService.findByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'User with provided email not found',
      });
    }

    return user;
  }
}
