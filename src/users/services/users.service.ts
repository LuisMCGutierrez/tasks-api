import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: User['id']): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async create(payload: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(payload);
    return this.userRepository.save(newUser);
  }

  async update(id: User['id'], payload: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, payload);
    return this.userRepository.save(user);
  }

  async remove(id: User['id']): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
