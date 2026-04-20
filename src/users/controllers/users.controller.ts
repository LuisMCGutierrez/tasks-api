import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  createUser(@Body() body: { name: string; email: string }) {
    return this.usersService.create(body.name, body.email);
  }

  @Patch()
  updateUser(@Body() body: { id: string; name: string; email: string }) {
    return this.usersService.update(Number(body.id), body.name, body.email);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}
