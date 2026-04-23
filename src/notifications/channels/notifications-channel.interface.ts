import { Task } from '../../tasks/entities/task.entity';

export interface NotificationResult {
  success: boolean;
  log: string;
}

export interface INotificationChannel {
  send(task: Task): Promise<NotificationResult>;
}
