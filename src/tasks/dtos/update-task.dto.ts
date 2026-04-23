import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { NotificationChannel } from '../entities/task.entity';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;
}
