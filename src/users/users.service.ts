import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserDto } from './dto/user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async create(userDto: UserDto): Promise<User> {
    return await this.usersRepository.save(userDto);
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async update(id: number, userDto: Partial<UserDto>): Promise<User> {
    const userToUpdate = await this.usersRepository.findOneBy({ id });
    if (!userToUpdate) {
      throw new BadRequestException(
        `User not with id: ${id} found. Cannot update.`,
      );
    }

    await this.usersRepository.update(id, userDto);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const userToDelete = await this.usersRepository.findOneBy({ id });
    if (!userToDelete) {
      throw new BadRequestException(
        `User not with id: ${id} found. Cannot delete.`,
      );
    }

    await this.usersRepository.delete(id);
  }
}
