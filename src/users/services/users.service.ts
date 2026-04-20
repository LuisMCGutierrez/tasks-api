import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: User['id']): User | undefined {
    return this.users.find((el) => el.id === id);
  }

  create(payload: CreateUserDto): User | undefined {
    const newUser = {
      id: this.nextId,
      ...payload,
    };
    this.users.push(newUser);
    this.nextId++;
    return this.findOne(newUser.id);
  }

  update(id: User['id'], payload: UpdateUserDto): User | undefined {
    const updatedUser = {
      id,
      ...payload,
    };

    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1) {
      return undefined;
    }
    this.users[index] = updatedUser;
    return this.findOne(updatedUser.id);
  }

  remove(id: User['id']): Boolean {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1) {
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }
}
