import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { NotificationsService } from 'src/notifications/services/notifications.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async findAllByUser(userId: User['id']): Promise<Task[]> {
    return await this.taskRepository.findBy({ userId });
  }

  async findOne(id: Task['id'], userId: User['id']): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException();
    if (task.userId !== userId) throw new ForbiddenException();
    return task;
  }

  async create(dto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.taskRepository.create({
      ...dto,
      userId: user.id,
    });

    const savedTask = await this.taskRepository.save(task);
    const log = await this.notificationsService.notify(savedTask);
    savedTask.notificationLog = log;

    return await this.taskRepository.save(savedTask);
  }

  async update(id: Task['id'], dto: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.findOne(id, user.id);
    Object.assign(task, dto);
    return await this.taskRepository.save(task);
  }

  async remove(id: Task['id'], user: User): Promise<void> {
    const task = await this.findOne(id, user.id);
    await this.taskRepository.delete({ id });
  }
}
