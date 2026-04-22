import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { JwtAuthGuarth } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User, Roles as UserRole } from '../entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuarth, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  getUsers() {
    return this.usersService.findAll();
  }

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
