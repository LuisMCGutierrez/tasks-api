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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Lists all tasks that belong to the authenticated user',
  })
  findAll(@CurrentUser() user: User) {
    return this.tasksService.findAllByUser(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific task for the authenticated user' })
  @ApiResponse({ status: 200, description: 'Task found' })
  @ApiResponse({
    status: 403,
    description: 'The task does not belong to the user',
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findOne(
    @Param('id', ParseIntPipe) id: Task['id'],
    @CurrentUser() user: User,
  ) {
    return this.tasksService.findOne(id, user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task for the authenticated user' })
  @ApiResponse({
    status: 201,
    description: 'Task created and notification sent',
  })
  create(@Body() body: CreateTaskDto, @CurrentUser() user: User) {
    return this.tasksService.create(body, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task for the authenticated user' })
  @ApiResponse({ status: 200, description: 'Task updated' })
  update(
    @Param('id') id: Task['id'],
    @Body() body: UpdateTaskDto,
    @CurrentUser() user: User,
  ) {
    return this.tasksService.update(id, body, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task for the authenticated user' })
  @ApiResponse({ status: 200, description: 'Task deleted' })
  remove(@Param(':id') id: Task['id'], @CurrentUser() user: User) {
    return this.tasksService.remove(id, user);
  }
}
