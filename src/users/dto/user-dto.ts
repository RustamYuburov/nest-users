import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  readonly name: string;
  @IsString()
  @IsEmail()
  readonly email: string;
}
