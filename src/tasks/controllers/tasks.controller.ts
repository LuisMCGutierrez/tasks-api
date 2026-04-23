import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TasksService } from '../services/tasks.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.tasksService.findAllByUser(user.id);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: Task['id'],
    @CurrentUser() user: User,
  ) {
    return this.tasksService.findOne(id, user.id);
  }

  @Post()
  create(@Body() body: CreateTaskDto, @CurrentUser() user: User) {
    return this.tasksService.create(body, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: Task['id'],
    @Body() body: UpdateTaskDto,
    @CurrentUser() user: User,
  ) {
    return this.tasksService.update(id, body, user);
  }

  @Delete(':id')
  remove(@Param(':id') id: Task['id'], @CurrentUser() user: User) {
    return this.tasksService.remove(id, user);
  }
}
